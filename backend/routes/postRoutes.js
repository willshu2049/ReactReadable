const _ = require('lodash');
const mongoose = require('mongoose');

const Post = mongoose.model('post');

module.exports = app => {
    // get a certain amount of recent posts
    app.get('/posts', async (req, res) => {
        const { page, count } = req.body;
        const posts = await Post.find({})
                .skip(Post.count() - count*page)
                .limit(count);
        res.send(posts);
    });
    // write a post
    app.post('/posts', async (req, res) => {
        const { timestamp, title, body, id, category } = req.body;
        const id = Date.now();
        const post = new Post({
            createdTime: timestamp,
            editedTime: null,
            title,
            body,
            voteScore: 0,
            comments: [],
        });
        post.author = id;
        post.category = category;

        const response = await post.save();

        res.send(response);
    });
    // get a post by id
    app.get('/posts/:postId', async (req, res) => {
        const { params: { postId } } = req;
        const post = await Post.findById(postId);
        res.send(post);
    });
    // vote a post by id
    app.post('/posts/:postId', async (req, res) => {
        const { params: { postId }, body: { option } } = req;
        const change = option === 'upvote' ? 1 : -1;
        await Post.findByIdAndUpdate(postId, { $inc: { voteScore: change } });
        const updatedPost = await Post.findById(postId);
        res.send(updatedPost);
    })
    // edit a post by id
    app.put('/posts/:postId', async (req, res) => {
        const { params: { postId }, body: { title, body } } = req;
        await Post.findByIdAndUpdate(postId, { $set: { title, body } });
        const updatedPost = await Post.findById(postId);
        res.send(updatedPost);
    })
    // delete a post by id
    app.delete('/posts/:postId', async (req, res) => {
        const { params: { postId } } = req;
        const deletedPost = Post.findByIdAndRemove(postId);
        res.status(204).send(deletedPost);
    })
}