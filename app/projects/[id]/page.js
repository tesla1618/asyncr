"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) throw new Error("Failed to fetch project");
      const data = await res.json();
      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error("Failed to create task");
      fetchProject();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!project) {
    return <div className="text-center text-red-500">Project not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-12 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
          <p className="text-md text-gray-600 mb-8 text-justify">
            {project.description}
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Tasks</h2>
          <TaskList projectId={id} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
          <TaskForm onSubmit={handleCreateTask} projectId={id} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
