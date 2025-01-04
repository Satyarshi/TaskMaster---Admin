import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";
import AllStoresTable from "@/components/Tables/AllStoresTable";
import tabs from "../tabs";

const AllStoresPage = () => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          {/* <h1>All Managers</h1>
          <p>This is where you can view all managers.</p> */}
          <AllStoresTable />
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default AllStoresPage;
