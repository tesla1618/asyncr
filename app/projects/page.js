"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ProjectCard from "@/components/ProjectCard";
import { Plus, Filter } from "lucide-react";
import ProjectForm from "@/components/ProjectForm";
import Link from "next/link";

const ProjectsPage = () => {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({ category: "all", status: "all" });
  const [showAlert, setShowAlert] = useState(false); // State for alert modal

  useEffect(() => {
    if (session) {
      fetchProjects();
    } else {
      setLoading(false);
      setShowAlert(true);
    }
  }, [status]);

  useEffect(() => {
    filterProjects();
  }, [projects, filter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = [...projects];
    if (filter.category !== "all") {
      filtered = filtered.filter(
        (project) => project.category === filter.category
      );
    }
    if (filter.status !== "all") {
      filtered = filtered.filter((project) => {
        const progress = calculateProgress(project);
        if (filter.status === "not-started") return progress === 0;
        if (filter.status === "in-progress")
          return progress > 0 && progress < 100;
        if (filter.status === "completed") return progress === 100;
        return true;
      });
    }
    setFilteredProjects(filtered);
  };

  const calculateProgress = (project) => {
    if (!project.tasks || project.tasks.length === 0) return 0;
    const completedTasks = project.tasks.filter(
      (task) => task.status === "done"
    ).length;
    return Math.round((completedTasks / project.tasks.length) * 100);
  };

  const handleCreateProject = async (projectData) => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      if (!res.ok) throw new Error("Failed to create project");
      fetchProjects();
      setShowModal(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="all">All Status</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <Filter
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
        </div>
      </div>
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-xl text-gray-600 mb-4">No projects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors duration-300"
      >
        <Plus size={24} />
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            <ProjectForm onSubmit={handleCreateProject} />
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!session && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 text-center w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Sign In Required</h3>
            <p className="mb-6">Please sign in to access your projects.</p>
            <Link
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              href="/auth/signin"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
