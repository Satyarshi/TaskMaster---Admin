import ManagerForm from "@/components/Forms/ManagerForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";
import tabs from "../tabs";

const StoreReportsPage = () => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          <h1>Store Reports Page</h1>
          <p>This is where you can view reports.</p>
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default StoreReportsPage;
