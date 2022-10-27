import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const PasswordsNotMatching = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        Passwords are not matching
      </Alert>
    </Box>
  );
};
