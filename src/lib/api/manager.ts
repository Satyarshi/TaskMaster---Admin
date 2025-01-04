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

const managerService = {
  getAllManagers: async () => {
    const response = await api.get("/manager/crud");
    return response.data;
  },

  getManager: async (id: string) => {
    const response = await api.get(`/manager/crud/${id}`);
    return response.data;
  },

  createManager: async (managerData: Manager) => {
    const response = await api.post("/manager/crud", managerData);
    return response.data;
  },

  updateManager: async (id: string, managerData: Manager) => {
    const response = await api.put(`/manager/crud/${id}`, managerData);
    return response.data;
  },

  deleteManager: async (id: string) => {
    const response = await api.delete(`/manager/crud/${id}`);
    return response.data;
  },
};

export default managerService;
