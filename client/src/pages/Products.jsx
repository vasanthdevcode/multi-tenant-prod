// src/pages/Products.jsx
import { useEffect, useState } from "react";
import { Table, Button, Flex } from "antd";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await api("/api/product");
    console.log(res, "***");
    setData(res.data.data || []);
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Flex>
        <Button onClick={() => navigate("/orders")}>View Orders</Button>
        <Button onClick={() => navigate("/create-product")}>Add Product</Button>
        <Button onClick={() => navigate("/cart")}>Go to Cart</Button>
      </Flex>

      <Table
        dataSource={data}
        rowKey="_id"
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Category", dataIndex: "category" },
          { title: "Price", dataIndex: "price" },
          { title: "Stock", dataIndex: "inventoryCount" },
          {
            title: "Action",
            dataIndex: "",
            render: (_, record) => (
              <Button onClick={() => handleAddToCart(record)}>
                Add to cart
              </Button>
            ),
          },
        ]}
      />
    </>
  );
}
