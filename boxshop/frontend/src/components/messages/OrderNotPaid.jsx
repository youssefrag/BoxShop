import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const OrderNotPaid = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        Order has been not been paid!
      </Alert>
    </Box>
  );
};
