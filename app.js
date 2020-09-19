const express = require('express');
const mongoose = require('mongoose');
require('custom-env').env();
const PORT = process.env.PORT || 5000;

// 'mongodb://localhost/kilogram';

const MONGOURI = process.env.MONGOURI;

const app = express();

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to DB ');
});

mongoose.connection.on('error', (err) => {
  console.log('error to connect', err);
});

require('./models/post');
require('./models/user');

app.use(express.json());
app.use('/api', require('./routes/auth'));
app.use('/api/post', require('./routes/post'));
app.use('/api/user', require('./routes/user'));

if ((process.env.NODE_ENV = 'production')) {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('server is running on', PORT);
});
