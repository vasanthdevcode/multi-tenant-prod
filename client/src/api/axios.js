// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "/", // your Fastify port
});

// Add headers automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const tenantId =
    localStorage.getItem("tenantId") !== "undefined"
      ? localStorage.getItem("tenantId")
      : undefined;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(tenantId, "***");
  if (tenantId) {
    config.headers["X-Tenant-Id"] = tenantId;
  }

  return config;
});

export default instance;
