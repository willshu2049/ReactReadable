const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/Category');
require('./models/Post');
require('./models/User');

// routes must be below models, otherwise postRoutes won't find model('post');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const postRoutes = require('./routes/postRoutes');

// App setup
const app = express();
if(process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://localhost/readable');
}
app.use(bodyParser.json({type:'*/*'}));

categoryRoutes(app);
commentRoutes(app);
postRoutes(app);

app.use((err, req, res, next)=>{
    res.status(422).send({error: err.message});
})

// Server setup
const port = process.env.port || 3090
app.listen(port, ()=>{
    console.log('Server listening on: ', port);
})

