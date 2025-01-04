import api from "../api";

// Update this interface to match your API
interface Manager {
  _id?: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  dateOfBirth: string;
  address: string;
  hireDate?: string;
}

// manager data schema for form
interface ManagerFormData {
  user: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    // password: string;
    auth: {
      type: string;
      data: {
        password: string;
      };
    };
  };
  data: {
    dateOfBirth: string;
    address: string;
  };
}

const managerService = {
  getAllManagers: async () => {
    const response = await api.get("/manager/crud");
    return response.data;
  },

  getManager: async (id: string) => {
    const response = await api.get(`/manager/crud/${id}`);
    return response.data;
  },

  createManager: async (managerData: ManagerFormData) => {
    const response = await api.post("/manager/register", managerData);
    return response.data;
  },

  updateManager: async (id: string, managerData: ManagerFormData) => {
    const response = await api.put(`/manager/crud/${id}`, managerData);
    return response.data;
  },

  deleteManager: async (id: string) => {
    const response = await api.delete(`/manager/crud/${id}`);
    return response.data;
  },
};

export default managerService;
// export type { Manager };
