import { useState } from "react";
import Image from "next/image";
import { Edit, Eye, Trash2 } from "lucide-react";

interface MANAGER {
  picture: string;
  fullName: string;
  email: string;
  storeId: string;
  phoneNumber: string;
}

const managerData: MANAGER[] = [
  {
    picture: "/images/user/user-01.png",
    fullName: "John Doe",
    email: "john.doe@example.com",
    storeId: "STR12345",
    phoneNumber: "+1 234 567 890",
  },
  {
    picture: "/images/user/user-01.png",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    storeId: "STR67890",
    phoneNumber: "+1 987 654 321",
  },
  {
    picture: "/images/user/user-01.png",
    fullName: "Robert Brown",
    email: "robert.brown@example.com",
    storeId: "STR54321",
    phoneNumber: "+1 555 666 777",
  },
  {
    picture: "/images/user/user-01.png",
    fullName: "Emily Davis",
    email: "emily.davis@example.com",
    storeId: "STR98765",
    phoneNumber: "+1 111 222 333",
  },
  {
    picture: "/images/user/user-01.png",
    fullName: "Michael Johnson",
    email: "michael.johnson@example.com",
    storeId: "STR23456",
    phoneNumber: "+1 444 555 666",
  },
  {
    picture: "/images/user/user-01.png",
    fullName: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    storeId: "STR34567",
    phoneNumber: "+1 888 999 000",
  },
  {
    picture: "/images/user/user-01.png",
    fullName: "Chris Evans",
    email: "chris.evans@example.com",
    storeId: "STR45678",
    phoneNumber: "+1 333 444 555",
  },
  {
    picture: "/images/user/user-01.png",
    fullName: "Jessica Lee",
    email: "jessica.lee@example.com",
    storeId: "STR56789",
    phoneNumber: "+1 777 888 999",
  },
  {
    picture: "/images/user/user-01.png",
    fullName: "David Martinez",
    email: "david.martinez@example.com",
    storeId: "STR67890",
    phoneNumber: "+1 222 333 444",
  },
  {
    picture: "/images/user/user-01.png",
    fullName: "Laura Adams",
    email: "laura.adams@example.com",
    storeId: "STR78901",
    phoneNumber: "+1 666 777 888",
  },
];

const ITEMS_PER_PAGE = 4; // Adjust for how many items to show per page

const ManagersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(managerData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = managerData.slice(
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
          Managers
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
        {/* Table Header */}
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          {/* <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Picture
            </h5>
          </div> */}
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Full Name
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Store ID
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone Number
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {/* Table Body */}
        {currentData.map((manager, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === currentData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            {/* <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image
                  src={manager.picture}
                  alt="Manager"
                  width={48}
                  height={48}
                />
              </div>
            </div> */}

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{manager.fullName}</p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{manager.email}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{manager.storeId}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {manager.phoneNumber}
              </p>
            </div>
            <div className="hidden items-center justify-center gap-2 p-2.5 sm:flex xl:p-5">
              <button
                title="Edit"
                className="text-primary hover:text-black dark:hover:text-white"
              >
                <Edit size={20} />
              </button>
              <button
                title="View"
                className="text-meta-3 hover:text-black dark:hover:text-white"
              >
                <Eye size={20} />
              </button>
              <button
                title="Delete"
                className="text-meta-5 hover:text-black dark:hover:text-white"
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

export default ManagersTable;
