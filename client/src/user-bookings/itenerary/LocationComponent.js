import { LocationMarkerIcon } from '@heroicons/react/solid'
import React from 'react'

const LocationComponent = ({location}) => {
  return (
<>
{location && (

            <div class="w-full mb-2">
              <div class="relative flex flex-col justify-center py-2 px-2 bg-gray-100 text-gray-700 rounded-md leading-tight rounded-sm">
                 <LocationMarkerIcon className="absolute -left-5 h-12 w-12 py-2  rounded-full text-md text-center" />
                <p className="text-xs px-3 text-gray-700">
                  {location.locationName.toString()}
                </p>
              </div>
            </div>
   
      )}
</>
  )
}

export default LocationComponent