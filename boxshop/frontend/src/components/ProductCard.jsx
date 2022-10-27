import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Stack,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  border: "1px solid",
  borderColor: "primary.main",
  cursor: "pointer",
}));

export const ProductCard = (props) => {
  let navigate = useNavigate();

  return (
    <StyledCard onClick={() => navigate(`/product/${props.id}`)}>
      <Stack justifyContent="space-between">
        <Box sx={{ height: "350px", display: "flex", alignItems: "center" }}>
          <CardMedia
            component="img"
            height="200"
            image={props.imageLink}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
        <Stack flexDirection="row">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              marginBottom={4}
            >
              {props.brand}
            </Typography>
            <Stack flexDirection="row" gap={4} marginBottom={5}>
              <Rating
                name="half-rating-read"
                value={Number(props.rating)}
                precision={0.5}
                readOnly
              />
              <Typography>{props.numReviews} ratings</Typography>
            </Stack>
            <Typography variant="h5">{props.price}$</Typography>
          </CardContent>
        </Stack>
      </Stack>
    </StyledCard>
  );
};
