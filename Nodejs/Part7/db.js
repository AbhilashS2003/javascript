const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/notes.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS notes (
            id TEXT PRIMARY KEY,
            text TEXT NOT NULL,
            tags TEXT,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
            updatedAt TEXT
        )
    `);
});

module.exports = db;
