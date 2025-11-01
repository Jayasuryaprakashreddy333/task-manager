import { useEffect, useState } from "react";
import { fetchAllTasks, updateTask } from "../apiservices";
const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [editingId, setEditingId] = useState(null); // Track which task is being edited
  const [editData, setEditData] = useState({ status: "", priority: "" });

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const data = await fetchAllTasks({ status, priority });
        if (data) {
        setTasks(data);
      }
    } catch (error) {
      alert("Error fetching tasks");
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [status, priority]);

  // Enable editing
  const handleUpdate = (task) => {
    setEditingId(task.id);
    setEditData({
      status: task.status,
      priority: task.priority,
    });
  };

  // Save edited task
  const handleSave = async (id) => {
    try {
      const updated = await updateTask({ id, ...editData });
        if (updated) {
        alert("Task updated successfully!");
        fetchTasks();
        setEditingId(null);
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "text-blue-500";
      case "In Progress":
        return "text-yellow-500";
      case "Completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-orange-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-6 w-full bg-[#FFFFFF] min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Task List</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="InProgress">InProgress</option>
          <option value="Done">Done</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Task List */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Priority</th>
              <th className="border p-2">Created</th>
              <th className="border p-2">Due Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="text-center">
                  <td className="border p-2 font-medium">{task.title}</td>
                  <td className="border p-2">{task.description}</td>

                  {/* Status Cell */}
                  <td className="border p-2">
                    {editingId === task.id ? (
                      <select
                        value={editData.status}
                        onChange={(e) =>
                          setEditData({ ...editData, status: e.target.value })
                        }
                        className="border rounded p-1"
                      >
                        <option value="Open">Open</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Done">Done</option>
                      </select>
                    ) : (
                      <span
                        className={`font-semibold ${getStatusColor(task.status)}`}
                      >
                        {task.status}
                      </span>
                    )}
                  </td>

                  {/* Priority Cell */}
                  <td className="border p-2">
                    {editingId === task.id ? (
                      <select
                        value={editData.priority}
                        onChange={(e) =>
                          setEditData({ ...editData, priority: e.target.value })
                        }
                        className="border rounded p-1"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    ) : (
                      <span
                        className={`font-semibold ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    )}
                  </td>

                  <td className="border p-2">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>

                  {/* Action Button */}
                  <td className="border p-2">
                    {editingId === task.id ? (
                      <button
                        onClick={() => handleSave(task.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdate(task)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                      >
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-3 text-center text-gray-500" colSpan="7">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksList;
