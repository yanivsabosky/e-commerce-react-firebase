// THis Section Is Handling The Perches  Of The User
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../Store/cartSlice";
import { useNavigate } from "react-router-dom";
import { serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Data";

import { add, load } from "../../Utils/utilities";
import { setProducts } from "../../Store/productsSlice";

import {
  Box,
  Typography,
  Stack,
  Button,
  Alert,
  CircularProgress
} from "@mui/material";

function OrderConfirm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const auth = useSelector((state) => state.auth);
  const products = useSelector((state) => state.product.items);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  async function placeOrder() {
    setError("");
    setSubmitting(true);

    try {
      if (!auth?.uid) throw new Error("User not logged in");
      if (cartItems.length === 0) throw new Error("Cart is empty");

      /* =========================
          CREATE ORDER
      ========================= */
      const orderBody = {
        userId: auth.uid,
        createdAt: serverTimestamp(),
        total,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      };

      await add("orders", orderBody);
      console.log("✅ Order saved");

      /* =========================
          UPDATE PRODUCTS
         stock ↓ | sold ↑
      ========================= */
      for (const item of cartItems) {
        const prod = products.find((p) => p.id === item.id);
        if (!prod) continue;

        const currentStock = Number(prod.stock ?? 0);
        const currentSold = Number(prod.sold ?? 0);

        const newStock = Math.max(0, currentStock - item.quantity);
        const newSold = currentSold + item.quantity;

        await updateDoc(doc(db, "products", item.id), {
          stock: newStock,
          sold: newSold
        });
      }

      console.log("✅ Stock & sold updated");

      /* =========================
          SYNC REDUX
      ========================= */
      const updatedProducts = await load("products");
      dispatch(setProducts(updatedProducts));

      /* =========================
         CLEAR CART
      ========================= */
      dispatch(clearCart());

      /* =========================
        DONE
      ========================= */
      navigate("/user/cart/done");

    } catch (err) {
      console.error("Order error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (cartItems.length === 0) {
    return <Typography color="text.secondary">Cart is empty.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Confirm Order
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Items</Typography>
          <Typography>{cartItems.length}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold">Total</Typography>
          <Typography fontWeight="bold">₪{total}</Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mt: 2 }} justifyContent="flex-end">
        <Button
          variant="outlined"
          onClick={() => navigate("/user/cart/review")}
          disabled={submitting}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={placeOrder}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Placing...
            </>
          ) : (
            "Place Order"
          )}
        </Button>
      </Stack>
    </Box>
  );
}

export default OrderConfirm;




   