// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// import axios from "axios";
// import { Manager, Employee, Store } from "@/types/UserTypes";

// interface AdminDataContextType {
//   managers: Manager[];
//   employees: Employee[];
//   stores: Store[];
//   setManagers: (managers: Manager[]) => void;
//   setEmployees: (employees: Employee[]) => void;
//   setStores: (stores: Store[]) => void;
// }

// const AdminDataContext = createContext<AdminDataContextType | undefined>(
//   undefined,
// );

// export const AdminDataProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [managers, setManagers] = useState<Manager[]>([]);
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [stores, setStores] = useState<Store[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [managersRes, employeesRes, storesRes] = await Promise.all([
//           axios.get<Manager[]>("/api/managers"), // Replace with your managers API endpoint
//           axios.get<Employee[]>("/api/employees"), // Replace with your employees API endpoint
//           axios.get<Store[]>("/api/stores"), // Replace with your stores API endpoint
//         ]);

//         setManagers(managersRes.data);
//         setEmployees(employeesRes.data);
//         setStores(storesRes.data);
//       } catch (error) {
//         console.error("Error fetching admin data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <AdminDataContext.Provider
//       value={{
//         managers,
//         employees,
//         stores,
//         setManagers,
//         setEmployees,
//         setStores,
//       }}
//     >
//       {children}
//     </AdminDataContext.Provider>
//   );
// };

// export const useAdminData = () => {
//   const context = useContext(AdminDataContext);
//   if (!context) {
//     throw new Error("useAdminData must be used within an AdminDataProvider");
//   }
//   return context;
// };
