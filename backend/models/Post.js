const mongoose = require('mongoose');
const CommentSchema = require('./Comment');
const { Schema } = mongoose;

const PostSchema = new Schema({
    createdTime: String,
    editedTime: String,
    title: String,
    body: String,
    voteScore: Number,
    category:{
        type:Schema.Types.ObjectId,
        ref:'category'
    },
    author: {
        type:Schema.Types.ObjectId,
        ref: 'user'
    },
    comments: [CommentSchema],
});

const Post = mongoose.model('post', PostSchema);