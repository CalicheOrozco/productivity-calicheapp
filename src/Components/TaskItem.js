import React from "react";

const TaskItem = ({ id, task, completed }) => {
  // function to format time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);

    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedHours}H:${formattedMinutes}M:${formattedSeconds}S`;
  };

  // function to format the status
  const statusColor = () => {
    if (task.status === "Completed") {
      return "bg-green-500";
    } else if (task.status === "In Progress") {
      return "bg-blue-500";
    } else if (task.status === "Pending") {
      return "bg-red-500";
    } else if (task.status === "Paused") {
      return "bg-yellow-500";
    } else if (task.status === "New") {
      return "bg-orange-500";
    }
     else {
      return "bg-gray-200";
    }
  };

  return (
    <div key={id} className="p-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{task.description}</h3>
        <span
          className={`px-2 py-1 rounded-full text-sm font-bold text-white ${statusColor()}`}
        >
          {task.status}
        </span>
      </div>
      {
        completed ? (
          <div className="flex justify-start items-center mt-2">
        <span className="text-sm text-gray-400">
          {formatTime(task.elapsedTime)}
        </span>
      </div>
        ) : (
          null
        )
      }
    </div>
  );
};

export default TaskItem;
