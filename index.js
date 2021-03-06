//Main starting point of our application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express(); //create an instance of express
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB setup
mongoose.connect('mongodb://localhost/auth');

//App setup
app.use(morgan('combined')); //morgan and body-parser are known as middlewares in express. Morgan is logging framework. Body-parser is used to parse incoming request as json
app.use(cors()); //to enable all cors for entire the application. Cors is a midleware to handle cors. To fix error, XMLHttpRequest cannot load http://localhost:3090/signin.
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app); //http is a native node library
server.listen(port);
console.log('Server listening on: ', port);