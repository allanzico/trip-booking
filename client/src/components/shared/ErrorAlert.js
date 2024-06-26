import React from 'react'

const ErrorAlert = ({error, showAlert, setShowAlert}) => {
  return (
<>
{error && showAlert ?       <div class="flex p-3 mb-3 bg-red-100 rounded-sm dark:bg-red-200" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" viewBox="0 0 20 20" fill="currentColor">
<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
</svg>
<div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
  {error}
</div>
<button  onClick={() => setShowAlert(false)} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-sm focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close">
  <span class="sr-only">Close</span>
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
</button>
</div> : null }
</>
  )
}

export default ErrorAlert