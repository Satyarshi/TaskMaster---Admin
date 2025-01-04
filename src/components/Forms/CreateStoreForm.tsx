"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import storeService from "@/lib/api/store";
import managerService from "@/lib/api/manager";
import employeeService from "@/lib/api/employee";
import { toast, Toaster } from "react-hot-toast";
import Select from "react-select";

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

interface StoreFormData {
  storeName: string;
  address: string;
  managers: string[];
  employees: string[];
  storeId: string;
}

interface SelectOption {
  value: string;
  label: string;
}

const CreateStoreForm = () => {
  const router = useRouter();
  const [store, setStore] = useState<StoreFormData>({
    storeName: "",
    address: "",
    managers: [],
    employees: [],
    storeId: "",
  });

  const [managers, setManagers] = useState<Manager[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchManagersAndEmployees();
  }, []);

  const fetchManagersAndEmployees = async () => {
    try {
      setLoading(true);
      const [managersData, employeesData] = await Promise.all([
        managerService.getAllManagers(),
        employeeService.getAllEmployees(),
      ]);
      setManagers(managersData);
      setEmployees(employeesData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      toast.error("Failed to load managers and employees");
    } finally {
      setLoading(false);
    }
  };

  const managerOptions: SelectOption[] = managers.map((manager) => ({
    value: manager._id,
    label: `${manager.user.firstName} ${manager.user.lastName} (${manager.user.email})`,
  }));

  const employeeOptions: SelectOption[] = employees.map((employee) => ({
    value: employee._id,
    label: `${employee.user.firstName} ${employee.user.lastName} (${employee.user.email})`,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!store.storeName || !store.address || !store.storeId) {
      toast.error("Store name, ID, and address are required!");
      return;
    }

    try {
      await storeService.createStore(store);
      toast.success("Store created successfully!");
      setTimeout(() => {
        router.push("/store/all");
      }, 1000);
    } catch (err) {
      console.error("Failed to create store:", err);
      toast.error("Failed to create store. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStore({
      ...store,
      [name]: value,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Create New Store
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Store ID <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="storeId"
                  value={store.storeId}
                  onChange={handleChange}
                  placeholder="Enter store ID"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Store Name <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="storeName"
                  value={store.storeName}
                  onChange={handleChange}
                  placeholder="Enter store name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Address <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={store.address}
                  onChange={handleChange}
                  placeholder="Enter store address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Managers
                </label>
                <Select
                  isMulti
                  options={managerOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) => {
                    setStore({
                      ...store,
                      managers: selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : [],
                    });
                  }}
                  placeholder="Select managers..."
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Employees
                </label>
                <Select
                  isMulti
                  options={employeeOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) => {
                    setStore({
                      ...store,
                      employees: selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : [],
                    });
                  }}
                  placeholder="Select employees..."
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Create Store
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateStoreForm;
