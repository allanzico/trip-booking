import React, { useState } from "react";
import ReactDOM from "react-dom";
import AddSectionForm from "./AddSectionForm";
import ProjectSections from "./ProjectSections";

import "./styles.css";

function App() {
  const [sections, setSections] = useState([
    {
      id: 1,
      sectionName: "Chores",
      tasks: [{ id: 1, desc: "Take out trash", editting: false }]
    }
  ]);

  const addNewSection = sectionName => {
    let newSection = {
      id: keyRandomizer(),
      sectionName: sectionName,
      tasks: []
    };

    setSections([...sections, newSection]);
  };

  const addNewTask = (sectionId, taskName) => {
    let newTask = {
      id: keyRandomizer(),
      desc: taskName,
      editting: false
    };

    let allSectionsCopy = JSON.parse(JSON.stringify(sections));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];

    sectionToUpdate.tasks = [...sectionToUpdate.tasks, newTask];

    setSections([...allSectionsCopy]);
  };

  const updateTaskDesc = (desc, sectionId, taskId) => {
    let allSectionsCopy = JSON.parse(JSON.stringify(sections));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];
    let taskIndex = sectionToUpdate.tasks.findIndex(task => task.id === taskId);
    let taskToUpdate = sectionToUpdate.tasks[taskIndex];

    taskToUpdate.desc = desc;

    setSections([...allSectionsCopy]);
  };

  const toggleTaskEditMode = (sectionId, taskId) => {
    let allSectionsCopy = JSON.parse(JSON.stringify(sections));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];
    let taskIndex = sectionToUpdate.tasks.findIndex(task => task.id === taskId);
    let taskToUpdate = sectionToUpdate.tasks[taskIndex];

    taskToUpdate.editting = !taskToUpdate.editting;

    setSections([...allSectionsCopy]);
  };

  const keyRandomizer = () => {
    let randomKey = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) {
      randomKey += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomKey;
  };

  return (
    <div className="App">
      <AddSectionForm addNewSection={addNewSection} />
      <ProjectSections
        sections={sections}
        addNewTask={addNewTask}
        updateTaskDesc={updateTaskDesc}
        toggleTaskEditMode={toggleTaskEditMode}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
