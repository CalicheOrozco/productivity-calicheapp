import React, { useState } from "react";
import Task from "./Task";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function TaskList({
  tasks,
  onDelete,
  onDragEnd,
  onStart,
  onPause,
  onStop,
  onFinish,
  onEdit,
  
}) {

  const [prevTask, setprevTask] = useState([])


  return (
    // implementation of react-beautiful-dnd
    // context provider
    <DragDropContext onDragEnd={onDragEnd}>
      {/* droppable area */}
      <Droppable droppableId="taskList">
        {(droppanleProvided) => (
          <ul
            {...droppanleProvided.droppableProps}
            ref={droppanleProvided.innerRef}
            className="flex flex-col space-y-4"
          >
            {tasks.length < 1 ? (
              <p className="text-center font-medium">No tasks to display...</p>
            ) : (
              tasks.map((task, index) => (
                index === 0 ? setprevTask(task) : null,
                // draggable item
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <Task
                      provided={provided}
                      id={task.id}
                      task={task}
                      onDelete={onDelete}
                      onStart={onStart}
                      onPause={onPause}
                      onStop={onStop}
                      onFinish={onFinish}
                      onEdit={onEdit}
                      index={index}
                      prevTask={prevTask}
                    />
                  )}
                </Draggable>
              ))
            )}
            {droppanleProvided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskList;
