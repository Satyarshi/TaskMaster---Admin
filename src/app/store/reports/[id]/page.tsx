import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";
import tabs from "../../tabs";

const StoreReportsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          <h1>Reports</h1>
          <p>This is where you can view reports.</p>
          <p>store ID: {params.id}</p>
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default StoreReportsPage;
