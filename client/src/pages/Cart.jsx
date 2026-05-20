import { Table, Button } from "antd";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const handleCheckout = async () => {
    const items = cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      priceAtPurchase: item.price,
    }));

    await api.post(
      "/api/order",
      {
        userId,
        items,
      },
      { headers: { "idempotency-key": "123" } },
    );

    localStorage.removeItem("cart");
    navigate("/products");
  };

  return (
    <>
      <Table
        dataSource={cart}
        rowKey="productId"
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Price", dataIndex: "price" },
          { title: "Qty", dataIndex: "quantity" },
        ]}
      />

      <Button type="primary" onClick={handleCheckout}>
        Place Order
      </Button>
      <Button
        onClick={() => {
          localStorage.removeItem("cart");
          navigate("/products");
        }}
      >
        Go back to Product page
      </Button>
    </>
  );
}
