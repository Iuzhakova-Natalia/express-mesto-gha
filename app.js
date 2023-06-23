const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const userRouter = require('./routes/users');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use((req, res, next) => {
  req.user = {
    _id: '6495bb8c0867d6381c8c1fa9',
  };

  next();
});

app.use(bodyParser.json());
app.use('/users', userRouter);

app.listen(3000, () => {
  console.log('Сервер запущен!');
});
