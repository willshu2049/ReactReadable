const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    timestamp: String,
    body: String,
    voteScore: Number,
    author:{
        type: Schema.Types.ObjectId,
        ref:' user'
    }
});

module.exports = CommentSchema;