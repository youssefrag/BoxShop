import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const OutOfStock = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        Item is out of stock
      </Alert>
    </Box>
  );
};
