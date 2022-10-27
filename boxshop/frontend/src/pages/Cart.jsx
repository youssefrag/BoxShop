import { useState, useEffect, useContext } from "react";

import { UserContext } from "../context/userContext";

import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { CartItem } from "../components/CartItem";
import { EmptyCart } from "../components/messages/EmptyCart";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  color: theme.palette.primary,
  fontSize: "1rem",
  padding: theme.spacing(2),
  borderRadius: "9px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
  },
}));

export const Cart = () => {
  let navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [emptyCartAlert, setEmptyCardAlert] = useState(false);

  const { isUserLoggedIn, cart, setCart, cartCount, setCartCount } =
    useContext(UserContext);

  const getAllProducts = async () => {
    let response = await fetch("base/products/all");
    let data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getAllProducts();
    cartCount === 0 ? setEmptyCardAlert(true) : setEmptyCardAlert(false);
  }, [cart]);

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

  const getSubTotal = () => {
    let subTotal = 0;
    for (let i = 0; i < getCartItemsToDisplay().length; i++) {
      subTotal += getCartItemsToDisplay()[i].totalPrice;
    }
    return subTotal;
  };

  const renderCartItems = getCartItemsToDisplay().map((cartItem) => {
    return (
      <CartItem
        key={cartItem.id}
        id={cartItem.id}
        imageLink={cartItem.imageLink}
        name={cartItem.name}
        brand={cartItem.brand}
        totalPrice={cartItem.totalPrice}
        quantity={cartItem.quantity}
        setCart={setCart}
        setCartCount={setCartCount}
      />
    );
  });

  return (
    <Container maxWidth="lg">
      <StyledButton onClick={() => navigate("/")}>Go Back</StyledButton>
      <Grid container gap={10}>
        <Grid item xs={8}>
          <Typography variant="h3" marginTop={6} marginBottom={8}>
            SHOPPING CART
          </Typography>
          {emptyCartAlert ? <EmptyCart /> : <></>}
          {renderCartItems}
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ border: "1px solid", padding: "20px" }}>
            <Typography variant="h5" marginBottom={6}>
              SUBTOTAL ({cartCount}) ITEMS
            </Typography>
            <Typography
              sx={{ fontSize: "1.2rem" }}
              variant="body1"
              marginBottom={6}
            >
              ${getSubTotal()}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/checkout")}
              disabled={emptyCartAlert}
            >
              Proceed to checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
