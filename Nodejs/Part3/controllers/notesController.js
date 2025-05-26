const {getNotes, writeNotes} = require('../utils/fileStore');

exports.getNotes = (req, res) => {
    const notes = getNotes();
    res.json(notes);
};

exports.addNote = (req, res) => {
    const notes = getNotes();
    if(!req.body.text){
            console.log('please type something!!!');
            process.exit(1);
    }
    const newNote = {
            id : notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
            text: req.body.text,
            timeStamp : new Date().toISOString()
    };
    notes.push(newNote);
    writeNotes(notes);
    // console.log(`task added: ${text}`);
    res.status(201).json(newNote);
};

exports.editNote = (req, res) => {
    const id = req.params.id;
    const {text} = req.body;
    const notes = getNotes();
    let note = notes.find(note => note.id == parseInt(id));
    if(!note) {
        res.status(404).json({error: 'note notfound'});
    }
    note.text = text;
    writeNotes(notes);
    res.json(note);
};

exports.deleteNote = (req, res) => {
    const delId = req.params.id;
    let notesDel = getNotes();
    let note = notesDel.find(note => note.id == delId);
    if(!note) {
        res.status(404).json({error: 'note notfound'});
    }
    notesDel = notesDel.filter(note => note.id != delId);
    writeNotes(notesDel);
    res.json(`deleted node: ${note}`);
};