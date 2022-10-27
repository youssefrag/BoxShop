import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import { OrderDelivered } from "../components/messages/OrderDelivered";
import { OrderNotDelivered } from "../components/messages/OrderNotDelivered";
import { OrderPaid } from "../components/messages/OrderPaid";
import { OrderNotPaid } from "../components/messages/OrderNotPaid";
import { PaymentDisabled } from "../components/messages/PaymentDisabled";

export const OrderDetails = () => {
  const { orderId } = useParams();

  const [orderItems, setOrderItems] = useState({});

  const [delivered, setDelivered] = useState(false);
  const [paid, setPaid] = useState(false);

  const getOrderDetails = async () => {
    let response = await fetch(`base/order-details/${orderId}`);
    let data = await response.json();
    setOrderItems(data);
  };

  useEffect(() => {
    getOrderDetails();
    if (orderItems[0]) {
      if (orderItems[0].order.isPaid) {
        setPaid(true);
      }
      if (orderItems[0].order.isDelivered) {
        setDelivered(true);
      }
    }
  }, [orderItems.length]);

  let shippingAddressString = "";

  if (orderItems[0]) {
    shippingAddressString = orderItems[0].order.shippingAddress;
  }

  let renderOrderItems = [];

  if (orderItems.length > 0) {
    renderOrderItems = orderItems.map((item) => {
      const imageLink = item.product.image;

      return (
        <Stack
          key={item.id}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={imageLink} style={{ height: "90px", width: "90px" }} />
          </Box>
          <Box>
            <Typography variant="h6">{item.product.brand}</Typography>
            <Typography variant="h6">{item.product.name}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {item.quantity} X ${item.product.price} =$
              {item.quantity * item.product.price}
            </Typography>
          </Box>
        </Stack>
      );
    });
  } else {
    renderOrderItems = [];
  }

  return (
    <Container>
      <Typography variant="h3" marginTop={7}>
        ORDER DETAILS
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Stack marginTop={8} alignItems="flex-start">
            <Box
              sx={{
                borderBottom: "1px solid",
                padding: "30px",
                width: "100%",
              }}
            >
              <Typography color="primary.grey" variant="h4" marginBottom={5}>
                Delivery Status
              </Typography>
              <Typography
                color="primary.grey"
                variant="body1"
                marginBottom={5}
                sx={{ fontSize: "1.2rem" }}
              >
                {shippingAddressString}
              </Typography>
              {delivered ? <OrderDelivered /> : <OrderNotDelivered />}
            </Box>
            <Box
              sx={{
                borderBottom: "1px solid",
                padding: "30px",
                width: "100%",
              }}
            >
              <Typography color="primary.grey" variant="h4" marginBottom={5}>
                Payment Status
              </Typography>
              <Typography
                color="primary.grey"
                variant="body1"
                sx={{ fontSize: "1.2rem" }}
              >
                {paid ? <OrderPaid /> : <OrderNotPaid />}
              </Typography>
            </Box>
            <Box sx={{ padding: "30px", width: "100%" }}>
              <Typography color="primary.grey" variant="h4" marginBottom={5}>
                ORDER ITEMS
              </Typography>
              {renderOrderItems}
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Box
            marginTop={8}
            marginLeft={11}
            sx={{ border: "1px solid black", padding: "20px" }}
          >
            <Typography color="primary.grey" variant="h5">
              ORDER SUMMARY
            </Typography>
          </Box>
          <Box
            marginLeft={11}
            sx={{ border: "1px solid black", padding: "20px" }}
          >
            <Stack flexDirection="row" justifyContent="space-between">
              <Typography
                sx={{ fontSize: "1.2rem" }}
                color="primary.grey"
                variant="body1"
              >
                Items:
              </Typography>
              <Typography
                sx={{ fontSize: "1.2rem" }}
                color="primary.grey"
                variant="body1"
              >
                {orderItems[0]
                  ? (Math.round(orderItems[0].order.totalPrice / 1.12 - 15) *
                      100) /
                    100
                  : 0}
                $
              </Typography>
            </Stack>
          </Box>
          <Box
            marginLeft={11}
            sx={{ border: "1px solid black", padding: "20px" }}
          >
            <Stack flexDirection="row" justifyContent="space-between">
              <Typography
                sx={{ fontSize: "1.2rem" }}
                color="primary.grey"
                variant="body1"
              >
                Shipping:
              </Typography>
              <Typography
                sx={{ fontSize: "1.2rem" }}
                color="primary.grey"
                variant="body1"
              >
                15$
              </Typography>
            </Stack>
          </Box>
          <Box
            marginLeft={11}
            sx={{ border: "1px solid black", padding: "20px" }}
          >
            <Stack flexDirection="row" justifyContent="space-between">
              <Typography
                sx={{ fontSize: "1.2rem" }}
                color="primary.grey"
                variant="body1"
              >
                Tax (12%):
              </Typography>
              <Typography
                sx={{ fontSize: "1.2rem" }}
                color="primary.grey"
                variant="body1"
              >
                {orderItems[0]
                  ? Math.round(
                      ((orderItems[0].order.totalPrice -
                        orderItems[0].order.totalPrice / 1.12) *
                        100) /
                        100
                    )
                  : 0}
                $
              </Typography>
            </Stack>
          </Box>
          <Box
            marginLeft={11}
            sx={{
              borderTop: "1px solid black",
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
              padding: "20px",
            }}
          >
            <Stack flexDirection="row" justifyContent="space-between">
              <Typography
                sx={{ fontSize: "1.2rem" }}
                color="primary.grey"
                variant="body1"
              >
                Total:
              </Typography>
              <Typography
                sx={{ fontSize: "1.2rem" }}
                color="primary.grey"
                variant="body1"
              >
                {orderItems[0] ? orderItems[0].order.totalPrice : 0}$
              </Typography>
            </Stack>
          </Box>
          <Box
            marginLeft={11}
            padding={11}
            sx={{
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
              padding: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PaymentDisabled />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
