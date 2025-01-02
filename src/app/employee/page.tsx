import React from "react";
import TabsLayout from "@/components/Layouts/TabLayout";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EmployeeTable from "@/components/Tables/EmployeeTable";
import EmployeeForm from "@/components/Forms/EmployeeForm";

const App: React.FC = () => {
  const tabs = [
    {
      label: "All Employees",
      content: <EmployeeTable />,
    },
    {
      label: "Add Employee",
      content: <EmployeeForm />,
    },
    {
      label: "Reports",
      content: <div className="p-4">Reports show here</div>,
    },
  ];

  return (
    <DefaultLayout>
      {/* <div className="flex min-h-screen items-center justify-center bg-gray-100"> */}
      <TabsLayout tabs={tabs} />
      {/* </div> */}
    </DefaultLayout>
  );
};

export default App;
