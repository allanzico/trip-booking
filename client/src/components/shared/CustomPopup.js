import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { DotsVerticalIcon, PencilIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

const CustomPopup = ({items}) => {

  return (
    <>
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
          >
          <DotsVerticalIcon
            className={`${open ? '' : 'text-opacity-70'}
              ml-2 h-5 w-5 text-gray-900 transition duration-150 ease-in-out`}
            aria-hidden="true"
          />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-50 mt-3 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-md shadow-md">
                <div className="relative grid gap-4 bg-white p-7">
                  {items.map((item) => (
                    <Link
                     to={item.to}
                      key={item.name}
                      onClick={item.onclick}
                      className="-m-3 flex items-center rounded-md p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none "
                    >
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center text-white sm:h-4 sm:w-4">
                        <item.icon aria-hidden="true" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  </>
  )
}


export default CustomPopup