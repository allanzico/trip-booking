import React from 'react'

import {TrashIcon, ClipboardListIcon } from '@heroicons/react/outline';

const Notes = () => {
  return (
    <div className="grid grid-cols-6">
    <div className="col-span-5">
      <div class="w-full pl-4">
        <div class="relative flex flex-col justify-center py-3 px-2 bg-gray-100 text-gray-700 rounded-md leading-tight rounded-sm">
           <ClipboardListIcon className="absolute -left-5 h-12 w-12 py-2  rounded-full text-md text-center" />
          <p className="text-md px-3 text-gray-700">
          {/* <input
            //   defaultValue={task.taskName}
            //   onChange={(e) => handleUpdateTask(e, task.id)}
              class="appearance-none block w-full bg-gray-100 text-gray-700 rounded-sm mb-2 py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border focus:border-gray-100"
              type="text"
              placeholder="Add Note"
            /> */}
            <textarea defaultValue="text area..." rows="3" class="appearance-none block w-full bg-gray-100 text-gray-900 rounded-sm mb-2 py-2 px-2 leading-tight focus:outline-none focus:bg-gray-100 focus:border focus:border-gray-100" ></textarea>
          </p>
        </div>
      </div>
    </div>
    <div className="col-span-1 px-2">
              <button 
            //   onClick={(e) => removeChecklist(e,section, checkList.id)}
            >
                <TrashIcon className="h-6 w-6" />
              </button>
  </div>
  </div>
  )
}

export default Notes