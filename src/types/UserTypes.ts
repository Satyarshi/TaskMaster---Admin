export interface User {
  _id: string;
  roles: string[];
  permissions: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Manager {
  _id: string;
  user: User;
  dateOfBirth: string;
  address: string;
  hireDate: string;
}

export interface Employee {
  _id: string;
  user: User;
  dateOfBirth: string;
  address: string;
  status: string;
  hireDate: string;
}

export interface Store {
  _id: string;
  storeId: string;
  storeName: string;
  managers: string[]; // List of manager IDs
  employees: string[]; // List of employee IDs
  address: string;
  createdAt: string;
  updatedAt: string;
}
