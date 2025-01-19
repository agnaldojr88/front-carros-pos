import api from "./api";

export const loginUsuario = async (email: string, password: string) => {
  const response = await api.post("/usuarios/login", { email, password });
  return response.data;
};

export const listarUsuarios = async () => {
  const response = await api.get("/usuarios");
  return response.data;
};

export default { loginUsuario, listarUsuarios };

export interface LoginData {
  email: string;
  password: string;
}