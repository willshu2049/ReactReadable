const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name:String,
});

mongoose.model('category', CategorySchema);