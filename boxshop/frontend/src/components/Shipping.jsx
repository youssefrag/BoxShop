import { Button, Stack, TextField, Typography } from "@mui/material";

import { MissingField } from "./messages/MissingField";

import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "60%",
  "& .MuiOutlinedInput-root": {
    background: theme.palette.primary.light,
  },
  "& .MuiInputBase-input": {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.dark,
  fontSize: "1rem",
  padding: theme.spacing(2),
  borderRadius: "9px",
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
  },
}));

export const Shipping = (props) => {
  const { shipping, setShipping, missingField, continueToPayment } = props;

  const handleShippingChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setShipping((prev) => ({ ...shipping, [name]: value }));
  };

  return (
    <Stack marginTop={8} marginLeft={12} gap={6} alignItems="flex-start">
      <Typography variant="h3">SHIPPING</Typography>
      {missingField ? <MissingField /> : <></>}
      <StyledTextField
        type="text"
        placeholder="Enter Address"
        name="address"
        label="Address"
        value={shipping.address || ""}
        onChange={handleShippingChange}
      />
      <StyledTextField
        type="text"
        placeholder="Enter City"
        name="city"
        label="City"
        value={shipping.city}
        onChange={handleShippingChange}
      />
      <StyledTextField
        type="text"
        placeholder="Enter Postal Code"
        name="postalCode"
        label="Postal Code"
        value={shipping.postalCode}
        onChange={handleShippingChange}
      />
      <StyledTextField
        type="text"
        placeholder="Enter Country"
        name="country"
        label="Country"
        value={shipping.country}
        onChange={handleShippingChange}
      />
      <StyledButton onClick={() => continueToPayment()}>
        Save shipping Address
      </StyledButton>
    </Stack>
  );
};
