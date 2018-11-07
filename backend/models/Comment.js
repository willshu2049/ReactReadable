const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    timestamp: String,
    body: String,
    author: String,
    voteScore: Number,
});

module.exports = CommentSchema;