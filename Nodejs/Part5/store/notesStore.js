const {getNotes, writeNotes} = require('../utils/fileStore');

let notes = getNotes();
let noteIndexById = {};

notes.forEach(note => {
  noteIndexById[note.id] = note;
});

function getAllNotes() {
    return notes;
}

function addNote(text){
    if(!text){
        console.log('please type something!!!');
        process.exit(1);
    }
    const note = {
            id : notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
            text,
            // timeStamp : new Date().toISOString(),
            tags : [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
    };
    notes.push(note);
    persist();
    return notes;
}

function updateNote(id, newText){
    // let note = notes.find(note => note.id == id);
    const note = noteIndexById[id];
    if(!note) return null
    note.text = newText;
    note.updatedAt = new Date().toISOString();
    persist();
    return note;
}

function deleteNote(id) {
    const index = notes.findIndex(n => n.id == parseInt(id));
    if( index == -1) return false;
    notes.splice(index, 1);
    persist();
    return notes;
}

function filterNotesByText(keyword) {
    return notes.filter(n => n.text.includes(keyword));
}

function getNoteByTag(tag) {
    return notes.filter(n => n.tags.includes(tag));
}

function getNotesByDate(from, to) {
    return notes.filter(n => {
        const created = new Date(n.createdAt);
        return (!from || created >= new Date(from)) &&
               (!to || created <= new Date(to));
    });
}
function persist() {
    writeNotes(notes);
}

setInterval(() => {
    console.log('auto saving ...');
    persist();
},30000);

module.exports = {
    getAllNotes,
    addNote,
    updateNote,
    deleteNote,
    filterNotesByText,
    getNoteByTag,
    getNotesByDate
};