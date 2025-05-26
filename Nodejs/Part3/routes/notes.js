// const { timeStamp } = require('console');
// const fs = require('fs');
// const path = require('path');

// const filepath = path.join(__dirname,'notes.json');
// let tasks = []

// function getNotes() {
//     if (fs.existsSync(filepath)) {
//         const data = fs.readFileSync(filepath, 'utf-8');
//         if (data.trim() !== '') {
//             try {
//                 tasks = JSON.parse(data);
//                 return tasks;
//             } catch (err) {
//                 console.error('❌ Error parsing JSON:', err.message);
//                 process.exit(1);
//             }
//         }
//     }
// }

// function addNote(text){
//     if(!text){
//         console.log('please type something!!!');
//         process.exit(1);
//     }
//     const newNode = {
//             id : tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
//             text,
//             timeStamp : new Date().toISOString()
//     };
//     tasks.push(newNode);
//     fs.writeFileSync(filepath, JSON.stringify(tasks), 'utf-8');
//     console.log(`task added: ${text}`);
// }

// function deleteNode(id) {
//     let idNow = parseInt(id);
//     let delTask = tasks.find(task => task.id === idNow);
//     if(delTask) {
//         tasks = tasks.filter(task => task.id !== idNow);
//         fs.writeFileSync(filepath, JSON.stringify(tasks), 'utf-8');
//         console.log(`task deleted with id: ${idNow}`);
//     } else {
//         console.log('No task to delete with given id');
//     }
// } 


// function editNote(id, newText) {
//     let id1 = parseInt(id);
//     let task = tasks.find(task => task.id === id1);
//     if(task) {
//         task.text = newText;
//         fs.writeFileSync(filepath, JSON.stringify(tasks), 'utf-8');
//         console.log(`task modified with id: ${id1}`);
//         return task;
//     } else {
//         console.log('No task found');
//         return false;
//     }
// } 

// module.exports= {
//     getNotes,
//     addNote,
//     deleteNode,
//     editNote
// };  

const express = require('express');
const router = express.Router();

const {
    getNotes,
    addNote,
    deleteNote,
    editNote
} = require('../controllers/notesController.js');

router.get('/', getNotes);
router.post('/', addNote);
router.put('/:id', editNote);
router.delete('/:id', deleteNote);

module.exports = router;
