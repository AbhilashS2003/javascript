const { off } = require('process');
const db = require('../db');
const { v4 : uuidv4 } = require('uuid');

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

function getFilteredNotes({
    search, 
    tag,
    from,
    to,
    page, 
    limit, 
    sortBy, 
    order }, callback) {
        const offset = (page -1) * limit;
        const params = [];
        const countParams = [];

        let whereClause = [];
        let query = 'select * from notes ';

        if(search) {
            whereClause.push(` text LIKE ? `);
            params.push(`%${search}%`);
            countParams.push(`%${search}%`);
        }

        if(tag) {
            whereClause.push(` tag = ? `);    
            params.push(tag);
            countParams.push(tag);
        }

        if(from) {
            whereClause.push(` createdAt >= ? `);
            params.push(from);
            countParams.push(from);
        }

        if(to){
            whereClause.push(` createdAt <= ? `);
            params.push(to);
            countParams.push(to);
        }

        if(whereClause.length > 0) {
            query += `where ` + whereClause.join(' and ');
        }

        query += ` order by ${sortBy} ${order === 'asc' ? 'asc' : 'desc'}`;
        query += ` limit ? offset ?`;
        params.push(Number(limit), offset);

        let countQuery = ` select count(*) as count from notes `;
        if(whereClause.length > 0) {
            countQuery += ` where ` + whereClause.join(' and ');
        }

        db.all(query, params, (err,rows) => {
            if(err) return callback(err);

            db.get(countQuery, countParams, (err2, countResult) => {
                if(err2) return callback(err);

                callback(null, {
                    data: rows,
                    total: countResult.count,
                    page: Number(page),
                    limit: Number(limit)
                });
            });
        });
    }

module.exports = {
    getAllNotes,
    addNote,
    updateNote,
    deleteNote,
    filterNotesByText,
    getNoteByTag,
    getNotesByDate,
    getFilteredNotes
};