"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import employeeService from "@/lib/api/employee";
import { toast, Toaster } from "react-hot-toast";

interface Employee {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  dateOfBirth: string;
  address: string;
  storeId: string;
}

interface EmployeeFormData {
  user: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    auth: {
      type: "password";
      data: {
        password: string;
      };
    };
  };
  data: {
    dateOfBirth: string;
    address: string;
    // storeId: string;
  };
}

interface UpdateEmployeeData {
  address: string;
  dateOfBirth: string;
  newuser: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

const EmployeeForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("12345678Aa#"); // Default password
  const [employee, setEmployee] = useState<Employee>({
    _id: "",
    user: {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    dateOfBirth: "",
    address: "",
    storeId: "",
  });
  const [updateFormData, setUpdateFormData] = useState<UpdateEmployeeData>({
    address: "",
    dateOfBirth: "",
    newuser: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchEmployeeData();
    }
  }, [id]);

  const fetchEmployeeData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await employeeService.getEmployee(id);
      console.log(data);
      setEmployee(data);
      setUpdateFormData({
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        newuser: {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
        },
      });
    } catch (err) {
      console.error("Failed to fetch employee:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !employee.user.firstName ||
      !employee.user.lastName ||
      !employee.user.email ||
      !employee.user.phone ||
      !employee.dateOfBirth ||
      !employee.address
      // !employee.storeId
    ) {
      toast.error("All fields are required!");
      return;
    }

    const formattedData: EmployeeFormData = {
      user: {
        email: employee.user.email,
        phone: employee.user.phone,
        firstName: employee.user.firstName,
        lastName: employee.user.lastName,
        auth: {
          type: "password",
          data: {
            password: password,
          },
        },
      },
      data: {
        dateOfBirth: employee.dateOfBirth,
        address: employee.address,
        // storeId: employee.storeId,
      },
    };
    updateFormData.newuser.email = employee.user.email;
    updateFormData.newuser.phone = employee.user.phone;
    updateFormData.newuser.firstName = employee.user.firstName;
    updateFormData.newuser.lastName = employee.user.lastName;
    updateFormData.dateOfBirth = employee.dateOfBirth;
    updateFormData.address = employee.address;

    console.log(updateFormData);

    try {
      if (isEdit) {
        if (!id) return;
        const response = await employeeService.updateEmployee(
          id,
          updateFormData,
        );
        console.log(response);
        toast.success("Employee updated successfully!");
      } else {
        console.log(formattedData);
        const response = await employeeService.createEmployee(formattedData);
        console.log(response);
        if (response.error) {
          toast.error(response.message);
        } else {
          toast.success("Employee added successfully!");
        }
      }
      // setTimeout(() => {
      //   router.push("/employee/all");
      // }, 1000);
    } catch (err) {
      console.error("Failed to save employee:", err);
      toast.error("Failed to save employee. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!employee) return;

    if (name.startsWith("user.")) {
      const userField = name.split(".")[1];
      setEmployee({
        ...employee,
        user: {
          ...employee.user,
          [userField]: value,
        },
      });
    } else if (name === "password") {
      setPassword(value);
    } else {
      setEmployee({
        ...employee,
        [name]: value,
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Fill Employee's Details
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
                      value={employee.user.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
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
                      value={employee.user.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
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
                    value={employee.user.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
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
                    value={employee.user.phone}
                    onChange={handleChange}
                    placeholder="Enter phone no."
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {!isEdit && (
                  <div className="mb-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                )}

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={employee.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Store ID
                  </label>
                  <input
                    type="text"
                    name="storeId"
                    value={employee.storeId}
                    onChange={handleChange}
                    placeholder="Enter store ID"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div> */}

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={employee.dateOfBirth?.split("T")[0] || ""}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  {isEdit ? "Update Employee" : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;
