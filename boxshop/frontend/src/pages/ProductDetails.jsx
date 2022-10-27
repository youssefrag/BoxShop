import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";

import {
  Button,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import { SelectQuantity } from "../components/SelectQuantity";
import { OutOfStock } from "../components/messages/OutOfStock";
import { Review } from "../components/Review";
import { WriteReview } from "../components/WriteReview";

import { styled } from "@mui/material/styles";

import {
  createCartCookie,
  addToExistingCookie,
  getExistingCart,
} from "../components/cart";

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

const StyledStack = styled(Stack)(({ theme }) => ({
  border: "1px solid black",
  padding: theme.spacing(5),
  gap: theme.spacing(5),
}));

export const ProductDetails = () => {
  let navigate = useNavigate();

  const { setCart, setCartCount } = useContext(UserContext);

  const { id } = useParams();

  const [details, setDetails] = useState({});

  const [reviews, setReviews] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const getProductDetails = async () => {
    let response = await fetch(`base/product-details/${id}`);
    let data = await response.json();
    setDetails(data);
  };

  const getReviews = async () => {
    let response = await fetch(`base/reviews/${id}`);
    let data = await response.json();
    setReviews(data);
  };

  useEffect(() => {
    getProductDetails();
    getReviews();
  }, []);

  let renderReviews = [];

  renderReviews = reviews.map((review) => {
    return (
      <Review
        key={review.id}
        name={review.profile.name}
        rating={review.rating}
        date={review.createdAt}
        comment={review.comment}
      />
    );
  });

  // Handle Add To Cart

  const handleAddToCart = () => {
    let currentCart = getExistingCart();
    let newCart = [];
    for (let i = 0; i < currentCart.length; i++) {
      if (currentCart[i].id === id) {
        addToExistingCookie(id, quantity);
        newCart = getExistingCart();
        // console.log(newCart);
        setCart(newCart);
        setCartCount(newCart);
        return;
      }
    }
    createCartCookie(id, quantity);
    newCart = getExistingCart();

    setCart(newCart);
    setCartCount(newCart);
  };

  const imageLink = details.image;
  return (
    <Container>
      <StyledButton onClick={() => navigate("/")}>Go Back</StyledButton>
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <img src={imageLink} width="300px" />
        </Grid>
        <Grid item xs={4}>
          <Stack paddingRight={6}>
            <Typography variant="h3" marginBottom={4}>
              {details.name}
            </Typography>
            <Typography variant="h5" marginBottom={5}>
              {details.brand}
            </Typography>

            <Rating
              name="half-rating-read"
              value={Number(details.rating)}
              precision={0.5}
              readOnly
            />
            <Typography marginBottom={6}>
              {details.numReviews} ratings
            </Typography>
            <Typography variant="body1">{details.description}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <StyledStack>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              marginBottom={6}
            >
              <Typography variant="h6">Price</Typography>
              <Typography variant="h6">{details.price}$</Typography>
            </Stack>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              marginBottom={6}
            >
              <Typography variant="h6">Status:</Typography>
              {details.countInStock === 0 ? (
                <Typography variant="h6">Out of Stock</Typography>
              ) : (
                <Typography variant="h6">In stock</Typography>
              )}
            </Stack>
            {details.countInStock !== 0 ? (
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={6}
              >
                <Typography variant="h6">Quantity: </Typography>
                <SelectQuantity quantity={quantity} setQuantity={setQuantity} />
              </Stack>
            ) : (
              <></>
            )}
            {details.countInStock === 0 ? (
              <OutOfStock />
            ) : (
              <StyledButton onClick={() => handleAddToCart()}>
                Add to cart
              </StyledButton>
            )}
          </StyledStack>
        </Grid>
      </Grid>
      <Typography marginTop={7} marginBottom={7} variant="h3">
        Reviews
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs={8}>
          {renderReviews}
        </Grid>
        <Grid item xs={4}>
          <WriteReview productId={id} />
        </Grid>
      </Grid>
    </Container>
  );
};
