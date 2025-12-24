// THis Section Is Handling The Perches  Of The User
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  Avatar,
  Paper
} from "@mui/material";

function OrderReview() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  // Display The Total Sum For The User Perches  
  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  if (cartItems.length === 0) {
    return <Typography color="text.secondary">Cart is empty.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Review Order
      </Typography>

      <Stack spacing={1.5}>
        {cartItems.map((item) => (
          <Paper key={item.id} variant="outlined" sx={{ p: 1.5 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                src={item.imageUrl}
                variant="rounded"
                sx={{ width: 56, height: 56 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography fontWeight="bold">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ₪{item.price} × {item.quantity}
                </Typography>
              </Box>
              <Typography fontWeight="bold">
                ₪{item.price * item.quantity}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="bold">Total</Typography>
        <Typography fontWeight="bold">₪{total}</Typography>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mt: 2 }} justifyContent="flex-end">
        <Button variant="outlined" onClick={() => navigate("/user/products")}>
          Back to products
        </Button>

        <Button variant="contained" onClick={() => navigate("/user/cart/confirm")}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
}

export default OrderReview;



