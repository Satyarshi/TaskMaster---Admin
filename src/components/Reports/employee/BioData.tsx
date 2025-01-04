"use client";

import { useState, useEffect } from "react";
import employeeService from "@/lib/api/employee";
import { toast } from "react-hot-toast";

interface EmployeeDetails {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    roles: string[];
    permissions: string[];
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  dateOfBirth: string;
  address: string;
  status: string;
  hireDate: string;
}

interface BioDataProps {
  employeeId: string;
}

const BioData: React.FC<BioDataProps> = ({ employeeId }) => {
  const [employeeDetails, setEmployeeDetails] =
    useState<EmployeeDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (employeeId) {
      fetchEmployeeDetails(employeeId);
    }
  }, [employeeId]);

  const fetchEmployeeDetails = async (id: string) => {
    try {
      setLoading(true);
      const data = await employeeService.getEmployee(id);
      setEmployeeDetails(data);
    } catch (err) {
      console.error("Failed to fetch employee details:", err);
      toast.error("Failed to fetch employee details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!employeeDetails) return <div>No employee data found</div>;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Employee Bio Data :{" "}
          <span className="font-bold text-primary">{employeeId}</span>
        </h3>
      </div>
      <div className="p-6.5">
        <div className="mb-4.5">
          <div className="flex flex-col gap-5.5 p-2">
            <div>
              <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                Personal Information
              </h4>
              <div className="rounded-sm border border-stroke bg-gray-2 dark:border-strokedark dark:bg-meta-4">
                <div className="grid grid-cols-2 gap-5 p-4">
                  <div>
                    <span className="font-medium ">Full Name:</span>
                    <p className="mt-1 text-black dark:text-white">
                      {`${employeeDetails.user.firstName} ${employeeDetails.user.lastName}`}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="mt-1 text-black dark:text-white">
                      {employeeDetails.user.email}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>
                    <p className="mt-1 text-black dark:text-white">
                      {employeeDetails.user.phone}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Date of Birth:</span>
                    <p className="mt-1 text-black dark:text-white">
                      {formatDate(employeeDetails.dateOfBirth)}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Address:</span>
                    <p className="mt-1 text-black dark:text-white">
                      {employeeDetails.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                Work Information
              </h4>
              <div className="rounded-sm border border-stroke bg-gray-2 dark:border-strokedark dark:bg-meta-4">
                <div className="grid grid-cols-2 gap-5 p-4">
                  <div>
                    <span className="font-medium">Status:</span>
                    <p className="mt-1 text-black dark:text-white">
                      {employeeDetails.status}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Hire Date:</span>
                    <p className="mt-1 text-black dark:text-white">
                      {formatDate(employeeDetails.hireDate)}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Account Status:</span>
                    <p className="mt-1 text-black dark:text-white">
                      {employeeDetails.user.isVerified
                        ? "Verified"
                        : "Not Verified"}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Member Since:</span>
                    <p className="mt-1 text-black dark:text-white">
                      {formatDate(employeeDetails.user.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioData;
