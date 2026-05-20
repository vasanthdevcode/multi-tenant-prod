// src/pages/Login.jsx
import { Form, Input, Button, Card } from "antd";
import api from "../api/axios";

export default function Login() {
  const onFinish = async (values) => {
    try {
      const res = await api.post("/api/login", { ...values });

      const { token, tenantId, userId } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("tenantId", tenantId);
      localStorage.setItem("userId", userId);

      window.location.href = "/products";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card title="Login" style={{ width: 300, margin: "100px auto" }}>
      <Form onFinish={onFinish}>
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
