const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    createdTime: String,
    editedTime: String,
    body: String,
    voteScore: Number,
    author:{
        type: Schema.Types.ObjectId,
        ref:' user'
    }
});

module.exports = CommentSchema;