const fs = require('fs');

const filepath = './notes.json';
let tasks = []
 
if (fs.existsSync(filepath)) {
  const data = fs.readFileSync(filepath, 'utf-8');
  if (data.trim() !== '') {
    try {
      tasks = JSON.parse(data);
    } catch (err) {
      console.error('❌ Error parsing JSON:', err.message);
      process.exit(1);
    }
  }
}

const command = process.argv[2];
const input = process.argv[3];
const modifier = process.argv[4];

if (command == 'add') {
    if(!input){
     console.log('please type something!!!');
     process.exit(1);
    }
    const newNode = {
        id : tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        text : input
    };
    tasks.push(newNode);
    fs.writeFileSync(filepath, JSON.stringify(tasks), 'utf-8');
    console.log(`task added: ${input}`);
} else if (command == 'list') {
    const data = fs.readFileSync(filepath);
    if (data == '') { 
        console.log('Empty file');
    } else {
        console.log(JSON.parse(data));
    }
} else if (command == 'remove') {
    let id = parseInt(input);
    tasks = tasks.filter(task => task.id !== id);
    fs.writeFileSync(filepath, JSON.stringify(tasks), 'utf-8');
    console.log(`task deleted with id: ${input}`);
} else if (command == 'edit') {
    let id = parseInt(input);
    let task = tasks.find(task => task.id === id);
    task.text = modifier;
    fs.writeFileSync(filepath, JSON.stringify(tasks), 'utf-8');
    console.log(`task modified with id: ${input}`);
} 
