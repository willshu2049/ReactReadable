import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './router';

// App setup
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
router(app);

// Server setup
const port = process.env.port || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);
