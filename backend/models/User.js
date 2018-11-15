const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    googleId: String,
    wechatId: String,
    githubId: String,
    createdTime: {
        type: String,
        default: new Date(),
    },
});

mongoose.model('user', UserSchema);