import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

import Cookies from "js-cookie";

import { Button, Container, Stack, TextField, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import { PasswordsNotMatching } from "../components/messages/PasswordsNotMatching";
import { MissingField } from "../components/messages/MissingField";
import { EmailAlreadyExists } from "../components/messages/EmailAlreadyExists";
import { EmailDoesNotExist } from "../components/messages/EmailDoesNotExist";
import { EmailOrPasswordIncorrect } from "../components/messages/EmailOrPasswordIncorrect";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "80%",
  "& .MuiOutlinedInput-root": {
    background: theme.palette.primary.light,
  },
  "& .MuiInputBase-input": {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
}));

export const LoginRegister = () => {
  let navigate = useNavigate();

  const { setName, setUserEmail, setUserLoggedIn, setAdmin } =
    useContext(UserContext);

  const [page, setPage] = useState("login");

  const [alerts, setAlerts] = useState({
    passwordsNotMatching: false,
    missingField: false,
    emailAlreadyExists: false,
    emailDoesNotExist: false,
    emailOrPasswordIncorrect: false,
  });

  const resetAlerts = () => {
    setAlerts({
      emailAlreadyExists: false,
      passwordsNotMatching: false,
      missingField: false,
      emailDoesNotExist: false,
      emailOrPasswordIncorrect: false,
    });
  };

  // Handle Login data

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const resetLoginData = () => {
    setUserLogin({
      email: "",
      password: "",
    });
  };

  const handleLoginChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLogin((prev) => ({ ...userLogin, [name]: value }));
  };

  const handleLoginSubmit = async () => {
    const { email, password } = userLogin;
    if (!email || !password) {
      setAlerts({ missingField: true, emailDoesNotExist: false });
      return;
    }
    let response = await fetch("base/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    });
    let result = await response.json();
    if (result.detail === "User with this email does not exist") {
      setAlerts({
        missingField: false,
        emailOrPasswordIncorrect: false,
        emailDoesNotExist: true,
      });
      return;
    } else if (result.detail === "Email or password incorrect") {
      setAlerts({
        missingField: false,
        emailDoesNotExist: false,
        emailOrPasswordIncorrect: true,
      });
      return;
    }
    if (result.id) {
      setName(result.first_name);
      setUserEmail(result.username);
      setUserLoggedIn(true);
      if (result.is_superuser) {
        setAdmin(true);
        Cookies.set("isAdmin", true);
      }
      navigate("/");
    }
  };

  // Handle Register Data

  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const resetRegisterData = () => {
    setUserRegister({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleRegisterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegister((prev) => ({ ...userRegister, [name]: value || "" }));
  };

  const handleRegisterSubmit = async () => {
    const { name, email, password, confirmPassword } = userRegister;
    if (!name || !email || !password || !confirmPassword) {
      setAlerts({
        emailAlreadyExists: false,
        passwordsNotMatching: false,
        missingField: true,
      });
      return;
    } else if (password !== confirmPassword) {
      setAlerts({
        emailAlreadyExists: false,
        missingField: false,
        passwordsNotMatching: true,
      });
      return;
    }
    let response = await fetch("base/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegister),
    });
    let result = await response.json();
    if (result.detail === "User with this email already exists") {
      setAlerts({ ...alerts, emailAlreadyExists: true });
    }
    if (result.id) {
      setName(name);
      setUserEmail(email);
      setUserLoggedIn(true);
      navigate("/");
    }
  };

  const handlePageSwitch = () => {
    if (page === "login") {
      setPage("register");
      resetAlerts();
      resetRegisterData();
    } else if (page === "register") {
      setPage("login");
      resetAlerts();
      resetLoginData();
    }
  };

  if (page === "login") {
    return (
      <Container margintop={9} maxWidth="sm">
        <Stack spacing={6} alignItems="flex-start">
          <Typography variant="h2" marginTop={6}>
            Sign in
          </Typography>
          {alerts.missingField ? <MissingField /> : <></>}
          {alerts.emailDoesNotExist ? <EmailDoesNotExist /> : <></>}
          {alerts.emailOrPasswordIncorrect ? (
            <EmailOrPasswordIncorrect />
          ) : (
            <></>
          )}
          <StyledTextField
            placeholder="Enter Email Address"
            name="email"
            value={userLogin.email || ""}
            onChange={handleLoginChange}
          />
          <StyledTextField
            type="password"
            placeholder="Enter Password"
            name="password"
            value={userLogin.password}
            onChange={handleLoginChange}
          />
          <Button variant="contained" size="large" onClick={handleLoginSubmit}>
            Sign in
          </Button>

          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => handlePageSwitch()}
          >
            New Customer? Register
          </Typography>
        </Stack>
      </Container>
    );
  } else if (page === "register") {
    return (
      <Container margintop={9} maxWidth="sm">
        <Stack spacing={6} alignItems="flex-start">
          <Typography variant="h2" marginTop={6}>
            Register
          </Typography>
          {alerts.passwordsNotMatching ? <PasswordsNotMatching /> : <></>}
          {alerts.missingField ? <MissingField /> : <></>}
          {alerts.emailAlreadyExists ? <EmailAlreadyExists /> : <></>}
          <StyledTextField
            placeholder="Enter Name"
            name="name"
            value={userRegister.name || ""}
            onChange={handleRegisterChange}
          />
          <StyledTextField
            placeholder="Enter Email Address"
            name="email"
            value={userRegister.email || ""}
            onChange={handleRegisterChange}
          />
          <StyledTextField
            type="password"
            placeholder="Enter Password"
            name="password"
            value={userRegister.password || ""}
            onChange={handleRegisterChange}
          />
          <StyledTextField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={userRegister.confirmPassword || ""}
            onChange={handleRegisterChange}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleRegisterSubmit}
          >
            Register
          </Button>
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => handlePageSwitch()}
          >
            Already have an account? Sign in
          </Typography>
        </Stack>
      </Container>
    );
  }
};
