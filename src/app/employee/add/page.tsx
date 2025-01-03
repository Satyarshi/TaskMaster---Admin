import EmployeeForm from "@/components/Forms/EmployeeForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";

const tabs = [
  { label: "All Employees", route: "/employee/all" },
  { label: "Add Employee", route: "/employee/add" },
  { label: "Reports", route: "/employee/reports" },
];

const AddEmployeePage = () => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          {/* <h1>Add Manager Page</h1>
          <p>This is where you can add a new manager.</p> */}
          <EmployeeForm />
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default AddEmployeePage;
