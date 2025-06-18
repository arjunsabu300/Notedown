const cron = require('node-cron');
const Task = require('./models/Tasks');
const Users = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const twilio = require('twilio');

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


const startreminder=()=>{
    cron.schedule('00 9 * * *',async()=>{
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
    })
}

module.exports = startreminder;