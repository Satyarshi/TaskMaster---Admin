import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabLayout from "@/components/Layouts/TabLayout";

import tabs from "../tabs";
import UpdateStoreForm from "@/components/Forms/updateStoreForm";

const UpdateStorePage = () => {
  return (
    <div>
      <DefaultLayout>
        <TabLayout tabs={tabs}>
          <UpdateStoreForm />
        </TabLayout>
      </DefaultLayout>
    </div>
  );
};

export default UpdateStorePage;
