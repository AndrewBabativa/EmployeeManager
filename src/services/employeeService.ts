import { CreateEmployeeDto } from "../models/CreateEmployeeDto";
import { UpdateEmployeeDto } from "../models/UpdateEmployeeDto";
import { Employee } from "../models/Employee";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  },

  getById: async (id: string): Promise<Employee> => {
    const response = await axios.get(`${API_URL}/employees/${id}`);
    return response.data;
  },

  create: async (employeeData: CreateEmployeeDto): Promise<Employee> => {
    const response = await axios.post(`${API_URL}/employees`, employeeData);
    return response.data;
  },

  update: async (id: string, updateData: UpdateEmployeeDto): Promise<Employee> => {
    const response = await axios.put(`${API_URL}/employees/${id}`, updateData);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/employees/${id}`);
  }
};
