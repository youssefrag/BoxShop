import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const PaymentDisabled = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Alert severity="warning" sx={{ mb: 2 }}>
        Payment buttons disabled for live Demo!
      </Alert>
    </Box>
  );
};
