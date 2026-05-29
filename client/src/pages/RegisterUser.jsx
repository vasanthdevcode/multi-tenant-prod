import { useEffect, useState } from "react";
import { Form, Input, Button, Select, Card } from "antd";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await axios.get("/api/tenant");

      setTenants(res.data.data);
      // navigate("/");
    } catch {
      console.error("Failed to load tenants");
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);

      await axios.post("/api/user", values);

      console.success("User created");

      form.resetFields();
    } catch (err) {
      console.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Register User" style={{ maxWidth: 700 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
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
            onChange={(v) => localStorage.setItem("tenantId", v)}
          />
        </Form.Item>

        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="Role" name="role" initialValue="admin">
          <Select
            options={[
              {
                label: "Admin",
                value: "admin",
              },
              {
                label: "Manager",
                value: "manager",
              },
              {
                label: "Viewer",
                value: "viewer",
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Status" name="status" initialValue="active">
          <Select
            options={[
              {
                label: "Active",
                value: "active",
              },
              {
                label: "Inactive",
                value: "inactive",
              },
            ]}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Register
        </Button>
      </Form>
    </Card>
  );
};

export default RegisterUser;
