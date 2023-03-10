import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import TaskHistory from "./TaskHistory";
import TaskChart from "./TaskChart";

function TaskManager() {
  // state for tasks
  const [tasks, setTasks] = useState([]);
  const [durationFilter, setDurationFilter] = useState(null);
  const [initialTasks, setInitialTasks] = useState(50);

  // Handlers
  const handleAddTask = (task) => {

    setTasks([...tasks, task]);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    setTasks(items);
  };

  const handleStartTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "In Progress" } : task
    );
    setTasks(updatedTasks);
  };

  const handlePauseTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "Paused" } : task
    );
    setTasks(updatedTasks);
  };

  const handleStopTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "Pending", timeElapsed: 0 } : task
    );
    setTasks(updatedTasks);
  };

  const handleFinishTask = (taskId, elapsedTime) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "Completed", elapsedTime: elapsedTime } : task
    );
    setTasks(updatedTasks);
  };

  const handleFilterTasks = (filter) => {
    setDurationFilter(filter);
  };

  const handleGenerateRandomTasks = (number) => {
    
    const randomId = Math.floor(Math.random() * 200);
    return fetch(`https://jsonplaceholder.typicode.com/todos/${randomId}`)
      .then((response) => response.json())
      .then((json) => {
       
        let id = "list-item-";
        id = id + Math.random().toString(36).substr(2, 9);
        const duration = Math.floor(Math.random() * 7200);
        const description = `${number+1}. ${json.title}`
        const randomTask = {
          id: id,
          description: description,
          duration: duration,
          status: "Completed",
          elapsedTime: Math.floor(Math.random() * duration)
        };
        return randomTask
      });
  }; 

  const handleGenerateFiveTasks = (number) => {
    setInitialTasks(number);
  }

  // Effects

  useEffect(() => {
    setTasks([]);
    const randomTasks = [];
    for (let i = 0; i < initialTasks; i++) {
      randomTasks.push(handleGenerateRandomTasks(i));
    }
    Promise.all(randomTasks).then((values) => {
      setTasks(values);
    });
  }, [initialTasks]);


  const filteredTasks =
    durationFilter === "short"
      ? tasks.filter((task) => task.duration <= 30 * 60)
      : durationFilter === "medium"
      ? tasks.filter((task) => task.duration > 30  * 60 && task.duration <= 60  * 60)
      : durationFilter === "long"
      ? tasks.filter((task) => task.duration > 60  * 60)
      : tasks;

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 p-4">
        <TaskForm
          onSubmit={handleAddTask}
          fiveTasks={handleGenerateFiveTasks}
          initialTasks={initialTasks}
        />
        <TaskList
          tasks={filteredTasks}
          onDelete={handleDeleteTask}
          onDragEnd={handleDragEnd}
          onStart={handleStartTask}
          onPause={handlePauseTask}
          onStop={handleStopTask}
          onFinish={handleFinishTask}
          onEdit={handleUpdateTask}
        />
      </div>
      <div className="w-full lg:w-2/3 p-4">
        <TaskHistory
          tasks={tasks}
          onFilter={handleFilterTasks}
          selectedFilter={durationFilter}
          onEdit={handleUpdateTask}
        />
        <TaskChart tasks={tasks} />
      </div>
    </div>
  );
}

export default TaskManager;