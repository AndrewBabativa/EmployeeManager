import { createContext, useState, ReactNode } from "react";
import { loginUser } from "../services/authService"; 

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);

  const login = async (email: string, password: string) => {
    try {
      const newToken = await loginUser(email, password); 
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw new Error("Credenciales inválidas");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); 
    window.location.href = "/login"; 
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
