import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { XCircleIcon, XIcon } from "@heroicons/react/outline";

const Tasks = ({ checklist }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(checklist.tasks);
  }, []);

  const addNewTask = () => {
    if (!newTaskName) return;
    let newTask = {
      id: uuidv4(),
      taskName: newTaskName,
      editing: false,
      completed: false,
    };
    checklist.tasks.push(newTask);
    // setTasks([...tasks, newTask])
    setNewTaskName("");
  };

  const handleUpdateTask = (e, taskId) => {
    updateTaskName(e.target.value, taskId);
  };

  const updateTaskName = (taskName, taskId) => {
    let taskIndex = checklist.tasks.findIndex((task) => task.id === taskId);
    let taskToUpdate = checklist.tasks[taskIndex];
    taskToUpdate.taskName = taskName;
  };

  const deleteTask = (e,taskId) => {
  e.preventDefault()
//     var myArr = [{id:'a'},{id:'myid'},{id:'c'}];
// var index = tasks.findIndex(function(o){
//   return o.id === taskId;
// })
// if (index !== -1) tasks.splice(index, 1);
    setTasks((current) =>
      current.filter((task) => {
        return task.id !== taskId;
      })
    );
    checklist.tasks = tasks
  };

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
      {tasks &&
        tasks.map((task) => (
          <div key={task.id} className="flex flex-row items-center gap-2">
            <input
              defaultValue={task.taskName}
              onChange={(e) => handleUpdateTask(e, task.id)}
              class="appearance-none block w-full bg-gray-100 text-gray-700 rounded-sm mb-2 py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border focus:border-gray-100"
              type="text"
              placeholder="Add Task"
            />
            <button
              onClick={(e) => deleteTask(e,task.id)}
              className="p-2 text-lg text-gray-900 hover:bg-gray-300 hover:scale-105 transition transform duration-200 ease-out"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
    </>
  );
};

export default Tasks;
