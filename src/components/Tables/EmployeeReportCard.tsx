"use client";

import Link from "next/link";
import { format } from "date-fns";

interface Task {
  _id: string;
  title: string;
  description: string;
  jobType: string;
  state: string;
  status: string;
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface Report {
  _id: string;
  employeeID: string;
  tasks: Task[];
  createdAt: string;
}

interface EmployeeReportCardProps {
  report: Report;
}

const EmployeeReportCard = ({ report }: EmployeeReportCardProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* <div className="border-b border-stroke px-4 py-4 dark:border-strokedark">
        <h5 className="font-medium text-black dark:text-white">
          Employee Report - {format(new Date(report.createdAt), "MMM dd, yyyy")}
        </h5>
      </div> */}

      <div className="p-4">
        <div className="mb-5">
          <div className="mb-2 flex justify-between">
            <span className="font-medium text-black dark:text-white">
              Employee ID:
            </span>
            <Link
              href={`/reports/employee/${report.employeeID}`}
              className="text-primary hover:underline"
            >
              {report.employeeID}
            </Link>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="font-medium text-black dark:text-white">
              Total Tasks:
            </span>
            <span>{report.tasks.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Task Title
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Type
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {report.tasks.map((task) => (
                <tr key={task._id}>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                    <p className="text-black dark:text-white">{task.title}</p>
                    <p className="text-gray-6 text-sm">{task.description}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                    <span
                      className={`inline-block rounded px-2.5 py-0.5 text-sm font-medium ${
                        task.status === "pending"
                          ? "bg-warning bg-opacity-10 text-warning"
                          : task.status === "completed"
                            ? "bg-success bg-opacity-10 text-success"
                            : "bg-danger bg-opacity-10 text-danger"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                    <span className="text-black dark:text-white">
                      {task.jobType}
                    </span>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {format(new Date(task.createdAt), "MMM dd, yyyy")}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReportCard;
