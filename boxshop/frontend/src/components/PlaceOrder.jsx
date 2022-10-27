import { useContext, useState, useEffect } from "react";

import { UserContext } from "../context/userContext";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getExistingCart, removeItemFromCart } from "./cart";

export const PlaceOrder = (props) => {
  let navigate = useNavigate();

  const { shipping } = props;

  const { cart, setCart, setCartCount, userContextEmail } =
    useContext(UserContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    let response = await fetch("base/products/all");
    let data = await response.json();
    setProducts(data);
  };

  const getCartItemsToDisplay = () => {
    let cartItemsArray = [];
    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < products.length; j++) {
          if (products[j].id === cart[i].id) {
            const cartItemObject = {};
            cartItemObject.id = products[j].id;
            cartItemObject.name = products[j].name;
            cartItemObject.brand = products[j].brand;
            cartItemObject.quantity = cart[i].quantity;
            cartItemObject.totalPrice = products[j].price * cart[i].quantity;
            cartItemObject.imageLink = products[j].image;
            cartItemsArray.push(cartItemObject);
          }
        }
      }
    }
    return cartItemsArray;
  };

  const getItemsPrice = () => {
    let itemsPrice = 0;
    for (let i = 0; i < getCartItemsToDisplay().length; i++) {
      itemsPrice += getCartItemsToDisplay()[i].totalPrice;
    }
    return itemsPrice;
  };

  const renderOrderItems = getCartItemsToDisplay().map((item) => {
    return (
      <Stack
        key={item.id}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={item.imageLink} style={{ height: "90px", width: "90px" }} />
        </Box>
        <Box>
          <Typography variant="h6">{item.brand}</Typography>
          <Typography variant="h6">{item.name}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">
            {item.quantity} X ${item.totalPrice / item.quantity} =$
            {item.totalPrice}
          </Typography>
        </Box>
      </Stack>
    );
  });

  const itemsPrice = getItemsPrice();

  const shippingPrice = 15;

  const taxPrice = Math.round((getItemsPrice() + 15) * 0.12 * 100) / 100;

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const shippingAddressString =
    shipping.address +
    ", " +
    shipping.city +
    ", " +
    shipping.country +
    ", " +
    shipping.postalCode;

  const handleCreateOrder = async () => {
    let body = {};
    body.user = userContextEmail;
    body.totalPrice = totalPrice;
    body.shippingAddress = shippingAddressString;

    const items = {};
    for (let i = 0; i < cart.length; i++) {
      let itemId = cart[i].id;
      let itemQuantity = cart[i].quantity;
      items[itemId] = itemQuantity;
      body.items = items;
    }
    let response = await fetch("base/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let result = await response.json();
    if (result.detail === "Order succesfuly created") {
      for (let i = 0; i < cart.length; i++) {
        removeItemFromCart(cart[i].id);
      }
      setCart(getExistingCart());
      setCartCount(cart);
      navigate("/profile");
    }
  };

  const handlePlaceOrder = () => {
    handleCreateOrder();
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Stack marginTop={8} alignItems="flex-start">
          <Box
            sx={{ borderBottom: "1px solid", padding: "30px", width: "100%" }}
          >
            <Typography color="primary.grey" variant="h4" marginBottom={5}>
              SHIPPING
            </Typography>
            <Typography
              color="primary.grey"
              variant="body1"
              sx={{ fontSize: "1.2rem" }}
            >
              {shippingAddressString}
            </Typography>
          </Box>
          <Box
            sx={{ borderBottom: "1px solid", padding: "30px", width: "100%" }}
          >
            <Typography color="primary.grey" variant="h4" marginBottom={5}>
              Payment Method
            </Typography>
            <Typography
              color="primary.grey"
              variant="body1"
              sx={{ fontSize: "1.2rem" }}
            >
              PayPal
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
              {itemsPrice}$
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
              {shippingPrice}$
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
              {taxPrice}$
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
              {totalPrice}$
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
          <Button
            variant="contained"
            size="large"
            sx={{ fontSize: "1.6rem" }}
            onClick={() => handlePlaceOrder()}
          >
            Submit order
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
