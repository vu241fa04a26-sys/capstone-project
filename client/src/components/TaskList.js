import React from "react";

const TaskList = ({ tasks, busyTaskId, onToggle, onDelete }) => {
  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <li
          key={task._id}
          className={task.done ? "task-row is-done" : "task-row"}
        >
          <label className="task-label">
            <input
              className="task-check-input"
              type="checkbox"
              checked={task.done}
              disabled={Boolean(busyTaskId) && busyTaskId === task._id}
              onChange={() => onToggle(task)}
            />{" "}
            <span className="task-checkbox" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="m3.5 8.2 3 3 6-6" />
              </svg>
            </span>
            <span className="task-title">{task.title}</span>
          </label>
          <div className="task-actions">
            {task.done && <span className="done-label">Done</span>}
            <button
              type="button"
              className="delete-button"
              aria-label={`Delete ${task.title}`}
              title="Delete task"
              disabled={Boolean(busyTaskId) && busyTaskId === task._id}
              onClick={() => onDelete(task)}
            >
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.7 9H6.2l-.7-9m3 2.5v4m3-4v4" />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
