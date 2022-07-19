import { DocumentTextIcon } from '@heroicons/react/outline'
import React from 'react'

const NotesComponent = ({notes}) => {

  return (
    <>
            <div class="w-full mb-2">
          <div class="relative flex flex-col justify-center py-3 px-2 bg-gray-100 text-gray-700 rounded-md leading-tight rounded-sm">
            <DocumentTextIcon className="absolute -left-5 top-0 h-12 w-12 py-2  rounded-full text-md text-center" />
    
              <p
                className="appearance-none block w-full bg-gray-100 text-xs text-gray-700 rounded-sm mb-2 py-2 px-2 "
              >
                {notes && notes.description}
              </p>
         
          </div>
        </div>
    </>
  )
}

export default NotesComponent