const db = require('../db');
const { v4 : uuidv4 } = require('uuid');

// function getAllNotes(callback) {
//     db.all('select * from notes', [], callback);
// }
function getAllNotes(callback) {
    db.all('SELECT * FROM notes', [], (err, rows) => {
        if (err) return callback(err);

        const notes = rows.map(note => ({
            ...note,
            tags: note.tags ? JSON.parse(note.tags) : []
        }));

        callback(null, notes);
    });
}

function addNote(text,tags, callback) {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    // let tags = [];
    db.run(
        'insert into notes (id, text, tags, createdAt) values (?, ?, ?, ?)',
        [id, text, JSON.stringify(tags), createdAt],
        function (err) {
            if (err) {
                console.error("DB Insert Error:", err.message);
                return callback(err);
            }
            callback(null, {id, text, tags, createdAt});
        }
    );
}

function updateNote(id, newText, callback) {
    const updatedAt = new Date().toISOString();
    db.run(
        'update notes set text = ?, updatedAt = ?  where id = ?',
        [newText, updatedAt, id],
        function(err){
            if(err) return callback(err);
            if(this.changes === 0) return callback(null, null);
            callback(null, {id, text : newText, updatedAt});
        }
    );
}

function deleteNote(id, callback) {
    db.run(
        'delete from notes where id = ?',[id],
        function(err) {
            if(err) return callback(err);
            callback(null, this.changes > 0);
        });
}

// function filterNotesByText(keyword ,callback) {
//     db.all(
//         'select * from notes where text like ?',
//         [`%${keyword}%`], callback
//     );
// }
function filterNotesByText(keyword, callback) {
    db.all('SELECT * FROM notes WHERE text LIKE ?', [`%${keyword}%`], (err, rows) => {
        if (err) return callback(err);

        const notes = rows.map(note => ({
            ...note,
            tags: note.tags ? JSON.parse(note.tags) : []
        }));

        callback(null, notes);
    });
}

function getNoteByTag(tag, callback) {
    db.all('SELECT * FROM notes WHERE tags LIKE ?', [`%${tag}%`], (err, rows) => {
        if (err) return callback(err);

        const notes = rows.map(note => ({
            ...note,
            tags: note.tags ? JSON.parse(note.tags) : []
        }));

        callback(null, notes);
    });
}

function getNotesByDate(from, to , callback){
    const conditions = [];
    const params =  [];

    if(from) {
        conditions.push('createdAt >= ?');
        params.push(from);
    }

    if(to) {
        conditions.push('createdAt <= ?');
        params.push(to);
    }

    const whereClause = conditions.length ? 'WHERE ' + conditions.join(' AND '): '';

    const query = `SELECT * FROM notes ${whereClause}`;

    db.all(query, params, (err, rows) => {
        if (err) return callback(err);

        const notes = rows.map(note => ({
            ...note,
            tags: note.tags ? JSON.parse(note.tags) : []
        }));

        callback(null, notes);
    });
}

module.exports = {
    getAllNotes,
    addNote,
    updateNote,
    deleteNote,
    filterNotesByText,
    getNoteByTag,
    getNotesByDate
};