const router = require('express').Router();
const { cardIdValidate, cardValidate } = require('../middlewares/validation');

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', cardValidate, createCard);
router.delete('/:cardId', cardIdValidate, deleteCard);
router.put('/:cardId/likes', cardIdValidate, likeCard);
router.delete('/:cardId/likes', cardIdValidate, dislikeCard);

module.exports = router;
