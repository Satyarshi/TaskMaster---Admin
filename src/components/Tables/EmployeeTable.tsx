"use client";

import { useState, useEffect } from "react";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import employeeService from "@/lib/api/employee";
import DeleteModal from "@/components/Modals/DeleteModal";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Employee {
  _id: string;
  user: User;
  address: string;
  dateOfBirth: string;
  // storeId: string;
}

const ITEMS_PER_PAGE = 4;

const EmployeeTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Failed to fetch employees");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await employeeService.deleteEmployee(id);
      await fetchEmployees();
      setDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete employee:", err);
    }
  };

  const filteredData = employees.filter((employee) => {
    const searchString = searchQuery.toLowerCase();
    const userData = employee.user;

    return (
      userData.firstName.toLowerCase().includes(searchString) ||
      userData.lastName.toLowerCase().includes(searchString) ||
      userData.email.toLowerCase().includes(searchString) ||
      userData.phone.toLowerCase().includes(searchString)
    );
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Employees
        </h4>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
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
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-sm border border-stroke bg-transparent py-2 pl-9 pr-4 outline-none focus:border-primary dark:border-strokedark dark:focus:border-primary"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-body dark:text-bodydark" />
        </div>
      </div>

      <div className="flex flex-col">
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
              Email
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-left text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {currentData.map((employee) => (
          <div
            className="grid grid-cols-4 border-b border-stroke dark:border-strokedark"
            key={employee._id}
          >
            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {`${employee.user.firstName} ${employee.user.lastName}`}
              </p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {employee.user.phone}
              </p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {employee.user.email}
              </p>
            </div>

            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <Link
                href={`/employee/reports/${employee._id}`}
                className="text-meta-3 hover:text-primary"
                title="View"
              >
                <Eye size={20} />
              </Link>
              <Link
                href={`/employee/add/?id=${employee._id}`}
                className="text-primary hover:text-black dark:hover:text-white"
                title="Edit"
              >
                <Edit size={20} />
              </Link>
              <button
                onClick={() => {
                  setSelectedId(employee._id);
                  setDeleteModal(true);
                }}
                className="text-meta-5 hover:text-black dark:hover:text-white"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteModal && (
        <DeleteModal
          setModal={setDeleteModal}
          onDelete={() => handleDelete(selectedId)}
          itemType="employee"
        />
      )}
    </div>
  );
};

export default EmployeeTable;
