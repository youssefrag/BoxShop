import { useState, useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";

import { getExistingCart, countCartItems } from "./components/cart";

import { Navbar } from "./components/Navbar";

import { LoginRegister } from "./pages/LoginRegister";
import { Products } from "./pages/Products";
import { Cart } from "./pages/Cart";
import { Profile } from "./pages/Profile";
import { AdminNewProduct } from "./pages/AdminNewProduct";

import { ThemeProvider } from "@mui/material/styles";
import { MainTheme } from "./Theme/theme";

import Cookies from "js-cookie";
import { ProductDetails } from "./pages/ProductDetails";
import { Checkout } from "./pages/Checkout";
import { OrderDetails } from "./pages/OrderDetails";
import { AdminProducts } from "./pages/AdminProducts";
import { AdminOrders } from "./pages/AdminOrders";

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  const [isAdmin, setAdmin] = useState(false);

  const [cart, setCart] = useState();

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (Cookies.get("user")) {
      setUserLoggedIn(true);
    }
    if (Cookies.get("isAdmin")) {
      setAdmin(true);
    }
  }, [Cookies.get("user")]);

  useEffect(() => {
    setCart(getExistingCart());
    setCartCount(countCartItems(getExistingCart()));
  }, [cartCount]);

  return (
    <HashRouter>
      <ThemeProvider theme={MainTheme}>
        <UserContextProvider
          isUserLoggedIn={isUserLoggedIn}
          setUserLoggedIn={setUserLoggedIn}
          isAdmin={isAdmin}
          setAdmin={setAdmin}
          cart={cart}
          setCart={setCart}
          cartCount={cartCount}
          setCartCount={setCartCount}
        >
          <Navbar />

          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/login-register" element={<LoginRegister />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/profile"
              element={isUserLoggedIn ? <Profile /> : <LoginRegister />}
            />
            <Route
              path="/checkout"
              element={isUserLoggedIn ? <Checkout /> : <LoginRegister />}
            />
            <Route
              path="/orders/:orderId"
              element={isUserLoggedIn ? <OrderDetails /> : <LoginRegister />}
            />
            <Route
              path="/admin/products"
              element={isAdmin ? <AdminProducts /> : <LoginRegister />}
            />
            <Route
              path="/admin/new-product"
              element={isAdmin ? <AdminNewProduct /> : <LoginRegister />}
            />
            <Route
              path="/admin/orders"
              element={isAdmin ? <AdminOrders /> : <LoginRegister />}
            />
          </Routes>
        </UserContextProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
