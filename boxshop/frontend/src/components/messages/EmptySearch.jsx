import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const EmptySearch = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        No products match your search!
      </Alert>
    </Box>
  );
};
