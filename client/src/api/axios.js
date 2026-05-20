// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // your Fastify port
});

// Add headers automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const tenantId =
    (localStorage.getItem("tenantId") !== "undefined"
      ? localStorage.getItem("tenantId")
      : undefined) || "69f47f574baa963f1f7996d5";

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
