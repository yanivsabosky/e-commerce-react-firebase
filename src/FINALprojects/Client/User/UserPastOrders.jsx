// Displaying The Past Orders Of The Current User
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserOrders } from "../Utils/ordersService"

import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Alert,
  CircularProgress
} from "@mui/material";

function UserPastOrders() {
  // Holds the user's past orders
  const [pastOrders, setPastOrders] = useState([]);

  // Controls loading spinner visibility
  const [loading, setLoading] = useState(true);

  // Stores error message if request fails
  const [error, setError] = useState("");

  // Access authentication state from Redux
  const auth = useSelector(state => state.auth);

  useEffect(() => {

     // If user is not logged in, clear data and stop loading
    if (!auth?.uid) {
      setPastOrders([]);
      setLoading(false);
      return;
    }

    // Fetch orders that belong only to the current user
    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const userOrders = await getUserOrders(auth.uid);
        setPastOrders(userOrders);

      } catch (err) {
        console.error("Error loading orders:", err);
        setError("Failed to load orders. Please try again.");
        setPastOrders([]);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [auth?.uid]);

  const renderDate = (createdAt) => {
    if (!createdAt) return "Unknown";

    if (createdAt.toDate) {
      return createdAt.toDate().toLocaleString("he-IL");
    }

    if (createdAt.seconds) {
      return new Date(createdAt.seconds * 1000).toLocaleString("he-IL");
    }

    if (typeof createdAt === "string") {
      return new Date(createdAt).toLocaleString("he-IL");
    }

    return "Unknown";
  };


// Show loading spinner while fetching data
  if (loading) {
    return (
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        My Orders
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {pastOrders.length === 0 && (
        <Typography color="text.secondary">
          No past orders found
        </Typography>
      )}

      {pastOrders.map(order => (
        <Card
          key={order.id}
          sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Order Date: {renderDate(order.createdAt)}
            </Typography>

            <Typography sx={{ mt: 1, mb: 2 }}>
              Total: <strong>₪{order.total}</strong>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography fontWeight="bold" mb={1}>
              Items:
            </Typography>

            {order.items?.length ? (
              order.items.map((item, i) => (
                <Typography key={i} variant="body2" sx={{ ml: 2 }}>
                  • {item.name} <br /> Quantity : {item.quantity} <br/> ₪{item.price}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No items in this order
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPastOrders;



