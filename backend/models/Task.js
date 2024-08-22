const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['ToDo', 'InProgress', 'Done'], default: 'ToDo' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
