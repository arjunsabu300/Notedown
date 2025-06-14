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
  const [message,setMessage]=useState('');
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
    const response=await axios.post('http://localhost:5000/api/tasks', { ...newTask, userId, completed: false });
    if(response.status===200){
        setMessage('Task Added successfully');
        setTimeout(() => setMessage(''), 3000);
    }
    setNewTask({ title: '', subject: '', dueDate: '' });
    fetchTasks();
  };

  const handleToggleComplete = async (id) => {
    const response=await axios.patch(`http://localhost:5000/api/tasks/${id}/toggle`);
    if(response.status===200){
        setMessage('Task status updated successfully');
        setTimeout(() => setMessage(''), 3000);
    }
    fetchTasks();
  };

  const handleDelete = async (id) => {
    const response=await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    if(response.status===200){
        setMessage('Task deleted successfully');
        setTimeout(() => setMessage(''), 3000);
    }
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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
  {/* Header */}
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
      Your Task Dashboard
    </h1>
    {message && (
      <div className="text-green-600 text-sm sm:text-base text-center sm:text-left">
        {message}
      </div>
    )}
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 text-sm sm:text-base"
    >
      Logout
    </button>
  </div>

  {/* Task Form */}
  <TaskForm onSubmit={handleAddTask} />

  {/* Filters */}
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-6">
    <h2 className="text-lg sm:text-xl font-semibold mb-4">Filters</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Filter by Subject"
        value={subjectFilter}
        onChange={(e) => setSubjectFilter(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
      />
      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
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
