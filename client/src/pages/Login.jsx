// src/pages/Login.jsx
import { Form, Input, Button, Card, Select } from "antd";
import api from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await api.get("/api/tenant");

      setTenants(res.data.data);
    } catch {
      console.error("Failed to load tenants");
    }
  };
  const onFinish = async (values) => {
    try {
      console.log(values.tenantId, "***");
      localStorage.setItem("tenantId", values.tenantId);
      const res = await api.post("/api/login", { ...values });

      const { token, userId } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      window.location.href = "/products";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card title="Login" style={{ width: 300, margin: "100px auto" }}>
      <Button onClick={() => navigate("/treg")}>Create Tenant</Button>
      <Button onClick={() => navigate("/reg")}>Create User</Button>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Tenant"
          name="tenantId"
          rules={[
            {
              required: true,
              message: "Select tenant",
            },
          ]}
        >
          <Select
            placeholder="Select tenant"
            options={tenants?.map((tenant) => ({
              label: tenant.name,
              value: tenant._id,
            }))}
            onClick={(v) => {
              console.log;
              (v, "****");
            }}
          />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true }]}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>
    </Card>
  );
}
