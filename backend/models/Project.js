const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  files: [
    {
      fileName: { type: String, required: true },
      filePath: { type: String, required: true },
    }
  ],
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
