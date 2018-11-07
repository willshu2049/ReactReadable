const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name:String,
});

const Category = mongoose.model('category', CategorySchema);