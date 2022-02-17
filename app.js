const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const auth = require('./middlewares/auth');
const { centralErrorHandler, NotFoundError } = require('./utils/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_NAME } = require('./middlewares/secrets');

// Скажем нет захардкоженным данным
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

// Подключение предобработчиков

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключаем логгер запросов
app.use(requestLogger);
app.use(cookieParser());
app.use(cors());

app.use(require('./routes/auth'));

// авторизация
app.use(auth);

// Подключение маршрутизации
app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use(require('./routes/signout'));

// Обработка неопределенных маршрутов
app.use('/', (req, res, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

// Подключаем логгер ошибок
app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  centralErrorHandler(err, req, res, next);
});

// Подключение к серверу mongo
mongoose.connect(`mongodb:${DB_NAME}`, {
  useNewUrlParser: true,
})
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log({ err }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
