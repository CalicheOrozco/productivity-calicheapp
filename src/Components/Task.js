import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStop, FaCheck, FaTrash, FaEdit, FaRedo } from 'react-icons/fa';

const Task = ({ id, task, onDelete, onDragEnd, onStart, onPause, onStop, onFinish, onEdit, provided, index, prevTask }) => {
  // states for the task
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);
  const [duration, setDuration] = useState(task.duration);
  const [minutes, setMinutes] = useState(Math.floor(duration / 60));
  const [seconds, setSeconds] = useState(duration - minutes * 60);
  const [timer, setTimer] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(duration - elapsedTime);

  // Handlers for the task
  const handleStart = () => {
    if (task.status === 'Completed') {
      handleFinish();
      return;
    }
    setIsRunning(true);
    onStart(id);
    setTimer(setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
    }, 1000));
  };

  const handlePause = () => {
    setIsRunning(false);
    onPause(id);
    clearInterval(timer);
  };

  const handleStop = () => {
    setIsRunning(false);
    onStop(id);
    clearInterval(timer);
    setElapsedTime(0);
    setRemainingTime(duration);
  };

  const handleFinish = () => {
    setIsRunning(false);
    setRemainingTime(duration);
    onFinish(id, elapsedTime);
    clearInterval(timer);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDescription(task.description);
    setDuration(task.duration);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let duration = parseInt(minutes) * 60 + parseInt(seconds);
    onEdit({ id, description, duration });
    setIsEditing(false);
    setRemainingTime(duration)
    setDuration(duration);
    setElapsedTime(0);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    onDragEnd(source.index, destination.index);
  };

  const handleRestart = () => {
    setElapsedTime(0);
    setRemainingTime(duration);
  };
  // function to format the time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedHours}H:${formattedMinutes}M:${formattedSeconds}S`;
  };

  
  // useEffect to run the timer when the task is running
  useEffect(() => {
    let countdownTimer = null;
    if (isRunning && remainingTime > 0) {
      countdownTimer = setInterval(() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      handleFinish();
    }

    return () => clearInterval(countdownTimer);
  }, [isRunning, remainingTime]);
 // useEffect to start the task when the index is 0 and the task is not completed
  useEffect(() => {
    if (index === 0) {
      if(task.status !== 'Completed') {
        handleStart();
      }
    } else {
      if (prevTask === task && task.status !== 'Completed') {
        handlePause();
      }
    }
  
  }, [index]);
   // useEffect to pause the task when the tab is not active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // verify if the task is running and pause it
        clearInterval(timer);
        handlePause();
        
      } 
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
    };
  }, []);

  // useEffect to  check the status of the task and stop the timer when the task is completed, paused or stopped
  useEffect(() => {
    if (task.status === 'Completed' || task.status === 'Paused' || task.status === 'Stopped' ) {
      clearInterval(timer);
      setIsRunning(false);
    }


  }, [task.status]);


  return (
    // added the provided props to the li element to make it draggable and droppable with react-beautiful-dnd
    <li
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
     className="bg-white shadow-md rounded-md px-4 py-3 mb-2 flex items-center justify-between" key={id} draggable={true} onDragEnd={handleDragEnd}>
      {!isEditing && (
        <>
          <div className="flex items-center">
            <div className="mr-4">
              {/* if is running show the icons for pause and stop the task*/}
              {isRunning ? (
                <div className="flex flex-col" >
                  <div div className="flex items-center">
                    <FaPause className="text-yellow-500 cursor-pointer" onClick={handlePause} />
                    <FaStop className="text-red-500 cursor-pointer ml-2" onClick={handleStop} />
                    </div>
                </div>
              ) : (
                // if not running show the icon for start the task
                  task.status !== 'Completed' ?  <FaPlay className="text-blue-500 cursor-pointer" onClick={handleStart} />
                  : <FaCheck className="text-green-500 cursor-pointer" />
              )}
            </div>
             {/* task title and description */}
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">{task.title}</h3>
              <div className="flex items-center">
                <p className="text-sm text-gray-500">{task.description}</p>
                <span className="text-sm text-gray-400 ml-2">{formatTime(remainingTime)}</span>
              </div>
            </div>
          </div>
          {/* icons for finish, restart, edit and delete the task */}
          <div className="flex items-center">
            {task.status !== 'Completed' ? (
              <>
              <FaCheck className="text-green-500 cursor-pointer mr-2" onClick={handleFinish} />
              <FaRedo className="text-blue-500 cursor-pointer mr-2" onClick={handleRestart} />
              <FaEdit className="text-blue-500 cursor-pointer mr-2" onClick={handleEdit} />
              </>
            ) : ( 
              null 
            )

            }
            <FaTrash className="text-red-500 cursor-pointer" onClick={handleDelete} />
          </div>
        </>
      )}
      {/* form to edit the task */}
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="text-lg font-medium border border-gray-300 rounded-md px-2 py-1 w-64"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <div className="flex items-center pb-5">
                <input
                  type="number"
                  className="text-sm text-gray-500 border border-gray-300 rounded-md px-2 py-1 w-16 mr-2"
                  value={minutes}
                  min="0"
                  max="120"
                  onChange={(event) => setMinutes(event.target.value)}
                />
                <span className="text-sm text-gray-400">minutes</span>
              </div>
              <div className="flex items-center pb-5">
                <input
                  type="number"
                  className="text-sm text-gray-500 border border-gray-300 rounded-md px-2 py-1 w-16 mr-2"
                  value={seconds}
                  min="0"
                  max="120"
                  onChange={(event) => setSeconds(event.target.value)}
                />
                <span className="text-sm text-gray-400">seconds</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button type="submit" className="mr-2 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded cursor-pointer">Save</button>
            <button type="submit" className="mr-2 bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
    </li>
  );
};

export default Task;