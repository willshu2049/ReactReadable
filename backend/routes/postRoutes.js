const _ = require('lodash');
const mongoose = require('mongoose');

const Post = mongoose.model('post');
const Category = mongoose.model('category');
// const User = mongoose.model('user');

module.exports = app => {
    // get some recent posts
    app.post('/posts', async (req, res) => {
        const { body:{page, count} } = req;
        const posts = await Post.find({})
            .skip(Post.count() - count*page)
            .limit(count)
            .populate('category')
            .populate('author');
        res.send(posts);
    });
    // get some posts of a category
    app.post('/:category/posts', async (req, res) => {
        const { params:{category}, body:{page, count} } = req;
        // method one:
        const existedCat = await Category.findOne({name:category});
        const posts = await Post.find({category:existedCat._id})
            .skip(Post.count() - count*page)
            .limit(count)
            .populate('category')
            .populate('author');
        // method two: this syntax don't work out
        // const posts = await Post.find({})
        //     .populate({
        //         path:'category',
        //         match:{name:category}
        //     })
        //     .skip(Post.count() - count*page)
        //     .limit(count)
        res.send(posts);
    });
    // write a post
    app.post('/posts/add', async (req, res) => {
        const { timestamp, title, body, id, category } = req.body;
        const existedCat = await Category.findOne({name:category});
        // const author = await User.findById(id);
        const post = new Post({
            createdTime: timestamp,
            editedTime: null,
            title,
            body,
            voteScore: 0,
            comments: [],
        });
        // post.author = author;
        post.category = existedCat;

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
    app.post('/posts/:postId/vote', async (req, res) => {
        const { params: { postId }, body: { option } } = req;
        const change = option === 'upvote' ? 1 : -1;
        await Post.findByIdAndUpdate(postId, { $inc: { voteScore: change } });
        const updatedPost = await Post.findById(postId);
        res.send(updatedPost);
    });
    // edit a post by id
    app.put('/posts/:postId', async (req, res) => {
        const { params: { postId }, body: { title, body } } = req;
        await Post.findByIdAndUpdate(postId, { $set: { title, body } });
        const updatedPost = await Post.findById(postId);
        res.send(updatedPost);
    });
    // delete a post by id
    app.delete('/posts/:postId', async (req, res) => {
        const { params: { postId } } = req;
        const deletedPost = await Post.findByIdAndRemove(postId);
        res.status(204).send(deletedPost);
    });
};