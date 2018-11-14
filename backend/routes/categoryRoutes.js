const mongoose = require('mongoose');
const Category = mongoose.model('category');

module.exports = app => {
    app.get('/categories', async (req, res) => {
        const categories = Category.find({});
        res.send(categories);
    })
}