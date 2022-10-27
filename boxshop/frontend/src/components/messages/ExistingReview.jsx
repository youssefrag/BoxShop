import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const ExistingReview = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        You have already posted a review for this product
      </Alert>
    </Box>
  );
};
