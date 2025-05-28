const path = require('path');

const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'data', 'notes.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to open database:", err.message);
  } else {
    console.log("Connected to the database.");
    console.log(dbPath);
  }
});

console.log(db)
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
