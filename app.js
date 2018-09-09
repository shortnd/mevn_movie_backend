const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const router = require('./routes/index');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// connect to mongodb
mongoose.connect('mongodb://localhost/movie_rating_app', function() {
  console.log(`Connection has been made`);
}).catch(err => {
  console.error('App Staring error', err.stack);
  process.exit(1);
});

const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function() {
  console.log(`api running on port ${port}`)
});
