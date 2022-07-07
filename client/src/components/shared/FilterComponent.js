import React from "react";
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/outline'

const FilterComponent = ({
  setMinPrice, setMaxPrice, handleFilterByHighestDate, handleFilterByLowestDate
}) => {
  return (
    <>
      <p className="">
        <div className="flex flex-row items-center gap-2">
        <div class="relative">
              <input onChange={e=>setMinPrice(e.target.value)} id="priceMin" name="priceMin" type="text" className="peer h-10 px-1 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none" placeholder="min price" />
              <label for="priceMin" class="absolute px-1 left-0 -top-3.5 text-gray-600 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-xs">min price</label>
            </div>
            <span> - </span>
            <div class="relative">
              <input onChange={e=>setMaxPrice(e.target.value)}  id="priceMax" name="priceMax" type="text" className="peer h-10 px-1 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none" placeholder="max price" />
              <label for="priceMax" class="absolute px-1 left-0 -top-3.5 text-gray-600 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-xs">max price</label>
            </div>

        </div>

      </p>
      <button className="filter-component-button text-center inline-flex items-center px-3 gap-1" onClick={handleFilterByLowestDate}> <ChevronDownIcon className="h-4 w-4"/>Earliest </button>
      <button className="filter-component-button text-center inline-flex items-center px-3 gap-1" onClick={handleFilterByHighestDate}><ChevronUpIcon className="h-4 w-4"/>Latest</button>
    </>
  );
};

export default FilterComponent;
