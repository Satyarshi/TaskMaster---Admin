"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import Select from "react-select";
import { toast, Toaster } from "react-hot-toast";
import storeService from "@/lib/api/store";
import managerService from "@/lib/api/manager";
import employeeService from "@/lib/api/employee";
import { useRouter } from "next/navigation";

interface Store {
  _id: string;
  storeId: string;
  storeName: string;
  managers: string[];
  employees: string[];
  address: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface Manager {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Employee {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const UpdateStoreForm = () => {
  const searchParams = useSearchParams();
  const storeId = searchParams.get("id");

  const [searchQuery, setSearchQuery] = useState("");
  const [stores, setStores] = useState<Store[]>([]);
  const [searchResults, setSearchResults] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [managers, setManagers] = useState<SelectOption[]>([]);
  const [employees, setEmployees] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchStores();
    fetchManagersAndEmployees();
  }, []);

  useEffect(() => {
    if (storeId) {
      fetchStoreById(storeId);
    }
  }, [storeId]);

  const fetchStoreById = async (id: string) => {
    try {
      setLoading(true);
      const store = await storeService.getStore(id);
      setSelectedStore(store);
    } catch (err) {
      toast.error("Failed to fetch store details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results = stores.filter(
      (store) =>
        store.storeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.storeName.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setSearchResults(results);
  }, [searchQuery, stores]);

  const fetchStores = async () => {
    try {
      const data = await storeService.getAllStores();
      console.log(data);
      setStores(data);
    } catch (err) {
      toast.error("Failed to fetch stores");
    }
  };

  const fetchManagersAndEmployees = async () => {
    try {
      setLoading(true);
      const [managersData, employeesData] = await Promise.all([
        managerService.getAllManagers(),
        employeeService.getAllEmployees(),
      ]);

      setManagers(
        managersData.map((manager: Manager) => ({
          value: manager._id,
          label: `${manager.user.firstName} ${manager.user.lastName} (${manager.user.email})`,
        })),
      );

      setEmployees(
        employeesData.map((employee: Employee) => ({
          value: employee._id,
          label: `${employee.user.firstName} ${employee.user.lastName} (${employee.user.email})`,
        })),
      );
    } catch (err) {
      toast.error("Failed to fetch managers and employees");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedStore) return;

    try {
      // Get current store data to compare
      const currentStore = stores.find(
        (store) => store._id === selectedStore._id,
      );
      if (!currentStore) return;

      // Handle managers
      const managersToAdd = selectedStore.managers.filter(
        (id) => !currentStore.managers.includes(id),
      );
      const managersToRemove = currentStore.managers.filter(
        (id) => !selectedStore.managers.includes(id),
      );

      // Handle employees
      const employeesToAdd = selectedStore.employees.filter(
        (id) => !currentStore.employees.includes(id),
      );
      const employeesToRemove = currentStore.employees.filter(
        (id) => !selectedStore.employees.includes(id),
      );

      // Execute all updates
      await Promise.all([
        ...managersToAdd.map((id) =>
          storeService.addManager(selectedStore.storeId, id),
        ),
        ...managersToRemove.map((id) =>
          storeService.removeManager(selectedStore.storeId, id),
        ),
        ...employeesToAdd.map((id) =>
          storeService.addEmployee(selectedStore.storeId, id),
        ),
        ...employeesToRemove.map((id) =>
          storeService.removeEmployee(selectedStore.storeId, id),
        ),
      ]);

      toast.success("Store staff updated successfully");
      setTimeout(() => {
        router.push("/store/all");
      }, 2000);
    } catch (err) {
      console.error("Failed to update store:", err);
      toast.error("Failed to update store staff");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Update Store Staff
            </h3>
          </div>

          <div className="p-6.5">
            {/* Show search only if no storeId in URL */}
            {!storeId && (
              <>
                <div className="mb-4.5">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search store by ID or name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-10 pr-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                    />
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                  </div>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && !selectedStore && (
                  <div className="mt-4">
                    <h4 className="mb-4 text-lg font-medium">
                      Search Results:
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Store ID
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Name
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Address
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((store) => (
                            <tr key={store._id}>
                              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                                {store.storeId}
                              </td>
                              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                                {store.storeName}
                              </td>
                              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                                {store.address}
                              </td>
                              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                                <button
                                  onClick={() => setSelectedStore(store)}
                                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                                >
                                  Update Staff
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Edit Form */}
            {selectedStore && (
              <div className="mt-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-xl font-semibold">
                    Editing: {selectedStore.storeName} ({selectedStore.storeId})
                  </h4>
                  {!storeId && (
                    <button
                      onClick={() => {
                        setSelectedStore(null);
                        setSearchResults([]);
                      }}
                      className="text-sm text-meta-1"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-black dark:text-white">
                    Managers
                  </label>
                  <Select
                    isMulti
                    options={managers}
                    value={managers.filter((option) =>
                      selectedStore.managers.includes(option.value),
                    )}
                    onChange={(selected) => {
                      setSelectedStore({
                        ...selectedStore,
                        managers: selected
                          ? selected.map((option) => option.value)
                          : [],
                      });
                    }}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-black dark:text-white">
                    Employees
                  </label>
                  <Select
                    isMulti
                    options={employees}
                    value={employees.filter((option) =>
                      selectedStore.employees.includes(option.value),
                    )}
                    onChange={(selected) => {
                      setSelectedStore({
                        ...selectedStore,
                        employees: selected
                          ? selected.map((option) => option.value)
                          : [],
                      });
                    }}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>

                <button
                  onClick={handleUpdate}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Update Store Staff
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateStoreForm;
