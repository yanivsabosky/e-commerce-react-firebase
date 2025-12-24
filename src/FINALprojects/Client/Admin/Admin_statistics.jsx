import { useState, useEffect  } from "react";
import { load } from "../Utils/utilities";

import BarChart from "../Charts/BarChart";
import PiChart from "../Charts/PiChart";
import UserDropdown from "../Charts/UserDropdown";

import {
  Box,
  Paper,
  Typography,
  Stack
} from "@mui/material";

function Admin_statistics() {
  const [Orders, setOrders] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Products, setProducts] = useState([]);
  const [productTotals, setProductTotals] = useState([]);
  const [userProductTotals, setuserProductTotals] = useState([]);

  useEffect(() => {
    async function DATA() {
      const orders = await load("orders");
      const Allusers = await load("users");
      const products = await load("products");

      setOrders(orders);

      const users = Allusers.filter(u => u.isAdmin === false)
      setUsers(users);
      setProducts(products);

      const totals = {};

      orders.forEach(order => {
        order.items.forEach(item => {
          if (!totals[item.id]) {
            totals[item.id] = item.quantity;
          } else {
            totals[item.id] += item.quantity;
          }
        });
      });

      const result = Object.keys(totals).map(id => {
        const p = products.find(prod => prod.id === id);
        return {
          name: p ? p.name : "Unknown",
          qty: totals[id]
        };
      });

      setProductTotals(result);
    }

    DATA();
  }, []);

  function setSelectedUser(userId) {
    const userOrders = Orders.filter(order => order.userId === userId);

    if (userOrders.length === 0) {
      setuserProductTotals([]);
      return;
    }

    const totals = {};

    userOrders.forEach(order => {
      order.items.forEach(item => {
        if (!totals[item.id]) {
          totals[item.id] = item.quantity;
        } else {
          totals[item.id] += item.quantity;
        }
      });
    });

    const result = Object.keys(totals).map(id => {
      const product = Products.find(p => p.id === id);
      return {
        name: product ? product.name : "Unknown",
        qty: totals[id]
      };
    });

    setuserProductTotals(result);
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Admin Statistics
      </Typography>

      <Stack spacing={3} sx={{ flexDirection: 'column' }}>
        <Paper sx={{ p: 3, width: '100%' }}>
          <Typography variant="h6" mb={2}>
            Products Sold (Overall)
          </Typography>
          <Box sx={{ height: 400 }}>
            <PiChart data={productTotals} />
          </Box>
        </Paper>

        <Paper sx={{ p: 3, width: '100%' }}>
          <Typography variant="h6" mb={2}>
            Products Sold Per Customer
          </Typography>

          <Box sx={{ mb: 2 }}>
            <UserDropdown users={Users} onSelect={setSelectedUser} />
          </Box>

          <Box sx={{ height: 400 }}>
            <BarChart data={userProductTotals} />
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}

export default Admin_statistics;    
