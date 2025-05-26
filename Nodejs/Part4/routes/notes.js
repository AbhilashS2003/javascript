const express = require('express');
const router = express.Router();

const {
    getNotes,
    addNote,
    deleteNote,
    editNote
} = require('../controllers/notesController.js');

router.get('/', getNotes);
router.post('/', addNote);
router.put('/:id', editNote);
router.delete('/:id', deleteNote);

module.exports = router;
