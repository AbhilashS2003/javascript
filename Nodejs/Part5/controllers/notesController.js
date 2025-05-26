const store = require('../store/notesStore');

// exports.getNotes = (req, res) => {
//     const {search} = req.query;
//     const tag = req.query.tag;
//     if(tag) {
//         return res.json(store.getNoteByTag(tag));
//     }
//     if(search) {
//         return res.json(store.filterNotesByText(search));
//     }
//     res.json(store.getAllNotes());
// };

exports.getNotes = (req, res) => {
    const { search, tag, from, to } = req.query;

    if (tag) {
        return res.json(store.getNoteByTag(tag));
    }

    if (search) {
        return res.json(store.filterNotesByText(search));
    }

    if (from || to) {
        return res.json(store.getNotesByDate(from, to));
    }

    res.json(store.getAllNotes());
};


exports.addNote = (req, res) => {
    const newNote = store.addNote(req.body.text);
    res.status(201).json(newNote);
};

exports.editNote = (req, res) => {
    const updated = store.updateNote(req.params.id, req.body.text);
    if(!updated) return res.status(404).json({error : 'Note not found'});
    res.json(updated);
};

exports.deleteNote = (req, res) => {
    const deleted = store.deleteNote(req.params.id);
    if(!deleted) return res.status(404).json({error : 'Note not found'});
    res.status(204).end();
}

