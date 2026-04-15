import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth
export const loginUser    = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// Contacts
export const fetchContacts  = (page = 1, limit = 6) => API.get(`/contacts?page=${page}&limit=${limit}`);
export const createContact  = (data) => API.post("/contacts", data);
export const updateContact  = (id, data) => API.put(`/contacts/${id}`, data);
export const deleteContact  = (id) => API.delete(`/contacts/${id}`);

export default API;
