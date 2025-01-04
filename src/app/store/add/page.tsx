import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";
import EmployeeTable from "@/components/Tables/EmployeeTable";
import ManagerTable from "@/components/Tables/ManagerTable";
import StoreForm from "@/components/Forms/StoreForm";
import tabs from "../tabs";

const AllManagersPage = () => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          <StoreForm />
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default AllManagersPage;
