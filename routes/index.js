const router = require('express').Router();

const userRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { authValidate, registerValidate } = require('../middlewares/validation');
const NotFoundError = require('../erorrs/NotFoundError');

router.post('/signup', registerValidate, createUser);
router.post('/signin', authValidate, login);

router.use(auth);

router.use('/cards', cardsRouter);
router.use('/users', userRouter);
router.use(() => {
  throw new NotFoundError('Указан неправильный путь');
});

module.exports = router;
