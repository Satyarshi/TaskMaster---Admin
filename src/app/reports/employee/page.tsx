// "use client";

import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EmployeeTasksChart1 from "@/components/Charts/EmployeeTasksChart1";
import EmployeeTable from "@/components/Tables/EmployeeTable";

export const metadata: Metadata = {
  title: "employee Reports",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

import EmployeeReportCard from "@/components/Tables/EmployeeReportCard";

const report = {
  message: "Reports found successfully",
  reports: [
    {
      _id: "67766ffabe01ae7161690159",
      employeeID: "676ef7e339be9031c94ae062",
      tasks: [
        {
          _id: "67766ffabe01ae7161690157",
          title: "test the task apis",
          description: "just test it finally",
          jobType: "long",
          state: "active",
          status: "pending",
          assignedTo: "676ef7e339be9031c94ae062",
          createdBy: "676ef0ceeb752ec587f02e3d",
          createdAt: "2025-01-02T10:52:42.245Z",
          updatedAt: "2025-01-02T10:52:42.821Z",
          __v: 0,
        },
        {
          _id: "6776711853fadc7cfe92afcb",
          title: "test the task apis",
          description: "just test it finally",
          jobType: "long",
          state: "active",
          status: "pending",
          assignedTo: "676ef7e339be9031c94ae062",
          createdBy: "676ef0ceeb752ec587f02e3d",
          createdAt: "2025-01-02T10:57:28.946Z",
          updatedAt: "2025-01-02T10:57:29.574Z",
          __v: 0,
        },
      ],
      createdAt: "2025-01-02T10:52:42.541Z",
      __v: 1,
    },
    {
      _id: "67766ffabe01ae7161690160",
      employeeID: "676ef7e339be9031c94ae063",
      tasks: [
        {
          _id: "67766ffabe01ae7161690158",
          title: "Update user dashboard",
          description: "Implement new UI changes for the dashboard",
          jobType: "short",
          state: "active",
          status: "completed",
          assignedTo: "676ef7e339be9031c94ae063",
          createdBy: "676ef0ceeb752ec587f02e3d",
          createdAt: "2025-01-03T09:30:42.245Z",
          updatedAt: "2025-01-03T15:22:42.821Z",
          __v: 0,
        },
        {
          _id: "6776711853fadc7cfe92afcc",
          title: "Fix authentication bugs",
          description: "Resolve login issues reported by users",
          jobType: "urgent",
          state: "active",
          status: "in-progress",
          assignedTo: "676ef7e339be9031c94ae063",
          createdBy: "676ef0ceeb752ec587f02e3d",
          createdAt: "2025-01-03T11:45:28.946Z",
          updatedAt: "2025-01-03T14:57:29.574Z",
          __v: 0,
        },
      ],
      createdAt: "2025-01-03T09:30:42.541Z",
      __v: 1,
    },
    {
      _id: "67766ffabe01ae7161690161",
      employeeID: "676ef7e339be9031c94ae064",
      tasks: [
        {
          _id: "67766ffabe01ae7161690159",
          title: "Optimize database queries",
          description: "Improve performance of main database operations",
          jobType: "long",
          state: "active",
          status: "pending",
          assignedTo: "676ef7e339be9031c94ae064",
          createdBy: "676ef0ceeb752ec587f02e3d",
          createdAt: "2025-01-04T08:15:42.245Z",
          updatedAt: "2025-01-04T08:15:42.821Z",
          __v: 0,
        },
        {
          _id: "6776711853fadc7cfe92afcd",
          title: "Implement API caching",
          description:
            "Add Redis caching layer for frequently accessed endpoints",
          jobType: "medium",
          state: "active",
          status: "in-progress",
          assignedTo: "676ef7e339be9031c94ae064",
          createdBy: "676ef0ceeb752ec587f02e3d",
          createdAt: "2025-01-04T10:20:28.946Z",
          updatedAt: "2025-01-04T13:45:29.574Z",
          __v: 0,
        },
      ],
      createdAt: "2025-01-04T08:15:42.541Z",
      __v: 1,
    },
  ],
};

const EmployeeReportPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reports / Employee" />
      <EmployeeTasksChart1 />
      <br />
      <EmployeeTable />
      <br />
      {report.reports.map((report) => (
        <>
          <EmployeeReportCard key={report._id} report={report} />
          <br />
        </>
      ))}
    </DefaultLayout>
  );
};

export default EmployeeReportPage;
