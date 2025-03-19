import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const positionService = {
  getAll: async (): Promise<string[]> => {
    const response = await axios.get(`${API_URL}/positions`);
    return response.data; 
  }
};
