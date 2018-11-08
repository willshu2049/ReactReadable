const _ = require('lodash');
const mongoose = require('mongoose');

const Post = mongoose.model('post');

module.exports = app => {
    // get all posts
    app.get('/posts', async (req, res) => {
        const posts = await Post.find({});
        res.send(posts);
    });
    // write a post
    app.post('/posts', async (req, res) => {
        const { id, timestamp, title, body, author, category } = req.body;
        const post = new Post({
            timestamp,
            title,
            body,
            voteScore: 0,
        });
        const response = await post.save();
        res.send(response);
    });
    // get a postF
    app.get('/posts/:postId', async (req, res) => {
        const { params: { postId } } = req;
        const post = await Post.findById(postId);
        res.send(post);
    });
    // vote a post
    app.post('/posts/:postId', async (req, res) => {
        const { params: { postId }, body: { option } } = req;
        const change = option === 'upvote' ? 1 : -1;
        await Post.findByIdAndUpdate(postId, { $inc: { voteScore: change } });
        const updatedPost = await Post.findById(postId);
        res.send(updatedPost);
    })
    // edit a post
    app.put('/posts/:postId', async (req, res) => {
        const { params: { postId }, body: { title, body } } = req;
        await Post.findByIdAndUpdate(postId, { $set: { title, body } });
        const updatedPost = await Post.findById(postId);
        res.send(updatedPost);
    })
    // delete a post
    app.delete('/posts/:postId', async (req, res) => {
        const { params: { postId } } = req;
        const deletedPost = Post.findByIdAndRemove(postId);
        res.status(204).send(deletedPost);
    })
}