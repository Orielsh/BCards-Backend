// Require
require('dotenv').config();
const express = require('express');
const connectDB = require('./dal/mongoose');
const cors = require('cors');
const morganConf = require("./config/morgan");
const rfs = require('rotating-file-stream') // version 2.x
const path = require('path')

// Initialize express
const app = express();

// File log config:
// create a rotating write stream
const today = new Date().toLocaleDateString().replaceAll("/", "-");
const accessLogStream = rfs.createStream(`${today}.log`, {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

// Middlewares
app.use(cors());

app.use((req, res, next)=>{
  res.sendResponse = res.send;
  res.send = (body) => {
    res.body = body;
    res.sendResponse(body);
  };
  next();
});

app.use(express.json());
app.use(morganConf.morgan(morganConf.consoleFormat));
 app.use(morganConf.morgan(morganConf.fileFormat, {
  stream: accessLogStream,
  skip: function (req, res) { return res.statusCode < 400 },
}));
app.use(express.static('static'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/cards', require('./routes/cardsRoutes'));

// It is important to first connect to the database,
// and only THEN start listening for requests.
// This will prevent possible nasty bugs when running your app in shared\public cloud environments.

const { PORT } = process.env;

// Connect to database
connectDB().then(() => {
  // Run server
  app.listen(PORT, () => console.log(`Server is listening for requests on http://127.0.0.1:${PORT}`))
});