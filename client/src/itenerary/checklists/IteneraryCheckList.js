import { TrashIcon } from '@heroicons/react/outline';
import React, { useState } from 'react'
import Tasks from './Tasks';

const IteneraryCheckList = ({  section,
}) => {

  const handleSubmit = e => {
    e.preventDefault();
 
  };

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

{section.checkLists && section.checkLists.map((checklist) => (
  <div className='grid grid-cols-6'>
    <div className='col-span-5'>
    <div className="flex flex-col mb-2 px-2 py-4 h-45 w-full bg-gray-100 rounded-md"> 
<input
              value={checklist.id}
              class="appearance-none block w-full bg-gray-100 text-lg text-gray-500 rounded-sm mb-2 py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border focus:border-gray-100"
              type="text"
              placeholder="Add title"
            />
 <Tasks checklist={checklist}/>
 </div>
    </div>
    <div className='col-span-1 px-2'>
    <button>
      <TrashIcon className='h-6 w-6' />
    </button>
    </div>

  </div>

)) }
</>


    // <div className="section">
    //   {section.tasks.map(task => {
    //     return !task.editting ? (
    //       <div className="task-item">
    //         <label>{task.desc}</label>
    //         <button onClick={() => handleToggle(section.id, task.id)}>
    //           Edit
    //         </button>
    //       </div>
    //     ) : (
    //       <div className="task-item">
    //         <input
    //           value={task.desc}
    //           onChange={e => handleUpdateTaskDesc(e, section.id, task.id)}
    //         />
    //         <button onClick={() => handleToggle(section.id, task.id)}>
    //           Done
    //         </button>
    //       </div>
    //     );
    //   })}

    //   {/* Add new task */}
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       placeholder="Add Task"
    //       name="task"
    //       onChange={handleNewTaskChange}
    //       value={newTaskName}
    //     />
    //     <button type="submit" disabled={!newTaskName.length}>
    //       Add Task
    //     </button>
    //   </form>
    // </div>
  );
}

export default IteneraryCheckList