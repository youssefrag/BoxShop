import Cookies from "js-cookie";

export const createCartCookie = (id, quantity) => {
  Cookies.set(id, quantity);
};

export const addToExistingCookie = (id, quantity) => {
  const existingQuantity = Cookies.get(id);
  Cookies.remove(id);
  const newQuantity = Number(existingQuantity) + Number(quantity);

  Cookies.set(id, newQuantity);
};

export const removeItemFromCart = (id) => {
  Cookies.remove(id);
};

export const getExistingCart = () => {
  const cookiesString = document.cookie;
  const cookieArray = cookiesString.split("=").join(";").split(";");
  const newCart = [];
  for (let i = 0; i < cookieArray.length; i++) {
    if (i % 2 === 0) {
      if (cookieArray[i][0] === " ") {
        cookieArray[i] = cookieArray[i].slice(1, cookieArray[i].length);
      }
      if (cookieArray[i].length === 36) {
        const newCartItem = {
          id: cookieArray[i],
          quantity: Number(cookieArray[i + 1]),
        };
        newCart.push(newCartItem);
      }
    }
  }
  return newCart;
};

export const countCartItems = (cart) => {
  let totalCount = 0;
  for (let i = 0; i < cart.length; i++) {
    totalCount += cart[i].quantity;
  }
  return totalCount;
};
