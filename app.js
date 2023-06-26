const express = require('express');
const mongoose = require('mongoose');
const { ERROR_CODE } = require('./utils/constsnts');

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

app.use(express.json());
app.use('/', router);
app.use('/', (req, res) => {
  res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Страница не найдена' });
});
