const Card = require('../models/card');
const { ERROR_CODE } = require('../utils/constsnts');

const getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      console.log(ERROR_CODE.SERVER_ERROR);
      console.log('На сервере произошла ошибка');
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card
    .create({
      name,
      link,
      owner,
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(ERROR_CODE.BAD_REQUEST);
        console.log('Переданы некорректные данные при создании карточки.');
      } else {
        console.log(ERROR_CODE.SERVER_ERROR);
        console.log('На сервере произошла ошибка');
      }
    });
};

const deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Карточка с указанным id не найдена.' });
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        console.log(ERROR_CODE.BAD_REQUEST);
        console.log('Переданы некорректные данные при удалении карточки.');
      } else {
        console.log(ERROR_CODE.SERVER_ERROR);
        console.log('На сервере произошла ошибка');
      }
    });
};

const likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Передан несуществующий id карточки.' });
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        console.log(ERROR_CODE.BAD_REQUEST);
        console.log('Переданы некорректные данные для постановки лайка.');
      } else {
        console.log(ERROR_CODE.SERVER_ERROR);
        console.log('На сервере произошла ошибка');
      }
    });
};

const dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Передан несуществующий id карточки.' });
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        console.log(ERROR_CODE.BAD_REQUEST);
        console.log('Переданы некорректные данные для снятии лайка.');
      } else {
        console.log(ERROR_CODE.SERVER_ERROR);
        console.log('На сервере произошла ошибка');
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
