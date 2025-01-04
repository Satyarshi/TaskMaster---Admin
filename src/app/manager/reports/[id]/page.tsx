import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";
import tabs from "../../tabs";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          <h1>Reports</h1>
          <p>This is where you can view reports.</p>
          <p>Report ID: {params.id}</p>
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default page;
