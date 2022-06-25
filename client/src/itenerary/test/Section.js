import React, { useState } from "react";

const Section = ({
  section,
  addNewTask,
  toggleTaskEditMode,
  updateTaskDesc
}) => {
  const [newTaskName, setTaskName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    addNewTask(section.id, newTaskName);

    setTaskName("");
  };

  const handleUpdateTaskDesc = (e, sectionId, taskId) => {
    updateTaskDesc(e.target.value, sectionId, taskId);
  };

  const handleToggle = (sectionId, taskId) => {
    toggleTaskEditMode(sectionId, taskId);
  };

  const handleNewTaskChange = e => {
    setTaskName(e.target.value);
  };

  return (
    <div className="section">
      <h4>{section.sectionName}</h4>
      {section.tasks.map(task => {
        return !task.editting ? (
          <div className="task-item">
            <label>{task.desc}</label>
            <button onClick={() => handleToggle(section.id, task.id)}>
              Edit
            </button>
          </div>
        ) : (
          <div className="task-item">
            <input
              value={task.desc}
              onChange={e => handleUpdateTaskDesc(e, section.id, task.id)}
            />
            <button onClick={() => handleToggle(section.id, task.id)}>
              Done
            </button>
          </div>
        );
      })}

      {/* Add new task */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add Task"
          name="task"
          onChange={handleNewTaskChange}
          value={newTaskName}
        />
        <button type="submit" disabled={!newTaskName.length}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Section;
