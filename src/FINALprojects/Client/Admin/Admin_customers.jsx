// Dashboard For Which Users Are Currently Sign TO The Store
import { useEffect, useState } from 'react'
import DynamicComponent from '../DynamicComponent'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Data";
import { Box, Paper, Typography } from '@mui/material'

function Admin_customers() {


 // =====================================================
  // LOAD ALL NON-ADMIN USERS (CUSTOMERS)
  // =====================================================

  async function loadUsers() {
    const q = query(
      collection(db, "users"),
      where("isAdmin", "==", false)
    );

    const snap = await getDocs(q);


// Map Firestore documents into plain JS objects
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  // LOAD ALL ORDERS
  async function loadOrders() {
    const q = query(
      collection(db, "orders")
    );

    const snap = await getDocs(q);

    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

    // STATE MANAGEMENT
  const [customers, setCustomers] = useState([])
  const [orders, setOrders] = useState([])

  // INITIAL DATA LOAD (ON COMPONENT MOUNT)
  useEffect(() => {
    async function loadData() {
      const users = await loadUsers();
      const allOrders = await loadOrders();
      setCustomers(users);
      setOrders(allOrders);
    }

    loadData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Customers
      </Typography>

      <Paper sx={{ p: 2 }}>
        <DynamicComponent
          data={customers}
          columns={["fullname", "email", "createdAt"]}
          orders={orders}
          hideActions
        />
      </Paper>
    </Box>
  )
}

export default Admin_customers


