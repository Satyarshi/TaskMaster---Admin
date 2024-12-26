import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";

export const metadata: Metadata = {
  title: "manager Reports",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const ManagerReportPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reports / manager" />
      MANAGER REPORTS
    </DefaultLayout>
  );
};

export default ManagerReportPage;
