import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-expense-tracker-hcm0.onrender.com", // Replace with your backend URL if different
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
