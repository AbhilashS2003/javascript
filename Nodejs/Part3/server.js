const express = require('express');
const app = express();
const router = require('./routes/notes');

app.use(express.json());
app.use('./notes', router);

app.listen(3000, () => console.log('Server running on port 3000'));


function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Body:', req.body);
  }
  next(); // Important! This passes control to the next middleware/route handler
}
