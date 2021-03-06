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
            // author: id
        });
        const updatedPost =await post.save();
        res.send(updatedPost);
    });

    // vote a comment
    app.post('/comments/:commentId', async (req, res)=>{
        const { params:{commentId}, body:{option} }=req;
        const change = option === 'upvote' ? 1 : -1;
        await Post.findOneAndUpdate(
            {'comments._id':commentId},
            { $inc: { 'comments.$.voteScore': change } }
        );
        const post = await Post.findOne({'comments._id':commentId});
        res.send(post);
    });

    // edit a comment
    app.put('/comments/:commentId', async (req, res)=>{
        const { params:{commentId}, body:{timestamp,body} } = req;
        await Post.findOneAndUpdate(
            {'comments._id':commentId},
            {$set:{
                'comments.$.editedTime':timestamp,
                'comments.$.body':body
            }},
        );
        const post = await Post.findOne({'comments._id':commentId});
        res.send(post);
    })

    //  delete a comment
    app.delete('/comments/:commentId', async (req, res)=>{
        const { params:{commentId} }=req;
        await Post.findOneAndUpdate(
            {'comments._id':commentId},
            {$pull:{
                comments:{_id: commentId}
            }}
        );
        const updatedPost = await Post.findOne({'comments._id':commentId});
        res.send(updatedPost);
    })
}