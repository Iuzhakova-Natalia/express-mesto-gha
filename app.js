const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const router = require('./routes/index');

app.listen(PORT, () => {
  console.log('Сервер запущен!');
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6495bb8c0867d6381c8c1fa9',
  };

  next();
});

app.use(bodyParser.json());
app.use('/', router);
app.use('/', (req, res) => { //* * Обработчик несуществующих маршрутов */
  res.status(404).send({ message: 'Страница не найдена' });
});
