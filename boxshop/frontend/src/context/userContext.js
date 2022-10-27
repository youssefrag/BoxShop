import { createContext, useState } from "react";

import Cookies from "js-cookie";

const defaultState = {
  userEmail: Cookies.get("user_email"),
  name: Cookies.get("user"),
  setUserEmail: () => {},
  setName: () => {},
};

export const UserContext = createContext(defaultState);

export const UserContextProvider = (props) => {
  const { cart, setCart, cartCount, setCartCount } = props;

  const [userContextName, setUserContextName] = useState(defaultState.name);
  const [userContextEmail, setuserContextEmail] = useState(
    defaultState.userEmail
  );
  const [searchQuery, setSearchQuery] = useState("");

  const setName = (name) => {
    if (name) {
      Cookies.set("user", name);
    } else {
      Cookies.remove("user");
    }
    setUserContextName(name);
  };

  const setUserEmail = (userEmail) => {
    if (userEmail) {
      Cookies.set("user_email", userEmail);
    } else {
      Cookies.remove("user_email");
    }
    setuserContextEmail(userEmail);
  };

  return (
    <UserContext.Provider
      value={{
        userContextName,
        setName,
        userContextEmail,
        setUserEmail,
        isUserLoggedIn: props.isUserLoggedIn,
        setUserLoggedIn: props.setUserLoggedIn,
        isAdmin: props.isAdmin,
        setAdmin: props.setAdmin,
        searchQuery,
        setSearchQuery,
        cart,
        setCart,
        cartCount,
        setCartCount,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
