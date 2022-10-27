import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const EmailAlreadyExists = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        Email already in use, please choose a different one
      </Alert>
    </Box>
  );
};
