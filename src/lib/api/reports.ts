import api from "../api";

interface Task {
  _id: string;
  title: string;
  description: string;
  jobType: "long" | "short";
  state: string;
  status: string;
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

interface ReportResponse {
  message: string;
  report: {
    _id: string;
    employeeID: string;
    tasks: Task[];
    createdAt?: string;
    __v?: number;
  };
}

const reportService = {
  getEmployeeReport: async (employeeId: string): Promise<ReportResponse> => {
    const response = await api.get<ReportResponse>(
      `/reports/getEmployeeReport/${employeeId}`,
    );
    return response.data;
  },
};

export type { ReportResponse, Task };
export default reportService;
