const mongoose = require('mongoose');

const Post = mongoose.model('post');

module.exports = app => {
    //  add a comment
    app.post('/comments', async (req, res) => {
        const { body:{timestamp, body, id, postId}} = req;

        const post = await Post.findById(postId);
        post.comments.push({
            createdTime: timestamp,
            body,
            voteScore:0,
            author: id
        });
    });

    // vote a comment
    app.post('/comments/:commentId', async (req, res)=>{
        const {params:{commentId}, body:{option}}=req;
        const change = option === 'upvote' ? 1 : -1;
        await Post.findOneAndUpdate(
            {'comments.id':commentId},
            { $inc: { 'comments.$.voteScore': change } }
        );
        const post = Post.findOne({'comments.id':commentId});
        res.send(post);
    });

    // edit a comment
    app.put('/comments/:commentId', async (req, res)=>{
        const {params:{commentId},body:{timestamp,body}} = req;
        await Post.findOneAndUpdate(
            {'comments.id':commentId},
            {$set:{
                'comments.$.editedTime':timestamp,
                'comments.$.body':body
            }},
        );
        const post = Post.findOne({'comments.id':commentId});
        res.send(post);
    })

    //  delete a comment
    app.delete('/comments/:commentId', async (req, res)=>{
        const {params:{commentId}}=req;
        const post = await Post.findOneAndUpdate(
            {'comments.id':commentId},
            {$pull:{
                comments:{_id: commentId}
            }}
        );
    })
}