// User Base Route 
import { memo } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";




//  Reusable navigation card component

function User() {
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      
      {/* --------- WELCOME --------- */}
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Welcome, {auth.fullname}
      </Typography>

      {/* --------- NAVIGATION GRID --------- */}
      <Grid 
        container 
        spacing={3} 
        justifyContent="center"
        sx={{ maxWidth: 800, margin: "0 auto" }}
      >

        {/* PRODUCTS */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: "pointer",
              borderRadius: 2,
              transition: "0.2s",
              "&:hover": { transform: "scale(1.05)" }
            }}
            onClick={() => navigate("products")}
          >
            <ShoppingBagIcon sx={{ fontSize: 50, mb: 1, color: "primary.main" }} />
            <Typography variant="h6">Products</Typography>
          </Paper>
        </Grid>

        {/* MY ORDERS */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: "pointer",
              borderRadius: 2,
              transition: "0.2s",
              "&:hover": { transform: "scale(1.05)" }
            }}
            onClick={() => navigate("my-orders")}
          >
            <HistoryIcon sx={{ fontSize: 50, mb: 1, color: "primary.main" }} />
            <Typography variant="h6">My Orders</Typography>
          </Paper>
        </Grid>

        {/* ACCOUNT */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: "pointer",
              borderRadius: 2,
              transition: "0.2s",
              "&:hover": { transform: "scale(1.05)" }
            }}
            onClick={() => navigate("acount")}
          >
            <AccountCircleIcon sx={{ fontSize: 50, mb: 1, color: "primary.main" }} />
            <Typography variant="h6">Account</Typography>
          </Paper>
        </Grid>

      </Grid>

      {/* --------- CONTENT BELOW NAVIGATION --------- */}
      <Box sx={{ mt: 6 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

// Prevents unnecessary rerenders when navigating
export default memo(User);



