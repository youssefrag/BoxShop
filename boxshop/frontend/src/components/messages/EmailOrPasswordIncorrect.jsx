import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const EmailOrPasswordIncorrect = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        Email or password incorrect
      </Alert>
    </Box>
  );
};
