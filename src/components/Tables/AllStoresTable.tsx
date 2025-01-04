"use client";

import { useState, useEffect } from "react";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import storeService from "@/lib/api/store";
import DeleteModal from "@/components/Modals/DeleteModal";
import { toast, Toaster } from "react-hot-toast";

interface Store {
  _id: string;
  storeId: string;
  storeName: string;
  managers: string[];
  employees: string[];
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

const ITEMS_PER_PAGE = 5;

const AllStoresTable = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const data = await storeService.getAllStores();
      setStores(data);
    } catch (err) {
      setError("Failed to fetch stores");
      toast.error("Failed to fetch stores");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await storeService.deleteStore(id);
      await fetchStores();
      setDeleteModal(false);
      toast.success("Store deleted successfully");
    } catch (err) {
      console.error("Failed to delete store:", err);
      toast.error("Failed to delete store");
    }
  };

  const filteredData = stores.filter((store) =>
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Toaster position="top-right" />
      <div className="mt-10 w-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Stores
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
                Store ID
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-left text-sm font-medium uppercase xsm:text-base">
                Address
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-left text-sm font-medium uppercase xsm:text-base">
                Total Employees
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
              key={store._id}
            >
              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{store.storeName}</p>
              </div>

              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{store.storeId}</p>
              </div>

              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{store.address}</p>
              </div>

              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {store.employees.length}
                </p>
              </div>

              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <Link
                  href={`/store/reports/${store._id}`}
                  className="text-meta-3 hover:text-primary"
                  title="View"
                >
                  <Eye size={20} />
                </Link>
                <Link
                  href={`/store/update?id=${store.storeId}`}
                  className="text-primary hover:text-black dark:hover:text-white"
                  title="Edit"
                >
                  <Edit size={20} />
                </Link>
                <button
                  onClick={() => {
                    setSelectedId(store.storeId);
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
            itemType="store"
          />
        )}
      </div>
    </>
  );
};

export default AllStoresTable;
