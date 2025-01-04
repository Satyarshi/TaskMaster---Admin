import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";
import tabs from "../../tabs";
import BioData from "@/components/Reports/employee/BioData";
import TaskReport from "@/components/Reports/employee/tasktable";
const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          <BioData employeeId={params.id} />
          <br />
          <TaskReport employeeId={params.id} />
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default page;
