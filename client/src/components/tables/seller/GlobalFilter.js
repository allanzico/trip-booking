import React, { useState } from "react";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">Search: </span>
      <input
        type="text"
        class="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-orange-500                     border border-gray
        outline-none
        hover:outline-orange-500
        hover:outline-1
        focus-visible:shadow-none
        focus:border-primary"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </label>
  );
};

export default GlobalFilter;
