const store = require('../store/notesDbStore');

exports.getNotes = (req, res) => {
    const {
        search = '', 
        tag,
        from,
        to,
        page = 1, 
        limit = 10, 
        sortBy = 'createdAt', 
        order = 'desc'
    } = req.query;

    const handler = (err, notes) => {
        if (err) return res.status(500).json({ error: 'db error' });
        res.json(notes);
    };

    if (search) return store.filterNotesByText(search, handler);
    if (tag) return store.getNoteByTag(tag, handler);
    if (from || to) return store.getNotesByDate(from, to, handler);

    store.getAllNotes(handler);
};

exports.addNote = (req, res) => {
    console.log("Received body:", req.body);
    const handler = (err, notes) => {
        if(err) return res.status(500).json({error: 'db error'});
        res.json(notes);
    };
    const {text, tags = []} = req.body;
    store.addNote(text,tags, handler);
    // res.status(201);
};

exports.editNote = (req, res) => {
    const handler = (err, notes) => {
        if(err) return res.status(500).json({error: 'db error'});
        res.json(notes);
    };

    store.updateNote(req.params.id, req.body.text, handler);
    // res.status(201);
};

exports.deleteNote = (req, res) => {
    const handler = (err, notes) => {
        if(err) return res.status(500).json({error: 'db error'});
        res.json(notes);
    };

    store.deleteNote(req.params.id, handler);
}