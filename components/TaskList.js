import React, { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tasks?projectId=${projectId}`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update task status");
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No tasks found for this project.
        </p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Due:{" "}
                {new Date(task.estimatedCompletionDate).toLocaleDateString()}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${
                  task.status === "done"
                    ? "bg-green-100 text-green-800"
                    : task.status === "problematic"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {task.status}
              </span>
            </div>
            <div className="flex space-x-2">
              {task.status !== "done" && (
                <button
                  onClick={() => updateTaskStatus(task._id, "done")}
                  className="flex items-center px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Done
                </button>
              )}
              {task.status !== "problematic" && task.status !== "done" && (
                <button
                  onClick={() => updateTaskStatus(task._id, "problematic")}
                  className="flex items-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Flag as Problematic
                </button>
              )}
              {task.status === "problematic" && (
                <button
                  onClick={() => updateTaskStatus(task._id, "solved")}
                  className="flex items-center px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Mark as Solved
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
