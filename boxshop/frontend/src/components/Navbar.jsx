import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

import Cookies from "js-cookie";

import { useNavigate, useLocation } from "react-router-dom";

import { countCartItems } from "./cart";

import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Stack,
} from "@mui/material";

import { NavDropdown } from "./NavDropdown";
import { AdminDropDown } from "./AdminDropDown";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(8),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  margin: 0,
}));

const Search = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "theme.shape.borderRadius",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "& .MuiSvgIcon-root": {
    width: "2rem",
    height: "2rem",
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  fontSize: "1.5rem",
  fontWeight: 700,
  "& .MuiInputBase-input": {
    color: "primary",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(6)})`,
    paddingRight: "2rem",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "26ch",
      },
    },
  },
}));

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const StyledShoppingCartIcon = styled(ShoppingCartIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const StyledLoginIcon = styled(LoginIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const Navbar = () => {
  let navigate = useNavigate();

  const location = useLocation();

  const {
    setName,
    setUserEmail,
    isUserLoggedIn,
    setUserLoggedIn,
    searchQuery,
    setSearchQuery,
    isAdmin,
    setAdmin,
    cartCount,
  } = useContext(UserContext);

  const [navdropdown, setNavdropdown] = useState(null);

  const handleOpenNavdropdown = (event) => {
    setNavdropdown(event.currentTarget);
  };

  const [adminDropDown, setAdminDropDown] = useState(null);

  const handleOpenAdminDropDown = (event) => {
    setAdminDropDown(event.currentTarget);
  };

  const handleLogout = () => {
    fetch("base/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setName();
      setUserEmail();
      setUserLoggedIn(false);
      setAdmin(false);
      Cookies.remove("isAdmin");
    });
  };

  const displayAdminPanel = () => {
    if (isAdmin) {
      return (
        <AdminDropDown
          adminDropDown={adminDropDown}
          setAdminDropDown={setAdminDropDown}
          handleOpenAdminDropDown={handleOpenAdminDropDown}
        />
      );
    }
  };

  const loginLogout = () => {
    if (isUserLoggedIn) {
      return (
        <NavDropdown
          navdropdown={navdropdown}
          handleOpenNavdropdown={handleOpenNavdropdown}
          setNavdropdown={setNavdropdown}
          handleLogout={handleLogout}
        />
      );
    } else {
      return (
        <Stack
          direction="row"
          spacing={2}
          onClick={() => navigate("login-register")}
          sx={{ cursor: "pointer" }}
        >
          <StyledLoginIcon />
          <Typography variant="h5" color="grey.light">
            Login
          </Typography>
        </Stack>
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar color="grey" position="static" elevation={4}>
        <StyledToolBar>
          <Typography
            color="grey.light"
            variant="logo"
            noWrap
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            BoxShop
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="primary" size="large" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search products"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
            />
          </Search>
          <Stack direction="row" spacing={6}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              onClick={() => navigate("/cart")}
              sx={{
                cursor: "pointer",
              }}
            >
              <StyledShoppingCartIcon />
              <Typography variant="h5" color="grey.light">
                Cart ({Number(cartCount)})
              </Typography>
            </Stack>
            {loginLogout()}
            {displayAdminPanel()}
          </Stack>
        </StyledToolBar>
      </StyledAppBar>
    </Box>
  );
};
