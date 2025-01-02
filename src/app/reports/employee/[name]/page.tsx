"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EmployeeTotalPieChart from "@/components/Charts/EmployeeTotalPieChart";
import EmployeeWeekChart from "@/components/Charts/EmployeeWeekChart";
import EmployeeWeekPieChart from "@/components/Charts/EmployeeWeekPieChart";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";

interface EmployeeData {
  name: string;
  email: string;
  phone: string;
  store: string;
}

const EmployeeReport = () => {
  const params = useParams();
  const employeeName = params.name;

  // Dummy data
  const employeeData: EmployeeData = {
    name: employeeName as string,
    email: `${employeeName}@taskmaster.com`,
    phone: "+1234567890",
    store: "Store A",
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Reports / Employee / ${employeeName}`} />

      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="pb-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Employee Details for {employeeName}
            </h4>

            <div className="">
              {/* Basic Info Table */}
              <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-4 py-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">
                    Basic Information
                  </h5>
                </div>
                <div className="p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Name:</span>
                      <span>{employeeData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>
                      <span>{employeeData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Phone:</span>
                      <span>{employeeData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Store:</span>
                      <span>{employeeData.store}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics Charts */}
            </div>
          </div>
        </div>
      </div>
      <br />
      <EmployeeWeekChart employeeName={employeeName as string} />
      <br />
      <EmployeeWeekPieChart employeeName={employeeName as string} />
      <br />
      <EmployeeTotalPieChart employeeName={employeeName as string} />
    </DefaultLayout>
  );
};

export default EmployeeReport;
