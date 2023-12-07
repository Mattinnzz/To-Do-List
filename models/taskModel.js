
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
     title: String,
     completed: Boolean,
});

module.exports = mongoose.model('TaskMongo', TaskSchema);




















// const TaskMongo = require('./task.mongo');

// class Task {
//     constructor(id, task, checked) {
//         this.id = id;
//         this.task = task;
//         this.checked = checked;
//     }
// }

// module.exports = Task;
