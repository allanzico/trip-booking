
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Tasks = ({ checklist }) => {
  const [taskName, setTaskName] = useState("");
  const [newTaskName, setNewTaskName] = useState("");

  const addNewTask = () => {
    if (!newTaskName) return
    let newTask = {
      id: uuidv4(),
      taskName: newTaskName,
      editing: false,
      completed: false,
    };
    checklist.tasks.push(newTask);
    setNewTaskName("")
    console.log(checklist);
  };

  // useEffect(() => {
  // setTaskName({...checklist.tasks.taskName})
  // }, [])
  
  const handleChange = (evt) => {
    // setValues({
    //   ...values,
    //   [evt.target.name]: evt.target.value,
    // });
  };

  // const addNewTask = (sectionId, taskName) => {
  //     let newTask = {
  //       id: keyRandomizer(),
  //       desc: taskName,
  //       editting: false
  //     };

  //     let allSectionsCopy = JSON.parse(JSON.stringify(sections));
  //     let sectionIndex = allSectionsCopy.findIndex(
  //       section => section.id === sectionId
  //     );
  //     let sectionToUpdate = allSectionsCopy[sectionIndex];

  //     sectionToUpdate.tasks = [...sectionToUpdate.tasks, newTask];

  //     setSections([...allSectionsCopy]);
  //   };
  // const handleSubmit = e => {
  //   e.preventDefault();

  //   addNewTask(checkList.id, newTaskName);

  //   setTaskName("");
  // };

  // const handleUpdateTaskDesc = (e, sectionId, taskId) => {
  //   updateTaskDesc(e.target.value, sectionId, taskId);
  // };

  // const handleToggle = (sectionId, taskId) => {
  //   toggleTaskEditMode(sectionId, taskId);
  // };

  // const handleNewTaskChange = e => {
  //   setTaskName(e.target.value);
  // };

  return (
    <>
      <form onSubmit={addNewTask}>
        <div className="flex flex-row gap-2">
          <input
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            class="appearance-none text-xs block w-full bg-white border border-gray-200 text-gray-700 rounded-sm mb-2 py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border focus:border-gray-100"
            type="text"
            placeholder="Add task"
          />
          <div className="cursor-pointer">
            <button
              type="submit"
              className="
              text-white
              text-xs
              bg-orange-500
              rounded-sm
              px-2
              py-2
              transition
              hover:bg-orange-700
              uppercase
              "
            >
              Add
            </button>
          </div>
        </div>
      </form>
      {checklist.tasks &&
        checklist.tasks.map((task) => (
          <div className="flex flex-row items-center gap-2">
            <input
            key={task.id}
              value={task.taskName}
              onChange={(e) => setTaskName(e.target.value)}
              class="appearance-none block w-full bg-gray-100 text-gray-700 rounded-sm mb-2 py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border focus:border-gray-100"
              type="text"
              placeholder="Add Task"
            />{" "}
          </div>
        ))}
    </>

  
  );
};

export default Tasks;
