import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // cambia el puerto si tu backend usa otro
});

export async function login(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", data.access_token);
  return data;
}