import { ExclamationIcon, TrashIcon } from '@heroicons/react/outline'
import React from 'react'

const FileValidation = ({file, onDelete, errors}) => {
  return (
    <div className="flex flex-col">
    <div class="relative group h-28 w-30">
      <ExclamationIcon className="rounded-md object-cover text-red-500 h-full w-full object-cover" />
      <div class="absolute flex flex-row items-center justify-between bottom-1 rounded-md left-2 right-2 px-4 py-1 bg-gray-900 opacity-80 hidden group-hover:flex transition transform duration-200 ease-out">
        <p class="text-xs text-white">{file.name} </p>
        <button onClick={() => onDelete(file)}>
        <TrashIcon className="h-6 w-6 text-white" />
        </button>
      </div>

    </div>
    <div className='px-4'>
    {errors.map((error, index) => (
      <span key={index} className="text-red-500"> 
 
      { error.code === 'file-too-large' ? 'File is larger than 1MB' : error.message }
      
      </span>
   ) )}
    </div>

   
  </div>
    
  )
}

export default FileValidation