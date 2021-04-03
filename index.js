const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const boardRoutes = require('./routes/board.route');

// import middlewares
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// connect to db
mongoose
  .connect(process.env.DATABASE_ACCESS_KEY, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {})
  .catch((error) => console.error(`DB Connection Error: ${error}`));

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }));
}

// middleware
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/board', authMiddleware, boardRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.info(`API is running on port ${port}`);
});

// вынести все ответы response в отдельные константы
