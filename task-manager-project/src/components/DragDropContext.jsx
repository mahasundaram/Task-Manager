import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
 import './DragDropContext.css';

const ItemType = 'TASK';

const DraggableTask = ({ task, index, moveTask, updateTask, deleteTask }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index }
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item) => {
      if (item.index !== index) {
        moveTask(item.index, index);
        item.index = index;
      }
    }
  });

  const toggleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  return (
    <div ref={(node) => ref(drop(node))} className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span>Priority: {task.priority}</span>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
      />
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};


const DragDropContext = ({ tasks, setTasks, updateTask, deleteTask }) => {
  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-list">
        {tasks.map((task, index) => (
          <DraggableTask
            key={task.id}
            index={index}
            task={task}
            moveTask={moveTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DragDropContext;
