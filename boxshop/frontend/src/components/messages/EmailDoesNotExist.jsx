import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const EmailDoesNotExist = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        Email does not exist
      </Alert>
    </Box>
  );
};
