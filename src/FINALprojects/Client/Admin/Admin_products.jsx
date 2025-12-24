// Displaying The Current Products In the Store + Actions Such As (ADD,UPDATE,DELETE)
import { useEffect, useState } from "react";
import { load, add, update, delete_action } from "../Utils/utilities";
import DynamicComponent from "../DynamicComponent";
import { serverTimestamp } from "firebase/firestore";
import { Box, Typography } from "@mui/material";

function Admin_products() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // =====================================================
  // LOAD PRODUCTS + ORDERS
  // =====================================================
  useEffect(() => {
    async function loadData() {
      const productsData = await load("products");
      const ordersData = await load("orders");

      setProducts(productsData);
      setOrders(ordersData);
    }

    loadData();
  }, []);

  // =====================================================
  // ADD PRODUCT
  // =====================================================
  async function handleAddProducts(data) {
   const body = {
  name: data.name?.trim() || "",
  price: Number(data.price) || 0,
  stock: Number(data.stock) || 0,
  categoryId: data.categoryId?.trim() || "",
  imageUrl: data.imageUrl || "",
  createdAt: serverTimestamp(),
  isActive: true,
};


    const docRef = await add("products", body);

    setProducts((prev) => [
      ...prev,
      {
        id: docRef.id,
        ...body,
        createdAt: new Date(), 
      },
    ]);
  }

  // =====================================================
  // UPDATE PRODUCT
  // =====================================================
  async function handleUpdateProduct(data) {
    const clean = {
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock),
      categoryId: data.categoryId?.trim() || "",
      imageUrl: data.imageUrl,
    };

    await update("products", data.id, clean);

    setProducts((prev) =>
      prev.map((p) => (p.id !== data.id ? p : { ...p, ...clean }))
    );
  }

  // =====================================================
  // DELETE PRODUCT
  // =====================================================
  async function handleDeleteProduct(id) {
    await delete_action("products", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  // =====================================================
  // BUYERS – MUST RETURN ARRAY (FOR DynamicComponent)
  // =====================================================
  function handleShowBuyers(productId) {
    const buyers = [];

    orders.forEach((order) => {
      if (!order.items || !Array.isArray(order.items)) return;

      order.items.forEach((item) => {
        if (item.id === productId) {
          buyers.push({
            quantity: item.quantity,
            orderDate: order.createdAt,
            price: item.price,
          });         
        }
      });
    });

    return buyers; 
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Products
      </Typography>

      <DynamicComponent
        data={products}
        columns={[
          "name",
          "price",
          "stock",
          "categoryId",
          "createdAt",
          "imageUrl",
          "buyers",
        ]}
        onAdd={handleAddProducts}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
        onShowBuyers={handleShowBuyers}
      />
    </Box>
  );
}

export default Admin_products;

