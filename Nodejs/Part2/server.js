const express = require('express');
const fs = require('fs');

const {getNotes, addNote, deleteNode, editNote} = require('./notes');
const app = express();
app.use(express.json());
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