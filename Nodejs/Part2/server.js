const express = require('express');
const fs = require('fs');

const {getNotes, addNote, deleteNode, editNote} = require('./notes');
const app = express();
app.use(express.json());
app.use(logger);
app.listen(3000, () => console.log('Server running on port 3000'));

app.get('/notes', (req, res) => {
    const notes = getNotes();
    res.json(notes);
});

app.post('/notes', (req, res) => {
    const notes = getNotes();
    let newNode = req.body;
    res.status(201).json(addNote(newNode));
});

app.put('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let newText = req.body;
    res.status(201).json(editNote(id, newText));
});   

app.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.json(deleteNode(id));
});

function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Body:', req.body);
  }
  next(); // Important! This passes control to the next middleware/route handler
}
