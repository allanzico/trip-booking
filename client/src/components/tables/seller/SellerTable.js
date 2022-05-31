import React, { useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
  useSortBy,
  usePagination,
  loopHooks,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import CustomButton from "../../shared/CustomButton";
import PageButton from "../../shared/PageButton";
import { PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const SellerTable = ({
  columns,
  data,
  handleExperienceEdit = (func) => func,
}) => {
  const [showModal, setShowModal] = useState(false);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "actions",
        Header: "Actions",
        Cell: ({ row }) => {
          return (
        
              <div className="flex items-center justify-between">
                <Link to={`/experience/edit/${row.values._id}`}>
                  <PencilAltIcon
                    onClick={() => handleExperienceEdit(row.values._id)}
                    className="h5 w-5 text-gray-600 cursor-pointer"
                  />
                </Link>
                <TrashIcon
                  onClick={() => alert("DELETE: " + row.values._id)}
                  className="h5 w-5 text-red-600 cursor-pointer"
                />
              </div>
           
          );
        },
      },
    ]);
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state, // new
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    tableHooks
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          {/* {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div key={column.id}>{column.render("Filter")}</div>
            ) : null
          )
        )} */}
        </div>

        <div className="flex max-w-fit cursor-pointer items-center space-x-2 px-4 py-2 rounded-md hover:bg-orange-700 bg-orange-500 text-white transition-all duration-200 group ">
          <PlusIcon className="w-5 h-5" />
          <Link
            to="/experiences/new"
            className="hidden md:inline-flex text-base font-light lg:text-xl hover:text-white"
          >
            Add New
          </Link>
        </div>
      </div>

      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow-md overflow-hidden border-b border-gray-100 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-100"
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}

                          {/* Add a sort direction indicator */}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " ▼"
                                : " ▲"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <CustomButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </CustomButton>
          <CustomButton onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </CustomButton>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-center">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="mt-1 p-2 block bg-white w-full rounded-md shadow-sm shadow-md focus:border-orange-500                     border border-gray
                outline-none
                hover:outline-orange-500
                hover:outline-1
                focus-visible:shadow-none
                focus:border-primary"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <PageButton
                className="rounded-l-md"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
              </PageButton>
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </PageButton>
              <PageButton
                className="rounded-r-md"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerTable;
