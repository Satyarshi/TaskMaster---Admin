import ManagerForm from "@/components/Forms/ManagerForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";

const tabs = [
  { label: "All Managers", route: "/manager/all" },
  { label: "Add Manager", route: "/manager/add" },
  { label: "Reports", route: "/manager/reports" },
];

const AddManagerPage = () => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          {/* <h1>Add Manager Page</h1>
          <p>This is where you can add a new manager.</p> */}
          <ManagerForm />
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default AddManagerPage;
