import api from "../api";

interface Store {
  _id?: string;
  storeId: string;
  storeName: string;
  managers: string[];
  employees: string[];
  address: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface StoreFormData {
  storeName: string;
  address: string;
}

const storeService = {
  getAllStores: async () => {
    const response = await api.get("/store");
    return response.data;
  },

  getStore: async (storeId: string) => {
    const response = await api.get(`/store/${storeId}`);
    return response.data;
  },

  createStore: async (storeData: StoreFormData) => {
    const response = await api.post("/store", storeData);
    return response.data;
  },

  addEmployee: async (storeId: string, employeeId: string) => {
    const response = await api.post(`/store/${storeId}/employee/${employeeId}`);
    return response.data;
  },

  removeEmployee: async (storeId: string, employeeId: string) => {
    const response = await api.delete(
      `/store/${storeId}/employee/${employeeId}`,
    );
    return response.data;
  },

  deleteStore: async (id: string) => {
    const response = await api.delete(`/store/${id}`);
    return response.data;
  },

  //   updateStore: async (id: string, storeData: StoreFormData) => {
  //     const response = await api.put(`/stores/${id}`, storeData);
  //     return response.data;
  //   },

  addManager: async (storeId: string, managerId: string) => {
    const response = await api.post(`/store/${storeId}/manager/${managerId}`);
    return response.data;
  },

  removeManager: async (storeId: string, managerId: string) => {
    const response = await api.delete(`/store/${storeId}/manager/${managerId}`);
    return response.data;
  },
};

export default storeService;
