import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosInstance } from "axios";
import { User } from "../../models/user";

// Interface para o contexto
interface AuthContextProps {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<User>;
  isAuthenticated: boolean;
}

// Configuração do axios
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/usuarios",
});

// Funções auxiliares para gerenciar token no localStorage
const getTokenFromLocalStorage = (): string | null => localStorage.getItem("token");
const saveTokenToLocalStorage = (token: string) => localStorage.setItem("token", token);
const removeTokenFromLocalStorage = () => localStorage.removeItem("token");

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getTokenFromLocalStorage());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  // Atualiza o estado de autenticação quando o token muda
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await apiClient.get("/my-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token inválido ou expirado:", error);
        logout();
      }
    };

    validateToken();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await apiClient.post("/login", { email, password });
      const newToken = data.token;

      saveTokenToLocalStorage(newToken);
      setToken(newToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Credenciais inválidas.");
    }
  };

  const logout = () => {
    setToken(null);
    removeTokenFromLocalStorage();
    setIsAuthenticated(false);
  };

  const getProfile = async (): Promise<User> => {
    if (!token) throw new Error("Usuário não autenticado.");

    try {
      const { data } = await apiClient.get("/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, getProfile, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  return context;
};
