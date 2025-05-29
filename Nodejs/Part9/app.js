const express = require('express');
const app = express();
const router = require('./routes/notes');
const morgan = require('morgan'); //package for logging
const { error } = require('console');
const authRouter = require('./routes/auth');

app.use(express.json());
app.use(logger);
app.use(morgan('dev'));

app.use('/auth', authRouter);
app.use('/notes', router);

function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Body:', req.body);
  }
  next(); // Important! This passes control to the next middleware/route handler
}

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});

module.exports = app;