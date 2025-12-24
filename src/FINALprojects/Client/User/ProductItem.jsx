import { memo, useCallback } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Store/cartSlice";
import { motion } from "framer-motion";

/**
 * Displays a single product card with actions.
 * Memoized to prevent unnecessary re-renders when product data does not change.
 */
function ProductItem({ product }) {
  const dispatch = useDispatch();

  /**
   * Adds the current product to the cart.
   * Memoized to avoid recreating the function on each render.
   */
  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(product));
  }, [dispatch, product]);

  /**
   * Removes the current product from the cart.
   * Memoized to avoid recreating the function on each render.
   */
  const handleRemoveFromCart = useCallback(() => {
    dispatch(removeFromCart(product.id));
  }, [dispatch, product.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          display: "flex",
          mb: 2,
          p: 2,
          borderRadius: 3,
          boxShadow: 4,
          overflow: "hidden"
        }}
      >
        {/* Product image with hover animation */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <CardMedia
            component="img"
            sx={{
              width: 160,
              height: 160,
              borderRadius: 2,
              objectFit: "cover"
            }}
            image={product.imageUrl}
            alt={product.name}
          />
        </motion.div>

        {/* Product information */}
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, pl: 3 }}>
          <CardContent sx={{ pb: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {product.name}
            </Typography>

            <Typography color="text.secondary">
              Price: ₪{product.price}
            </Typography>

            <Typography
              color={product.stock > 0 ? "success.main" : "error.main"}
            >
              Stock: {product.stock}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Sold: <strong>{product.sold ?? 0}</strong>
            </Typography>
          </CardContent>

          {/* Actions */}
          <CardActions sx={{ mt: "auto" }}>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                sx={{ mr: 2 }}
              >
                Add
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleRemoveFromCart}
              >
                Remove
              </Button>
            </motion.div>
          </CardActions>
        </Box>
      </Card>
    </motion.div>
  );
}

export default memo(ProductItem);
