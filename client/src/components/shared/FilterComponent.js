import React from "react";

const FilterComponent = ({
  setMinPrice, setMaxPrice
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
      <p className="filter-component-button">Earliest</p>
      <p className="filter-component-button">Latest</p>
    </>
  );
};

export default FilterComponent;
