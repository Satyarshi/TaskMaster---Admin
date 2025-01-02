import React from "react";
import TabsLayout from "@/components/Layouts/TabLayout";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ManagerTable from "@/components/Tables/ManagerTable";
import ManagerForm from "@/components/Forms/ManagerForm";
import Link from "next/link";

const App: React.FC = () => {
  const tabs = [
    {
      label: "All Managers",
      content: <ManagerTable />,
    },
    {
      label: "Add Manager",
      content: <ManagerForm />,
    },
    {
      label: "Reports",
      content: (
        <div className="p-4">
          <Link
            href="/reports/employee"
            className="inline-flex items-center rounded-sm bg-primary px-4 py-2 text-white transition-all hover:bg-opacity-90"
          >
            View Employee Reports
          </Link>
          <div className="mt-4">Reports show here</div>
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <TabsLayout tabs={tabs} />
    </DefaultLayout>
  );
};

export default App;
