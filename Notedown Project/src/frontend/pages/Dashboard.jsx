import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskForm from '../componenets/Taskform';
import TaskList from '../componenets/Tasklist';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [newTask, setNewTask] = useState({ title: '', subject: '', dueDate: '' });
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!userId) navigate('/');
    else fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(`http://localhost:5000/api/tasks?userId=${userId}`);
    setTasks(res.data);
  };

  const handleAddTask = async (newTask) => {
    if (!newTask.title || !newTask.subject || !newTask.dueDate) return;
    console.log('Adding task:', newTask);
    await axios.post('http://localhost:5000/api/tasks', { ...newTask, userId, completed: false });
    setNewTask({ title: '', subject: '', dueDate: '' });
    fetchTasks();
  };

  const handleToggleComplete = async (id) => {
    await axios.patch(`http://localhost:5000/api/tasks/${id}/toggle`);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    navigate('/');
  };

  const filteredTasks = tasks.filter(task =>
    (subjectFilter === '' || task.subject.toLowerCase().includes(subjectFilter.toLowerCase())) &&
    (dateFilter === '' || task.dueDate.startsWith(dateFilter))
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Task Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Task Form */}
      <TaskForm
        onSubmit={handleAddTask}
      />

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Filter by Subject"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="input"
          />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="input"
          />
        </div>
      </div>

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />
    </div>
  );
}
