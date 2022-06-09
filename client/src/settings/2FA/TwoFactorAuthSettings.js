import { Switch } from '@headlessui/react'
import React, { useState } from 'react'

const TwoFactorAuthSettings = () => {
    const [enabled, setEnabled] = useState(false)
  return (
    <div className="flex flex-row items-center justify-between">
        <div className='md:pr-5'>
            <h4 className=' py-2 text-xl font-bold'>
           Set two factor authentication
            </h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? 'bg-orange-500' : 'bg-gray-200'}
        relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">set two factor auth</span>
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
          pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  </div>
  )
}

export default TwoFactorAuthSettings