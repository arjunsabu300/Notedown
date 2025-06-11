const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  dueDate: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true }

});

const Task = mongoose.model('Tasks', TaskSchema);
module.exports=Task;