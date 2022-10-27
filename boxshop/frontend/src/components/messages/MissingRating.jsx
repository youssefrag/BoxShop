import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const MissingRating = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        Please add a rating to your review
      </Alert>
    </Box>
  );
};
