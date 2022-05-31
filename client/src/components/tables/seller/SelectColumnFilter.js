import React, { useMemo } from "react";

const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) => {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="mt-1 p-2 block bg-white w-full rounded-md shadow-sm shadow-md focus:border-orange-500                     border border-gray
      outline-none
      hover:outline-orange-500
      hover:outline-1
      focus-visible:shadow-none
      focus:border-primary"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectColumnFilter;
