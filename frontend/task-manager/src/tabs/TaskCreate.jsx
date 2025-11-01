import {useState} from 'react';
import { createTask } from '../apiservices';

export default function TaskCreate({onCreate}) {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [status,setStatus] = useState('Open');
    const [priority,setPriority] = useState('Medium');
    const [dueDate,setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description, status, priority, dueDate };
        const res = await createTask(taskData);
        if (res) {
            alert('Task created successfully! and you can check it in Task List tab.');
            setTitle('');
            setDescription('');
            setStatus('Open');
            setPriority('Medium');
            setDueDate('');
        }
        else {
            alert('Error creating task. Please try again.');
        }
    }

    return (
        <div className="bg-[#FFFFFF] min-h-screen flex flex-col align-center">
            <h1 className="text-3xl font-bold text-center my-4">Task Manager</h1>
    <form
  onSubmit={handleSubmit}
  className="max-w-lg mx-auto bg-black w-[600px] shadow-lg rounded-2xl p-6 space-y-4 border border-gray-200"
>
  <h2 className="text-2xl font-semibold text-white text-center">Create a New Task</h2>

  <div>
    <label className="block text-sm font-medium text-white mb-1">Title</label>
    <input
      type="text"
      placeholder="Enter title of task"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full p-2 border text-gray-700 bg-white text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-white mb-1">Description</label>
    <textarea
      placeholder="Enter description of task..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full p-2 bg-white text-gray-700 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows="3"
    ></textarea>
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-white mb-1">Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 bg-white text-gray-700 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Open">Open</option>
        <option value="InProgress">InProgress</option>
        <option value="Done">Done</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-white mb-1">Priority</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full bg-white p-2 text-gray-700 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  </div>

  <div>
    <label className="block text-sm font-medium text-white mb-1">Due Date</label>
    <input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
      className="w-full p-2 text-gray-700 bg-white text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
  >
    Create Task
  </button>
</form>
</div>
)};
