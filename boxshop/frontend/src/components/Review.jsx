import { Rating, Typography, Stack } from "@mui/material";

import { styled } from "@mui/material/styles";

const StyledStack = styled(Stack)(({ theme }) => ({
  borderBottom: "1px solid black",
  width: "50%",
}));

export const Review = (props) => {
  const { name, rating, date, comment } = props;
  return (
    <StyledStack>
      <Typography variant="h5" marginBottom={4} marginTop={6}>
        {name}
      </Typography>
      <Rating
        name="half-rating-read"
        value={Number(rating)}
        precision={0.5}
        readOnly
      />
      <Typography marginTop={4}>{date.slice(0, 10)}</Typography>
      <Typography marginTop={4} marginBottom={7}>
        {comment}
      </Typography>
    </StyledStack>
  );
};
