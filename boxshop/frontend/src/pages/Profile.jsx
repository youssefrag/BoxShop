import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { MissingField } from "../components/messages/MissingField";

import { EmailAlreadyExists } from "../components/messages/EmailAlreadyExists";

import { UserUpdated } from "../components/messages/UserUpdated";

import { MyOrders } from "../components/MyOrders";

import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
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
  color: theme.palette.primary,
  fontSize: "1rem",
  padding: theme.spacing(4),
  borderRadius: "9px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
  },
}));

export const Profile = () => {
  const { userContextName, setName, userContextEmail, setUserEmail } =
    useContext(UserContext);

  const [alerts, setAlerts] = useState({
    missingField: false,
    emailAlreadyExists: false,
    userUpdated: false,
  });

  //   Handle update user information
  const [userData, setUserData] = useState({
    name: userContextName,
    email: userContextEmail,
  });

  const handleUserChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData((prev) => ({ ...userData, [name]: value || "" }));
  };

  const handleUpdateSubmit = async () => {
    const { name, email } = userData;
    if (!name || !email) {
      setAlerts({
        emailAlreadyExists: false,
        missingField: true,
      });
      return;
    }
    let response = await fetch(`base/user-update/${userContextEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    let result = await response.json();
    if (result.detail === "This email is used by another user") {
      console.log("email already in use");
      setAlerts({ missingField: false, emailAlreadyExists: true });
      return;
    }
    setAlerts({
      missingField: false,
      emailAlreadyExists: false,
      userUpdated: true,
    });
    setUserEmail(result.email);
    setName(result.name);
  };

  return (
    <Container>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <Typography variant="h4" marginTop={7} marginBottom={5}>
            USER PROFILE
          </Typography>
          <Box marginBottom={6}>
            {alerts.missingField ? <MissingField /> : <></>}
            {alerts.emailAlreadyExists ? <EmailAlreadyExists /> : <></>}
            {alerts.userUpdated ? <UserUpdated /> : <></>}
          </Box>
          <Stack spacing={6} alignItems="flex-start">
            <StyledTextField
              placeholder="Enter Name"
              name="name"
              value={userData.name || ""}
              onChange={handleUserChange}
            />
            <StyledTextField
              placeholder="Enter Email Address"
              name="email"
              value={userData.email || ""}
              onChange={handleUserChange}
            />
            <StyledButton onClick={handleUpdateSubmit}>
              Update user
            </StyledButton>
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <MyOrders />
        </Grid>
      </Grid>
    </Container>
  );
};
