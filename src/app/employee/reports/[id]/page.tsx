import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";

const tabs = [
  { label: "All Employees", route: "/employee/all" },
  { label: "Add Employee", route: "/employee/add" },
  { label: "Reports", route: "/employee/reports" },
];

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          <h1>Reports</h1>
          <p>This is where you can view reports.</p>
          <p>employee ID: {params.id}</p>
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default page;
