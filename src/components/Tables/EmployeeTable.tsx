import { useState } from "react";
import Image from "next/image";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";

interface EMPLOYEE {
  name: string;
  phoneNumber: string;
  storeId: string;
}

const employeeData: EMPLOYEE[] = [
  {
    name: "John Doe",
    phoneNumber: "+1 234 567 890",
    storeId: "STR12345",
  },
  {
    name: "Jane Smith",
    phoneNumber: "+1 987 654 321",
    storeId: "STR67890",
  },
  {
    name: "Michael Johnson",
    phoneNumber: "+1 555 123 4567",
    storeId: "STR45678",
  },
  {
    name: "Sarah Williams",
    phoneNumber: "+1 444 789 0123",
    storeId: "STR34567",
  },
  {
    name: "Robert Brown",
    phoneNumber: "+1 666 234 5678",
    storeId: "STR23456",
  },
  {
    name: "Emily Davis",
    phoneNumber: "+1 777 345 6789",
    storeId: "STR78901",
  },
  {
    name: "David Wilson",
    phoneNumber: "+1 888 456 7890",
    storeId: "STR89012",
  },
];

const ITEMS_PER_PAGE = 4; // Adjust for how many items to show per page

const EmployeeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(employeeData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = employeeData.slice(
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
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Employees
        </h4>
        {/* Pagination Controls */}
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

      <div className="flex flex-col">
        {/* Table Header - Left alignment */}
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-left text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-left text-sm font-medium uppercase xsm:text-base">
              Phone Number
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-left text-sm font-medium uppercase xsm:text-base">
              Store ID
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-left text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {/* Table Body - Left alignment */}
        {currentData.map((employee, key) => (
          <div
            className={`grid grid-cols-4 ${
              key === currentData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{employee.name}</p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {employee.phoneNumber}
              </p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{employee.storeId}</p>
            </div>

            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <button className="text-meta-3 hover:text-primary" title="View">
                <Eye size={20} />
              </button>
              <Link
                href={`/addemployee?name=${employee.name}&phone=${employee.phoneNumber}&store=${employee.storeId}`}
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

export default EmployeeTable;
