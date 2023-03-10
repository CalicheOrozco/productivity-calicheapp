import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskHistory = ({ tasks, onFilter, selectedFilter }) => {
  // state for tasks
  const [showFilters, setShowFilters] = useState(false);

  // Handlers
  const handleFilterClick = () => {
    setShowFilters(showFilters => !showFilters);
  };

  const handleFilter = (filter) => {
    onFilter(filter);
    setShowFilters(false);
  };

  // render tasks
  const renderTasksCompleted = () => {
    return tasks.map((task) => 
      {
        if (task.status === "Completed") { 
          return <TaskItem key={task.id} task={task} completed={true} /> 
        }
      }
    );
  };

  const renderTasksUncompleted = () => {
    return tasks.map((task) => 
      {
        if (task.status !== "Completed") { 
          return <TaskItem key={task.id} task={task} completed={false}  /> 
        }
      }
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Task History</h2>
        <button
          onClick={handleFilterClick}
          className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        >
          Filter
        </button>
      </div>
      {showFilters && (
        <div className="mb-4">
          <p className="mb-2 font-bold">Filter by duration:</p>
          <button
            className={`mr-2 ${
              selectedFilter === "short" ? "bg-blue-500" : "bg-blue-900"
            } hover:bg-blue-500 text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleFilter("short")}
          >
            Short
          </button>
          <button
            className={`mr-2 ${
              selectedFilter === "medium" ? "bg-blue-500" : "bg-blue-900"
            } hover:bg-blue-500 text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleFilter("medium")}
          >
            Medium
          </button>
          <button
            className={`mr-2 ${
              selectedFilter === "long" ? "bg-blue-500" : "bg-blue-900"
            } hover:bg-blue-500 text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleFilter("long")}
          >
            Long
          </button>
          <button
            className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleFilter(null)}
          >
            Reset
          </button>
        </div>
      )}
      <h1 className="font-bold">Completed Tasks</h1>
      {renderTasksCompleted()}
      <hr className="h-1 my-4 bg-gray-300 border-0 rounded md:my-10 "/>
      <h1 className="font-bold">Task to do</h1>
      {renderTasksUncompleted()}
    </div>
  );
};

export default TaskHistory;
