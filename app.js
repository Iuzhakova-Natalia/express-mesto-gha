const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const routes = require('./routes');
const error = require('./middlewares/erorr');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(helmet());
app.use(express.json());

app.use(routes);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log('Сервер запущен!');
});
