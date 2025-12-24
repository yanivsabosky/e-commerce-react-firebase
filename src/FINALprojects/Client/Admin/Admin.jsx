// Admin Base Route
import { memo } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate, Outlet } from "react-router-dom";


//   Reusable navigation card component

function Admin() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      
      {/* --------- WELCOME / HEADER --------- */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4, display: "flex", justifyContent: "center", gap: 1 }}
      >
        <DashboardIcon sx={{ fontSize: 40 }} />
        Admin Dashboard
      </Typography>

      {/* --------- NAVIGATION GRID --------- */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ maxWidth: 800, margin: "0 auto" }}
      >
        {/* CATEGORIES */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: "pointer",
              borderRadius: 2,
              transition: "0.2s",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onClick={() => navigate("categories")}
          >
            <CategoryIcon
              sx={{ fontSize: 50, mb: 1, color: "primary.main" }}
            />
            <Typography variant="h6">Categories</Typography>
          </Paper>
        </Grid>

        {/* CUSTOMERS */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: "pointer",
              borderRadius: 2,
              transition: "0.2s",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onClick={() => navigate("customers")}
          >
            <PeopleIcon
              sx={{ fontSize: 50, mb: 1, color: "primary.main" }}
            />
            <Typography variant="h6">Customers</Typography>
          </Paper>
        </Grid>

        {/* PRODUCTS */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: "pointer",
              borderRadius: 2,
              transition: "0.2s",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onClick={() => navigate("products")}
          >
            <InventoryIcon
              sx={{ fontSize: 50, mb: 1, color: "primary.main" }}
            />
            <Typography variant="h6">Products</Typography>
          </Paper>
        </Grid>

        {/* STATISTICS */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: "pointer",
              borderRadius: 2,
              transition: "0.2s",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onClick={() => navigate("statistics")}
          >
            <BarChartIcon
              sx={{ fontSize: 50, mb: 1, color: "primary.main" }}
            />
            <Typography variant="h6">Statistics</Typography>
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

/*
  Prevents unnecessary rerenders when navigating
*/
export default memo(Admin);
