import api from "../api";

interface Employee {
  _id?: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  dateOfBirth: string;
  address: string;
}

interface EmployeeFormData {
  user: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    auth: {
      type: "password";
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

interface UpdateEmployeeData {
  address: string;
  dateOfBirth: string;
  newuser: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

const employeeService = {
  getAllEmployees: async () => {
    const response = await api.get("/employee/crud");
    return response.data;
  },

  getEmployee: async (id: string) => {
    const response = await api.get(`/employee/crud/${id}`);
    return response.data;
  },

  createEmployee: async (employeeData: EmployeeFormData) => {
    const response = await api.post("/employee/register", employeeData);
    return response.data;
  },

  updateEmployee: async (id: string, employeeData: UpdateEmployeeData) => {
    const response = await api.put(`/employee/crud/${id}`, employeeData);
    return response.data;
  },

  deleteEmployee: async (id: string) => {
    const response = await api.delete(`/employee/crud/${id}`);
    return response.data;
  },
};

export default employeeService;
