import axios from "axios";
import { RegisterUserDto } from '../models/RegisterUserDto'

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de autenticación");
    }
    throw new Error("Error al conectar con el servidor");
  }
};

export const registerUser = async (userData: RegisterUserDto) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error al registrar usuario");
    }
    throw new Error("Error desconocido en el registro");
  }
};