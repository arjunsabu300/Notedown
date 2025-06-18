const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Users = require('./models/User');
const Task = require('./models/Tasks');
const startreminder = require('./Message');
const axios = require('axios');
const twilio = require('twilio');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

main()
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

async function main() {
  console.log("Connecting to:", process.env.MONGODB_URL); // temporary debug
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
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

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});





const accountSid = process.env.Twilio_sid;
const authToken = process.env.Twilio_auth_token;

const client = twilio(accountSid,authToken);

const FROM_NUMBER= process.env.Twilio_from_number;


const sendWhatsappreminder = async(task,tophonenumber)=>{
    try {
        await client.messages.create({
            from: FROM_NUMBER,
            to: `whatsapp:+91${tophonenumber}`,
            
            body: `🔔 Reminder: You have an upcoming task "${task.title}" for subject "${task.subject}" due on ${task.dueDate}. Don't forget to finish it!`,

        });
        console.log('reminder sent for task:',task.title);
        console.log(tophonenumber);
        
    } catch (error) {
        console.error('Error sending reminder', error);
    }
};


app.get('/send-whatsapp-reminders',async(req,res)=>{
  try{
        const now = new Date();
        const threedayslater = new Date(now);
        threedayslater.setDate(now.getDate()+2);
        console.log(threedayslater);

        const datestr = threedayslater.toISOString().split('T')[0];
        console.log(datestr);
        const tasks = await Task.find({dueDate: datestr,completed:false});

        for(const task of tasks){
            const user = await Users.findById(task.userId);
            const userphonenumber = user.phonenumber
            if(userphonenumber){
                await sendWhatsappreminder(task,userphonenumber);
            }
            else{
                console.log('No phonenumber found');
            }
        }
        res.send(`✅ Sent WhatsApp reminders for tasks due on ${datestr}`);
  }catch(error){
      console.error('Error sending reminders:', error);
      res.status(500).json({ error: 'Failed to send reminders' });
  }
});





setInterval(() => {
  axios.get('https://notedown-project.onrender.com/healthcheck')
    .then(response => {
      console.log('Ping successful:', response.data);
    })
    .catch(error => {
      console.error('Ping failed:', error.message);
    });
}, 5 * 60 * 1000); 

app.listen(5000, () => console.log("Server running on port 5000"));



