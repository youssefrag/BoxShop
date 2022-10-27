import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";

import { useNavigate } from "react-router-dom";

import { Button, Rating, Stack, TextField, Typography } from "@mui/material";

import { MissingRating } from "./messages/MissingRating";
import { ExistingReview } from "./messages/ExistingReview";

import { styled } from "@mui/material/styles";

const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  "& .MuiRating-root": {
    fontSize: "2.5rem",
  },
}));

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

export const WriteReview = (props) => {
  let navigate = useNavigate();

  const { productId } = props;

  const [rating, setRating] = useState(null);

  const [comment, setComment] = useState("");

  const [alerts, setAlerts] = useState({
    missingRating: false,
    existingReview: false,
  });

  const { userContextEmail, isUserLoggedIn } = useContext(UserContext);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitReview = async () => {
    if (!isUserLoggedIn) {
      navigate("/login-register");
      return;
    }
    if (rating === null) {
      setAlerts({ ...alerts, missingRating: true });
      return;
    }
    let response = await fetch(`base/review/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rating,
        comment: comment,
        userEmail: userContextEmail,
      }),
    });
    let result = await response.json();
    if (result.detail === "You have already posted a review for this product") {
      setAlerts({ missingRating: false, existingReview: true });
    }
    if (result.detail === "Review succesfuly added") {
      window.location.reload();
    }
  };

  return (
    <StyledStack>
      <Typography variant="h4" marginBottom={4}>
        WRITE A REVIEW
      </Typography>
      {alerts.missingRating ? <MissingRating /> : <></>}
      {alerts.existingReview ? <ExistingReview /> : <></>}
      <Typography variant="h6" marginBottom={3}>
        Rating
      </Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <Typography variant="h6" marginBottom={3} marginTop={6}>
        Comment
      </Typography>
      <TextField
        multiline
        minRows={2}
        maxRows={4}
        onChange={handleCommentChange}
      ></TextField>
      <StyledButton onClick={handleSubmitReview}>Add Review</StyledButton>
    </StyledStack>
  );
};
