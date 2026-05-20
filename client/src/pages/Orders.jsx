// src/pages/Orders.jsx
import { useEffect, useState } from "react";
import { Table, Tag, Flex, Button } from "antd";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const res = await api.get("/api/order?nocache=1");
    setOrders(res.data.data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
    },
    {
      title: "Items",
      render: (_, record) => record.items.length,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const colorMap = {
          created: "blue",
          paid: "green",
          shipped: "purple",
          cancelled: "red",
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <>
      <Flex>
        <Button onClick={() => navigate("/products")}>Products</Button>
        <Button onClick={() => navigate("/cart")}>Go to Cart</Button>
      </Flex>
      <Table dataSource={orders} columns={columns} rowKey="_id" />
    </>
  );
}
