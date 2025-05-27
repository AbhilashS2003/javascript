const store = require('../store/notesStore');

// exports.getNotes = (req, res) => {
//     const { search, tag, from, to } = req.query;

//     if (tag) {
//         return res.json(store.getNoteByTag(tag));
//     }

//     if (search) {
//         return res.json(store.filterNotesByText(search));
//     }

//     if (from || to) {
//         return res.json(store.getNotesByDate(from, to));
//     }

//     res.json(store.getAllNotes());
// };

exports.getNotes = (req, res) => {
    const {
        search = '', 
        page = 1, 
        limit = 10, 
        sortBy = 'createdAt', 
        order = 'desc'
    } = req.query;

    let notes;
    try {
        notes = store.getAllNotes(); 
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch notes' });
    }

    let filtered = notes;
    if(search) {
        filtered = filtered.filter(note => note.text.toLowerCase().includes(search.toLowerCase()));
    }
    filtered.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];

        if(order == 'asc') return aVal > bVal ? 1 : -1;
        return aVal < bVal ? 1 : -1
    });

    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + Number(limit));

    res.json({
        data: paginated,
        total: filtered.length,
        page: Number(page),
        limit: Number(limit)
    });
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

