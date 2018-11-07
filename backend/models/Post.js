const mongoose = require('mongoose');
const CommentSchema = require('./Comment');
const { Schema } = mongoose;

const PostSchema = new Schema({
    timestamp: String,
    title: String,
    body: String,
    comments: [CommentSchema],
});