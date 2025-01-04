"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Addmanagermodal from "@/components/Modals/Addmanagermodel";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import { useState, FormEvent } from "react";
import { X } from "lucide-react";

interface Employee {
  value: string;
  label: string;
}

const AddStorePage = () => {
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [selectedManager, setSelectedManager] = useState<string>("");

  const managerOptions = [
    { value: "manager1", label: "Manager 1" },
    { value: "manager2", label: "Manager 2" },
    { value: "manager3", label: "Manager 3" },
  ];

  const employeeOptions = [
    { value: "emp1", label: "Employee 1" },
    { value: "emp2", label: "Employee 2" },
    { value: "emp3", label: "Employee 3" },
    { value: "emp4", label: "Employee 4" },
    { value: "emp5", label: "Employee 5" },
  ];

  const filteredEmployees = employeeOptions.filter(
    (emp) =>
      emp.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedEmployees.find((selected) => selected.value === emp.value),
  );

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployees([...selectedEmployees, employee]);
    setSearchTerm("");
  };

  const handleRemoveEmployee = (employeeValue: string) => {
    setSelectedEmployees(
      selectedEmployees.filter((emp) => emp.value !== employeeValue),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const storeData = {
      name: formData.get("storeName"),
      location: formData.get("location"),
      manager: selectedManager,
      employees: selectedEmployees.map((emp) => emp.value),
    };

    console.log("Store Data:", storeData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6.5">
        <div className="mb-4.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Store Name <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            name="storeName"
            placeholder="Enter store name"
            required
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Location <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="Enter store location"
            required
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <SelectGroupOne
          options={managerOptions}
          labell="Manager"
          onChange={(value: string) => setSelectedManager(value)}
        />

        <div className="mb-4.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Add Employees
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employees..."
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          {/* Search Results Dropdown */}
          {searchTerm && (
            <div className="mt-2 max-h-40 overflow-y-auto rounded border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
              {filteredEmployees.map((emp) => (
                <div
                  key={emp.value}
                  onClick={() => handleSelectEmployee(emp)}
                  className="cursor-pointer px-5 py-2 hover:bg-gray-2 dark:hover:bg-meta-4"
                >
                  {emp.label}
                </div>
              ))}
            </div>
          )}

          {/* Selected Employees List */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedEmployees.map((emp) => (
              <div
                key={emp.value}
                className="justify flex w-fit flex-wrap items-center rounded-full bg-[#f0f0f0] px-4 py-2 dark:bg-meta-4"
              >
                <span className="mr-2">{emp.label}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveEmployee(emp.value)}
                  className="flex items-center gap-1 text-sm text-danger hover:text-meta-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-10 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          onClick={() => setModal(true)}
        >
          Add Store
        </button>
        {modal ? <Addmanagermodal setModal={setModal} post="store" /> : null}
      </div>
    </form>
  );
};

export default AddStorePage;
