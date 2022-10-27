import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const EmptyCart = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        Your Cart is empty!
      </Alert>
    </Box>
  );
};
