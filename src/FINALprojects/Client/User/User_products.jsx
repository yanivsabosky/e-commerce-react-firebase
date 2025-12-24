// Displaying all the products available in the store
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback, useMemo } from "react";
import ProductItem from "./ProductItem";
import { load } from "../Utils/utilities";
import { setProducts, setLoading, setError } from "../Store/productsSlice";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";

function User_products() {
  const dispatch = useDispatch();

  // Get cart items from Redux to calculate available stock
  const cartItems = useSelector((state) => state.cart.items);

  // Get products list from Redux
  const products = useSelector((state) => state.product.items);

  // Indicates whether products are currently loading
  const loading = useSelector((state) => state.product.loading);

  // Local state for filtering products
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
    maxPrice: 1000,
    searchText: "",
  });

  // Holds all product categories for the filter dropdown
  const [categories, setCategories] = useState([]);

  /**
   * Calculates available stock for a product
   * Memoized to prevent function recreation on every render
   */
  const getAvailableStock = useCallback(
    (product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      const inCartQty = cartItem ? cartItem.quantity : 0;
      return product.stock - inCartQty;
    },
    [cartItems]
  );

  /* =========================
     Load Categories
  ========================= */
  useEffect(() => {
    async function loadCategories() {
      const res = await load("categories");
      setCategories(res);
    }

    loadCategories();
  }, []);

  /* =========================
     Load Products
  ========================= */
  useEffect(() => {
    async function loadProducts() {
      try {
        dispatch(setLoading(true));
        const res = await load("products");
        dispatch(setProducts(res));
      } catch (err) {
        dispatch(setError(err.message));
      }
    }

    loadProducts();
  }, [dispatch]);

  /**
   * Filters products based on:
   * - available stock
   * - category
   * - price range
   * - search text
   *
   * Memoized to avoid recalculating on unrelated renders
   */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Exclude products that are fully out of stock
      if (getAvailableStock(product) <= 0) return false;

      // Filter by selected category
      if (
        filters.category !== "all" &&
        product.categoryId !== filters.category
      )
        return false;

      // Filter by minimum price
      if (product.price < filters.minPrice) return false;

      // Filter by maximum price
      if (filters.maxPrice > 0 && product.price > filters.maxPrice) return false;

      // Filter by search text (case insensitive)
      if (
        filters.searchText &&
        !product.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase())
      )
        return false;

      return true;
    });
  }, [products, filters, getAvailableStock]);

  /* =========================
     UI
  ========================= */
  return (
    <Box sx={{ p: 2 }}>
      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Category filter */}
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Category"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Minimum price filter */}
        <Grid item xs={12} sm={3}>
          <TextField
            type="number"
            label="Min Price"
            fullWidth
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: +e.target.value })
            }
          />
        </Grid>

        {/* Maximum price filter */}
        <Grid item xs={12} sm={3}>
          <TextField
            type="number"
            label="Max Price"
            fullWidth
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: +e.target.value })
            }
          />
        </Grid>

        {/* Search by product name */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="Search"
            fullWidth
            value={filters.searchText}
            onChange={(e) =>
              setFilters({ ...filters, searchText: e.target.value })
            }
          />
        </Grid>

        {/* Clear all filters */}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() =>
              setFilters({
                category: "all",
                minPrice: 0,
                maxPrice: 1000,
                searchText: "",
              })
            }
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>

      {/* Loading indicator */}
      {loading && <CircularProgress />}

      {/* Product list */}
      {!loading &&
        filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
    </Box>
  );
}

export default User_products;
