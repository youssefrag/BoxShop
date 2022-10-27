import { useNavigate } from "react-router-dom";

import { removeItemFromCart, getExistingCart } from "./cart";

import { Box, Stack, Grid, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export const CartItem = (props) => {
  const {
    id,
    imageLink,
    brand,
    name,
    totalPrice,
    quantity,
    setCart,
    setCartCount,
  } = props;

  let navigate = useNavigate();

  const handleRemoveFromCart = () => {
    removeItemFromCart(id);
    const newCart = getExistingCart();
    setCart(newCart);
    setCartCount(newCart);
    return;
  };

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => navigate(`/product/${id}`)}
      >
        <img src={imageLink} style={{ height: "90px", width: "90px" }} />
      </Box>
      <Box>
        <Typography variant="h6">{brand}</Typography>
        <Typography variant="h6">{name}</Typography>
      </Box>
      <Box>
        <Typography variant="h6">X {quantity}</Typography>
      </Box>
      <Box>
        <Typography variant="h6">${totalPrice}</Typography>
      </Box>

      <DeleteIcon
        onClick={() => handleRemoveFromCart()}
        sx={{ cursor: "pointer" }}
      />
    </Stack>
  );
};
