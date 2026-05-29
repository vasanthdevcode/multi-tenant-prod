import { Form, Input, Select, Button, Card, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const RegisterTenant = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);

      await axios.post("/api/tenant", values);

      message.success("Tenant created");

      form.resetFields();
      navigate("/");
    } catch (err) {
      message.error(err?.response?.data?.message || "Failed to create tenant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Register Tenant"
      style={{
        maxWidth: 600,
        margin: "40px auto",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 700 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Tenant Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Enter tenant name",
            },
          ]}
        >
          <Input placeholder="Enter tenant name" allowClear />
        </Form.Item>

        <Form.Item
          label="Plan"
          name="plan"
          rules={[
            {
              required: true,
              message: "Select a plan",
            },
          ]}
        >
          <Select
            placeholder="Select plan"
            options={[
              {
                label: "Basic",
                value: "basic",
              },
              {
                label: "Pro",
                value: "pro",
              },
              {
                label: "Enterprise",
                value: "enterprise",
              },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Create Tenant
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterTenant;
