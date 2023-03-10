import { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

const TaskForm = ({ onSubmit, fiveTasks, initialTasks }) => {
  // state for form
  const [description, setDescription] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    let duration = parseInt(minutes) * 60 + parseInt(seconds);
    let newTask = { description, duration };
    let id = "list-item-";
    id = id + Math.random().toString(36).substr(2, 9);
     

    newTask = { id,status: "New", ...newTask };
    onSubmit(newTask);

    setDescription("");
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col pt-3">
        <label
          htmlFor="description"
          className="text-sm font-bold text-black py-4"
        >
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          required
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div className="flex flex-col py-3">
      <label htmlFor="duration" className="text-sm font-bold text-black">
          Duration 
        </label>
        <label htmlFor="duration" className="text-sm font-bold text-black py-4">
          Minutes
        </label>
        <input
          type="number"
          name="minutes"
          id="minutes"
          min="0"
          max="120"
          required
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          value={minutes}
          onChange={(event) => setMinutes(event.target.value)}
        />
        <label htmlFor="duration" className="text-sm font-bold text-black py-4">
          Seconds
        </label>
        <input
          type="number"
          name="seconds"
          id="seconds"
          min="0"
          max="60"
          required
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          value={seconds}
          onChange={(event) => setSeconds(event.target.value)}
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-md hover:bg-blue-900 focus:outline-none"
      >
        <AiOutlinePlus className="w-5 h-5 mr-2" aria-hidden="true" />
        Add Task
      </button>
      
    </form>
    <div className="flex justify-center">
    <div
    onClick={() => {initialTasks === 5 ? fiveTasks(50) : fiveTasks(5)}}
    className="flex items-center justify-center text-center px-4 py-2 my-5 text-sm font-bold text-white bg-red-500 rounded-md hover:bg-red-900 focus:outline-none cursor-pointer w-1/3 "
  >
    <FaRobot className="w-4 h-4 mr-2 hidden sm:block" aria-hidden="true" />
    {initialTasks === 5 ? "Start with 50 tasks" : "Start with 5 tasks"}
  </div>
    </div>
  </>
  );
};

export default TaskForm;
