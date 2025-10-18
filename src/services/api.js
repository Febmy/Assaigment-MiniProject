import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://reqres.in/api";
const X_API_KEY = import.meta.env.VITE_X_API_KEY || "reqres-free-v1";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json", "x-api-key": X_API_KEY },
});

export const UsersAPI = {
  list: (page = 1) => api.get("/users", { params: { page } }),
  single: (id) => api.get(`/users/${id}`),
};
export const AuthAPI = {
  login: (payload) => api.post("/login", payload),
  register: (payload) => api.post("/register", payload),
};
