import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";
import ManagerTable from "@/components/Tables/ManagerTable";

const tabs = [
  { label: "All Managers", route: "/manager/all" },
  { label: "Add Manager", route: "/manager/add" },
  { label: "Reports", route: "/manager/reports" },
];

const AllManagersPage = () => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          {/* <h1>All Managers</h1>
          <p>This is where you can view all managers.</p> */}
          <ManagerTable />
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default AllManagersPage;
