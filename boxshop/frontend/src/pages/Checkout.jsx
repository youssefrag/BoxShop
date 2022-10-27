import { useState } from "react";

import { Button, Container, Stack, Typography } from "@mui/material";

import { Shipping } from "../components/Shipping";
import { PlaceOrder } from "../components/PlaceOrder";

import { styled } from "@mui/material/styles";

const StyledPageButton = styled(Button)(({ theme }) => ({
  fontSize: "1.2rem",
  backgroundColor: "primary",
}));

export const Checkout = () => {
  const [page, setPage] = useState("shipping");

  // Handle Shipping address

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [missingField, setMissingField] = useState(false);

  const continueToPlaceOrder = () => {
    if (
      !shipping.address ||
      !shipping.city ||
      !shipping.postalCode ||
      !shipping.country
    ) {
      setMissingField(true);
      return;
    }
    setMissingField(false);
    setPage("placeOrder");
  };

  const renderMainPage = () => {
    if (page === "shipping") {
      return (
        <Shipping
          shipping={shipping}
          setShipping={setShipping}
          continueToPayment={continueToPlaceOrder}
          missingField={missingField}
        />
      );
    } else if (page === "placeOrder") {
      return <PlaceOrder shipping={shipping} />;
    }
  };

  return (
    <Container>
      <Stack
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ paddingLeft: "5rem", paddingRight: "5rem", marginTop: "3rem" }}
      >
        {page === "shipping" ? (
          <StyledPageButton variant="contained">Shipping</StyledPageButton>
        ) : (
          <Button onClick={() => setPage("shipping")}>Shipping</Button>
        )}

        {page === "placeOrder" ? (
          <StyledPageButton variant="contained" disabled>
            Order Details
          </StyledPageButton>
        ) : (
          <Button onClick={() => setPage("placeOrder")}>Order Details</Button>
        )}
      </Stack>
      {renderMainPage()}
    </Container>
  );
};
