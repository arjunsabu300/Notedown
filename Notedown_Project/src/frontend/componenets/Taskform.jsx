import { useState } from 'react';

export default function TaskForm({ onSubmit, existingTask = null }) {
  const [title, setTitle] = useState(existingTask?.title || '');
  const [subject, setSubject] = useState(existingTask?.subject || '');
  const [dueDate, setDueDate] = useState(existingTask?.dueDate?.split('T')[0] || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !subject || !dueDate) return;
    console.log('Submitting task:', { title, subject, dueDate });
    onSubmit({ title, subject, dueDate });
    setTitle('');
    setSubject('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">{existingTask ? 'Edit Task' : 'Add New Task'}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="input"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input"
        />
      </div>
        <div className="flex justify-center">

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-3xl transition"
      >
        {existingTask ? 'Update Task' : 'Add Task'}
      </button>
      </div>

    </form>
  );
}
