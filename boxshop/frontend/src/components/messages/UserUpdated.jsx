import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const UserUpdated = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="success" sx={{ mb: 2 }}>
        User was succesfully updated!
      </Alert>
    </Box>
  );
};
