// User Cart 
import { Box, Container, Paper, Typography, Button } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CartDrawer from "./CartDrawer";

function UserCart() {
  const navigate = useNavigate();
  const location = useLocation();

  // The Button Will Display only on the main /user/cart
  const showContinueBtn = location.pathname === "/user/cart";

  return (
    <Box sx={{ display: "flex" }}>
      <CartDrawer />

      <Box component="main" sx={{ flexGrow: 1, ml: 0, p: 3 }}>
        <Container maxWidth="md">
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Checkout
            </Typography>

            {showContinueBtn && (
              <Button
                variant="contained"
                onClick={() => navigate("review")}
                sx={{ mb: 3 }}
              >
                Continue to Checkout
              </Button>
            )}

            <Outlet />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default UserCart;


