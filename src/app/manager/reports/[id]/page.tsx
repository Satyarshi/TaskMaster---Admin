import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";

const tabs = [
  { label: "All Managers", route: "/manager/all" },
  { label: "Add Manager", route: "/manager/add" },
  { label: "Reports", route: "/manager/reports" },
];

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
