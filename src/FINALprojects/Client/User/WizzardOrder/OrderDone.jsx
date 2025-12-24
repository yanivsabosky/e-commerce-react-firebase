// THis Section Is Handling The Perches  Of The User
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../Store/authSlice";
import { useCallback } from "react";
function OrderDone() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Give The User Info That His Order Is Completed Successfully  
  const handleFinishOrder = useCallback(() => {
    dispatch(Logout());
    navigate("/");
  },[dispatch, navigate]);

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Order Completed
      </Typography>

      <Typography color="text.secondary" mb={2}>
        Your order was saved successfully.
      </Typography>

      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained" onClick={handleFinishOrder}>
          Back to Login
        </Button>
      </Stack>
    </Box>
  );
}

export default OrderDone;



