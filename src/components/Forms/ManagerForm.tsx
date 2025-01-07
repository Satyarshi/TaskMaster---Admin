"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// import managerService from "@/lib/api/manager";
import { toast } from "react-hot-toast";
import managerService from "@/lib/api/manager";
import { Toaster } from "react-hot-toast";

// manager data schema from api call
interface Manager {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  dateOfBirth: string;
  address: string;
  hireDate: string;
}

interface UpdateManagerFormData {
  address: string;
  dateOfBirth: string;
  newuser: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  };
}

// manager data schema for form
interface ManagerFormData {
  user: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    // password: string;
    auth: {
      type: string;
      data: {
        password: string;
      };
    };
  };
  data: {
    dateOfBirth: string;
    address: string;
  };
}

const ManagerForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("12345678Aa#"); // Default password
  const [formData, setFormData] = useState<ManagerFormData>({
    user: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      // password: "",
      auth: {
        type: "password",
        data: {
          password: "",
        },
      },
    },
    data: {
      dateOfBirth: "",
      address: "",
    },
  });
  const [updateFormData, setUpdateFormData] = useState<UpdateManagerFormData>({
    address: "",
    dateOfBirth: "",
    newuser: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

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
      const data: Manager = await managerService.getManager(id);
      setUpdateFormData({
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        newuser: {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          password: "",
        },
      });
      setFormData({
        user: {
          email: data.user.email,
          phone: data.user.phone,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          auth: {
            type: "password",
            data: {
              password: "",
            },
          },
        },
        data: {
          dateOfBirth: data.dateOfBirth?.split("T")[0] || "",
          address: data.address || "",
        },
      });
    } catch (err) {
      console.error("Failed to fetch manager:", err);
      toast.error("Failed to fetch manager details");
    } finally {
      setLoading(false);
    }
  };

  const formatFormData = () => {
    if (password) {
      formData.user.auth.data.password = password;
    }
    console.log(formData);
    return formData;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.user.firstName ||
      !formData.user.lastName ||
      !formData.user.email ||
      !formData.user.phone ||
      !formData.data.dateOfBirth ||
      !formData.data.address ||
      !password
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateFormData.newuser.password = password;
    updateFormData.newuser.email = formData.user.email;
    updateFormData.newuser.phone = formData.user.phone;
    updateFormData.newuser.firstName = formData.user.firstName;
    updateFormData.newuser.lastName = formData.user.lastName;
    updateFormData.address = formData.data.address;
    updateFormData.dateOfBirth = formData.data.dateOfBirth;

    try {
      const formattedData = formatFormData();
      if (isEdit && id) {
        console.log(updateFormData);
        // return;
        const response = await managerService.updateManager(id, updateFormData);
        console.log(response);
      } else {
        const response = await managerService.createManager(formattedData);
        console.log(response);
        if (
          response.message ==
          "User successfully registered. Verification email sent."
        ) {
          toast.success("Manager created successfully");
        } else {
          toast.error("Failed to Create manager");
        }
      }
      setTimeout(() => {
        router.push("/manager/all");
      }, 2000);
    } catch (err) {
      console.error("Failed to save manager:", err);
      toast.error("Failed to save manager");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("user.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [field]: value,
        },
      }));
    } else if (name.startsWith("data.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          [field]: value,
        },
      }));
    } else if (name === "password") {
      setPassword(value);
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
              {isEdit ? "Edit Manager Details" : "Add New Manager"}
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
                    value={formData.user.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="user.lastName"
                    value={formData.user.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="user.email"
                  value={formData.user.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Phone
                </label>
                <input
                  type="text"
                  name="user.phone"
                  value={formData.user.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="user.password"
                  // value={formData.user.password || ""}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required={!isEdit}
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  name="data.address"
                  value={formData.data.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="data.dateOfBirth"
                  value={formData.data.dateOfBirth}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-50"
              >
                {loading
                  ? "Processing..."
                  : isEdit
                    ? "Update Manager"
                    : "Add Manager"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManagerForm;
