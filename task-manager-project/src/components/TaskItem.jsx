import './TaskItem.css';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const toggleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
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

export default TaskItem;
