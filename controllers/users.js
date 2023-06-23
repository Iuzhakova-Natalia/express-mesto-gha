const User = require('../models/user');
const { ERROR_CODE } = require('../utils/constsnts');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(ERROR_CODE.CREATED).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      } else {
        res.status(ERROR_CODE.SERVER_ERROR).send({
          message: 'На сервере произошла ошибка',
        });
      }
    });
};

const getUserById = (req, res) => {
  User
    .findById(req.params.userId)
    .orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные.' });
      } else if (err.message === 'NotFound') {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Пользователь по указанному id не найден' });
      } else {
        res.status(ERROR_CODE.SERVER_ERROR).send({
          message: 'На сервере произошла ошибка',
        });
      }
    });
};

const getUsers = (req, res) => {
  User
    .find({})
    .then((users) => {
      res.status(ERROR_CODE.OK).send(users);
    })
    .catch(() => {
      res.status(ERROR_CODE.SERVER_ERROR).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
