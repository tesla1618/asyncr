import React, { useState } from "react";
import { Calendar, AlignLeft, Type } from "lucide-react";

const TaskForm = ({ onSubmit, projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, estimatedCompletionDate, projectId });
    setTitle("");
    setDescription("");
    setEstimatedCompletionDate("");
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white shadow-md rounded-lg p-6"
    >
      <div className="relative">
        <Type className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="relative">
        <AlignLeft className="absolute top-3 left-3 text-gray-400" />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          required
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>
      <div className="relative">
        <Calendar className="absolute top-3 left-3 text-gray-400" />
        <input
          type="date"
          value={estimatedCompletionDate}
          onChange={(e) => setEstimatedCompletionDate(e.target.value)}
          required
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
