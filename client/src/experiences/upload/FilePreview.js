import React from "react";
import {TrashIcon} from '@heroicons/react/outline'
const FilePreview = ({ file, url, onDelete }) => {
  return (
    <div className="flex flex-col">
      <div class="relative group h-28 w-30">
        <img
          src={url}
          alt={file.name}
          className="rounded-md object-cover h-full w-full object-cover"
        />
        <div class="absolute flex flex-row items-center justify-between bottom-1 rounded-md left-2 right-2 px-4 py-1 bg-gray-900 opacity-80 hidden group-hover:flex transition transform duration-200 ease-out">
          <p class="text-xs text-white">{file.name} </p>
          <button onClick={() => onDelete(file)}>
          <TrashIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

     
    </div>
  );
};

export default FilePreview;
