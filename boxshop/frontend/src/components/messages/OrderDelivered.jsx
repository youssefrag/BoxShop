import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const OrderDelivered = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="success" sx={{ mb: 2 }}>
        Order has been delivered!
      </Alert>
    </Box>
  );
};
