import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const MissingField = () => {
  return (
    <Box sx={{ width: "60%" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        Please fill out all the required fields
      </Alert>
    </Box>
  );
};
