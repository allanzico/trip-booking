import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'

const Widgets = () => {
  return (
<div className='col-span-2 px-2 mt-2 hidden lg:inline'>
<div className='flex items-center space-x-2 bg-gray-100 p-3 rounded-md p-3'>
      <SearchIcon className='h-5 w-5 text-gray-400'/>
      <input type="text" placeholder="search shit" className='flex-1 outline-none bg-transparent' />
</div>
<div>
  ADD SOME MORE SHIT
</div>
</div>
  )
}

export default Widgets