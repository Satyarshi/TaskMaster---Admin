"use client";

import { useState } from "react";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import Link from "next/link";

interface STORE {
  id: string;
  name: string;
  address: string;
  manager: string;
  employees: string[];
}

const storeData: STORE[] = [
  {
    id: "5351263526531",
    name: "Downtown Store",
    address: "123 Main St, Downtown",
    manager: "John Doe",
    employees: ["Sarah Smith", "Mike Johnson", "Emily Brown"],
  },
  {
    id: "5351263526531",
    name: "Westside Branch",
    address: "456 West Ave, Westside",
    manager: "Jane Smith",
    employees: ["Robert Wilson", "Lisa Davis"],
  },
  {
    id: "5351263526531",
    name: "Eastside Market",
    address: "789 East Blvd, Eastside",
    manager: "Michael Brown",
    employees: ["David Lee", "Anna White", "James Miller"],
  },
  // Add more sample data as needed
];

const ITEMS_PER_PAGE = 4;

const AllStoresTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = storeData.filter((store) =>
    Object.values(store).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="mt-10 w-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Stores
        </h4>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`rounded bg-gray-200 px-4 py-2 dark:bg-gray-600 ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-300 dark:hover:bg-gray-500"
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`rounded bg-gray-200 px-4 py-2 dark:bg-gray-600 ${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-300 dark:hover:bg-gray-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <div className="mb-6 w-full">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-sm border border-stroke bg-transparent py-2 pl-9 pr-4 outline-none focus:border-primary dark:border-strokedark dark:focus:border-primary"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-body dark:text-bodydark" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-left text-sm font-medium uppercase xsm:text-base">
              Store Name
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-left text-sm font-medium uppercase xsm:text-base">
              Address
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-left text-sm font-medium uppercase xsm:text-base">
              Manager
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-left text-sm font-medium uppercase xsm:text-base">
              Employees
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-left text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {currentData.map((store, key) => (
          <div
            className={`grid grid-cols-5 ${
              key === currentData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{store.name}</p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{store.address}</p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{store.manager}</p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {store.employees.join(", ")}
              </p>
            </div>

            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <Link
                href={`/store/reports/${store.id}`}
                className="text-meta-3 hover:text-primary"
                title="View"
              >
                <Eye size={20} />
              </Link>
              <Link
                href={`/store/edit/${store.name}`}
                className="text-primary hover:text-black dark:hover:text-white"
                title="Edit"
              >
                <Edit size={20} />
              </Link>
              <button
                className="text-meta-5 hover:text-black dark:hover:text-white"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStoresTable;
