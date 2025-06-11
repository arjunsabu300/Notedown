
# 📝 Notedown – Student Task Manager

**Notedown** is a task management web application designed for students to help them stay organized, never miss a deadline, and manage assignments with ease.

Built using **MERN stack (MongoDB, Express, React, Node.js)** and **Tailwind CSS**, this app features authentication, task CRUD operations, filters, and WhatsApp reminders using Twilio.

---

## 🚀 Features

- 🔐 **User Authentication** (Login & Register)
- 🧠 **Create / Update / Delete Tasks**
- ✅ **Mark Tasks as Completed**
- 🔍 **Filter by Subject or Due Date**
- 📅 **WhatsApp Reminder 3 Days Before Due** (via Twilio)
- 📈 **Responsive UI with Tailwind CSS**
- 💬 **Clean & Minimal Design**

---

## 📸 Screenshots


| Login Page | Register | Dashboard | Reminder |
|------------|----------|-----------|----------|
| ![Login](./Screenshots/Login.png) | ![Register](./Screenshots/Register.png) | ![Dashboard](./Screenshots/Dashboard.png) | ![Reminder](./Screenshots/message.png) |

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Messaging**: Twilio WhatsApp API
- **Scheduler**: node-cron for automated reminders

---

## 📦 Installation

### Prerequisites
- Node.js
- MongoDB installed locally or MongoDB Atlas
- Twilio account (for WhatsApp reminders)

### Clone the Repository

```bash
git clone https://github.com/your-username/notedown.git
cd notedown
````

### Frontend Setup

```bash
cd client
npm install
npm start
```

### Backend Setup

```bash
cd server
npm install
# Add a .env file
npm run dev
```

### `.env` Configuration (Backend)

```env
MONGO_URI=your_mongodb_connection_string
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=whatsapp:+14155238886  # sandbox or business number
PORT=5000
```

---

## 📅 Scheduled WhatsApp Reminders

Using `node-cron`, the backend checks every day at **8 PM** for upcoming tasks (3 days ahead) and sends a WhatsApp reminder to the student.

---

## 🧪 API Routes

### Auth Routes

```
POST /api/auth/register
POST /api/auth/login
```

### Task Routes

```
GET    /api/tasks?userId=...
POST   /api/tasks
PATCH  /api/tasks/:id/toggle
DELETE /api/tasks/:id
```

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request ✅

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## ✨ Acknowledgements

* [Twilio API](https://www.twilio.com/whatsapp)
* [React](https://react.dev)
* [Tailwind CSS](https://tailwindcss.com)
* [Node Cron](https://www.npmjs.com/package/node-cron)

---

## 🙌 Made with ❤️ by Arjun Sabu

```

