const fs = require('fs');
const Module = require('module');
const path = require('path');

// const filepath = path.join(__dirname, '../data/notes.json');
const dataDir = path.join(__dirname, '../data');
const filepath = path.join(dataDir, 'notes.json');
console.log(filepath);

function getNotes() {
    if (fs.existsSync(filepath)) {
        const data = fs.readFileSync(filepath, 'utf-8');
        if (data.trim() != '') {
            try {
                return JSON.parse(data); 
            } catch (err) {
                console.error('❌ Error parsing JSON:', err.message);
                process.exit(1);
            }
        }
    }
    return [];
}

function writeNotes(notes) {
    fs.writeFileSync(filepath, JSON.stringify(notes, null, 2), 'utf-8');
    
}

module.exports = {getNotes, writeNotes};