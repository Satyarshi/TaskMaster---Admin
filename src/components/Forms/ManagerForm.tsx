"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import managerService from "@/lib/api/manager";
import { Manager } from "@/types/UserTypes";
import { useRouter } from "next/navigation";

const ManagerForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manager, setManager] = useState<Manager | null>(null);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchManagerData();
    }
  }, [id]);

  const fetchManagerData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await managerService.getManager(id);
      setManager(data);
    } catch (err) {
      console.error("Failed to fetch manager:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!manager) return;

    if (isEdit) {
      const response = await managerService.updateManager(id, manager);
      console.log(response);
    } else {
      const response = await managerService.createManager(manager);
      console.log(response);
    }
    console.log("Form submitted");
    router.push("/manager/all");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!manager) return;

    if (name.startsWith("user.")) {
      const userField = name.split(".")[1];
      setManager({
        ...manager,
        user: {
          ...manager.user,
          [userField]: value,
        },
      });
    } else {
      setManager({
        ...manager,
        [name]: value,
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Fill Manager's Details
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    First name
                  </label>
                  <input
                    type="text"
                    name="user.firstName"
                    value={manager?.user.firstName || ""}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="user.lastName"
                    value={manager?.user.lastName || ""}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Email <span className="text-meta-1">*</span>
                </label>
                <input
                  type="email"
                  name="user.email"
                  value={manager?.user.email || ""}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Phone no.
                </label>
                <input
                  type="text"
                  name="user.phone"
                  value={manager?.user.phone || ""}
                  onChange={handleChange}
                  placeholder="Enter phone no."
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={manager?.address || ""}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={manager?.dateOfBirth?.split("T")[0] || ""}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                {isEdit ? "Update Manager" : "Add Manager"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagerForm;
