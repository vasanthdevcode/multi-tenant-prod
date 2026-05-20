// src/pages/CreateProduct.jsx
import { Form, Input, Button, Card } from "antd";
import api from "../api/axios";

export default function CreateProduct() {
  const onFinish = async (values) => {
    await api.post("/api/product", values);
    window.location.href = "/products";
  };

  return (
    <Card title="Create Product" style={{ width: 400, margin: "50px auto" }}>
      <Form onFinish={onFinish}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Product Name" />
        </Form.Item>

        <Form.Item name="category" rules={[{ required: true }]}>
          <Input placeholder="Category" />
        </Form.Item>

        <Form.Item name="price" rules={[{ required: true }]}>
          <Input type="number" placeholder="Price" />
        </Form.Item>

        <Form.Item name="inventoryCount">
          <Input type="number" placeholder="Stock" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Create
        </Button>
      </Form>
    </Card>
  );
}