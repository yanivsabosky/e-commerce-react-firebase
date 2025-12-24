import { useMemo, useState ,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../Store/cartSlice";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Divider,
  Stack,
  Button,
  Avatar,
  Paper
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const DRAWER_WIDTH = 340;

function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
   const showContinueBtn = location.pathname === "/user/cart";

  const [open, setOpen] = useState(true);

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const handleOrder =  useCallback(() => {
    // מתחיל את ה-Wizard
    navigate("/user/cart/review");
  });

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(0,0,0,0.08)"
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <ShoppingCartIcon />
            <Typography variant="h6" fontWeight="bold">
              Cart
            </Typography>
          </Stack>

          <IconButton onClick={() => setOpen(false)} aria-label="close cart">
            <ChevronLeftIcon />
          </IconButton>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {cartItems.length} item(s)
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
        {cartItems.length === 0 ? (
          <Typography color="text.secondary">Cart is empty.</Typography>
        ) : (
          <Stack spacing={1.5}>
            {cartItems.map((item) => (
              <Paper key={item.id} variant="outlined" sx={{ p: 1.5 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar
                    src={item.imageUrl}
                    variant="rounded"
                    sx={{ width: 54, height: 54 }}
                  />
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography fontWeight="bold" noWrap>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₪{item.price} × {item.quantity} = ₪{item.price * item.quantity}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        -
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        +
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        {!open && null}

        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight="bold">Total</Typography>
            <Typography fontWeight="bold">₪{total}</Typography>
          </Stack>
          
          <Button
            variant="contained"
            disabled={cartItems.length === 0 || !showContinueBtn}
            onClick={handleOrder}
          >
            Order
          </Button>

          <Button
            variant="text"
            color="inherit"
            disabled={cartItems.length === 0 }
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </Button>

          {!open && (
            <Button onClick={() => setOpen(true)}>Open Cart</Button>
          )}
        </Stack>
      </Box>

      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            left: 10,
            top: 90,
            bgcolor: "background.paper",
            boxShadow: 2
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </Drawer>
  );
}

export default CartDrawer;
