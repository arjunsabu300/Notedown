const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Users = require('./models/User');
const Task = require('./models/Tasks');
const startreminder = require('./Message');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

main()
.then(()=>console.log('DB connected..'))
.catch(err => console.log(err));

startreminder();

async function main() {
   await mongoose.connect(process.env.MONGODB_URL);
    
}

app.post('/api/register', async (req, res) => {
  const { username, password,phonenumber } = req.body;
  const user = new Users({ username:username, password:password,phonenumber:phonenumber });
  await user.save();
  res.status(200).json({data:'User registered'});
});


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username, password });
  if (user) res.json({ userId: user._id });
  else res.status(401).send('Invalid credentials');
});


app.get('/api/tasks', async (req, res) => {
  const { userId } = req.query;
  try {
    if(!userId){
        return res.status(400).json({error:'User ID is required'})
    }
    console.log('Fetching tasks for user:', userId);
    const tasks = await Task.find({ userId }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST add a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    console.log('Creating task:', newTask);
    await newTask.save();
    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// PATCH toggle task completion
app.patch('/api/tasks/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(404).json({ error: 'Task not found' });
  }
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(404).json({ error: 'Task not found' });
  }
});


 app.listen(5000, () => console.log("Server running on port 5000"));



