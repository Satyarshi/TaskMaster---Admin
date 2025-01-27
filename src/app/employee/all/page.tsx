import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";
import EmployeeTable from "@/components/Tables/EmployeeTable";
import ManagerTable from "@/components/Tables/ManagerTable";
import tabs from "../tabs";

const AllManagersPage = () => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          {/* <h1>All Managers</h1>
          <p>This is where you can view all managers.</p> */}
          <EmployeeTable />
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default AllManagersPage;
