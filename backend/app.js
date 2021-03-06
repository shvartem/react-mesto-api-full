const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
require('dotenv').config();
const cors = require('cors');

const usersRouter = require('./routes/users.router');
const cardsRouter = require('./routes/cards.router');

const { authorize } = require('./middlewares/auth.middleware');
const { errorsHandler } = require('./middlewares/errors.miggleware');
const { createNewUser } = require('./controllers/users.controller');
const { login } = require('./controllers/login.controller');
const { newUserValidation, loginUserValidation } = require('./utils/validation-requests');

const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { logout } = require('./controllers/logout.controller');

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('Connected to Database'))
  .catch((error) => console.log({ errorMessage: error.message }));

const app = express();

const { PORT = 3000 } = process.env;

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3000',
    'https://mesto422.nomoredomains.work',
    'http://mesto422.nomoredomains.work',
  ],
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/signin', loginUserValidation, login);
app.use('/signup', newUserValidation, createNewUser);

app.use(authorize);

app.delete('/logout', logout);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => next(new NotFoundError('Неверный запрос')));

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
