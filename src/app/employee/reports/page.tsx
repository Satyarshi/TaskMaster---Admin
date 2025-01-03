import ManagerForm from "@/components/Forms/ManagerForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";

const tabs = [
  { label: "All Employees", route: "/employee/all" },
  { label: "Add Employee", route: "/employee/add" },
  { label: "Reports", route: "/employee/reports" },
];

const ReportsPage = () => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          <h1>Reports Page</h1>
          <p>This is where you can view reports of employees.</p>
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default ReportsPage;
