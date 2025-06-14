export default function TaskList({ tasks, onToggleComplete, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        <p className="text-gray-600 text-center">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow transition duration-200"
          >
            <div>
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </h3>
              <p className="text-sm text-gray-500">{task.subject} — {task.dueDate.split('T')[0]}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onToggleComplete(task._id)}
                className={`px-3 py-1 rounded text-white text-sm ${task.completed ? 'bg-yellow-500' : 'bg-green-500 hover:bg-green-600'}`}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
