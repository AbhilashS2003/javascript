const express = require('express');
const router = express.Router();
const controller = require('../controllers/notesController');
const validate = require('../middleware/validate');
const {
  CreateNoteSchema,
  UpdateNoteSchema,
  QueryParamsSchema
} = require('../validators/noteSchema');


router.get('/', validate(QueryParamsSchema, 'query'), controller.getNotes);
router.post('/', validate(CreateNoteSchema), controller.addNote);
router.put('/:id', validate(UpdateNoteSchema), controller.editNote);
router.delete('/:id', controller.deleteNote); // You can add param validation here too


module.exports = router;
