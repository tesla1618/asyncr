import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Clock, List, AlertCircle, Folder } from "lucide-react";

const ProjectCard = ({ project }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      if (!project.tasks || project.tasks.length === 0) return 0;
      const completedTasks = project.tasks.filter(
        (task) => task.status === "done"
      ).length;
      return Math.round((completedTasks / project.tasks.length) * 100);
    };

    setProgress(calculateProgress());
  }, [project.tasks]);

  const daysUntilDeadline = () => {
    const deadline = new Date(project.deadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressColor = () => {
    if (progress < 33) return "bg-red-500";
    if (progress < 66) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Link
      href={`/projects/${project._id}`}
      className="block transition-all duration-300 hover:scale-105 group"
    >
      <div className="h-96 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-300 flex flex-col group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:shadow-lg">
        <div className="p-6 flex-grow">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-blue-700">
            {project.title}
          </h2>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 group-hover:text-blue-600">
            {project.description}
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                  Progress
                </span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`${getProgressColor()} h-2.5 rounded-full transition-all duration-300 ease-in-out`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold flex items-center mb-2 text-gray-700 group-hover:text-blue-700">
                <List className="w-4 h-4 mr-2" /> Tasks
              </h3>
              {project.tasks && project.tasks.length > 0 ? (
                <ul className="space-y-1">
                  {project.tasks.slice(0, 3).map((task) => (
                    <li key={task._id} className="flex items-center text-sm">
                      {task.status === "done" ? (
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
                      )}
                      <span className="truncate text-gray-600 group-hover:text-blue-600">
                        {task.title}
                      </span>
                    </li>
                  ))}
                  {project.tasks.length > 3 && (
                    <li className="text-sm text-gray-500 group-hover:text-blue-500">
                      ...and {project.tasks.length - 3} more
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic group-hover:text-blue-500">
                  No tasks added yet
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 group-hover:bg-blue-100">
          <div className="flex justify-between items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 group-hover:bg-blue-200 group-hover:text-blue-900">
              <Clock className="w-3 h-3 mr-1" />
              {daysUntilDeadline()} days left
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 group-hover:bg-purple-200 group-hover:text-purple-900">
              <Folder className="w-3 h-3 mr-1" />
              {project.category || "Uncategorized"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
