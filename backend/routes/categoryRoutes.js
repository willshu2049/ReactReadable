const mongoose = require('mongoose');
const Category = mongoose.model('category');

module.exports = app => {
    app.post('/categories', async (req, res) => {
        const { body:{page, count} } = req;
        const categories = await Category.find({})
            .skip(Category.count() - count*page)
            .limit(count);
        res.send(categories);
    });

    app.post('/categories/add', async (req, res)=> {
        const { body:{ name } } = req;
        const category = new Category({name});
        const response = await category.save();
        res.send(response);
    })
}