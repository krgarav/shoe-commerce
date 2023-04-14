import React from "react";
const CartContext = React.createContext({
  listItems: [],
  totalAmount: 0,
  cartItems: [],
  addItemsAdded: () => {},
  addItem: () => {},
  updateItem: () => {},
});
export default CartContext;
