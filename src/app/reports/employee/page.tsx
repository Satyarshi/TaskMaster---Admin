import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";

export const metadata: Metadata = {
  title: "employee Reports",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const EmployeeReportPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reports / Employee" />
      EMPLOYEE REPORTS
    </DefaultLayout>
  );
};

export default EmployeeReportPage;
