import React, { useEffect, useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { listItems: [], cartItems: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.listItems.concat(action.item);
    const cartItem = state.cartItems;
    const amt = state.totalAmount;
    const obj = {
      ...state,
      listItems: updatedItems,
    };
    if (state.listItems.length === 0) {
      const postData = async () => {
        const response = await fetch(
          "https://shoe-commerce-e965d-default-rtdb.firebaseio.com/products.json",
          {
            method: "POST",
            body: JSON.stringify(obj),
            header: {
              "Context-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        localStorage.setItem("key", data.name);
        
      };
      postData();
    } else {
      const key = localStorage.getItem("key");
      const putData = async () => {
        const response = await fetch(
          "https://shoe-commerce-e965d-default-rtdb.firebaseio.com/products/" +
            key +
            "/" +
            ".json",
          {
            method: "PUT",
            body: JSON.stringify(obj),
            header: {
              "Context-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
      };
      putData();
    }

    return {
      ...state,
      listItems: updatedItems,
    };
  }

  if (action.type === "UPDATE") {
    const existingItemIndex = state.listItems.findIndex((item) => {
      return item.itemName === action.id;
    });

    const existingItem = state.listItems[existingItemIndex];
    const existingCartItem = state.cartItems[existingItemIndex];
    const amt = state.totalAmount + 1;
    let updatedItems = [];
    let updateCartItems = [];

    if (existingCartItem) {
      const updateCartItem = {
        ...existingCartItem,
        [action.target]: existingCartItem[action.target] + 1,
      };
      updateCartItems = [...state.cartItems];
      updateCartItems[existingItemIndex] = updateCartItem;
    } else {
      if (action.target === "itemSizeS") {
        const newExistingItem = {
          ...existingItem,
          [action.target]: 1,
          itemSizeM: 0,
          itemSizeL: 0,
        };
        updateCartItems = state.cartItems.concat(newExistingItem);
      } else if (action.target === "itemSizeM") {
        const newExistingItem = {
          ...existingItem,
          [action.target]: 1,
          itemSizeS: 0,
          itemSizeL: 0,
        };
        updateCartItems = state.cartItems.concat(newExistingItem);
      } else {
        const newExistingItem = {
          ...existingItem,
          [action.target]: 1,
          itemSizeS: 0,
          itemSizeM: 0,
        };
        updateCartItems = state.cartItems.concat(newExistingItem);
      }
    }

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        [action.target]: existingItem[action.target] - 1,
      };

      updatedItems = [...state.listItems];

      updatedItems[existingItemIndex] = updatedItem;
    }
    const putData = async () => {
      const key = localStorage.getItem("key");
      const response = await fetch(
        "https://shoe-commerce-e965d-default-rtdb.firebaseio.com/products/" +
          key +
          "/" +
          ".json",
        {
          method: "PUT",
          body: JSON.stringify({
            listItems: updatedItems,
            cartItems: updateCartItems,
            totalAmount: amt,
          }),
          header: {
            "Context-Type": "application/json",
          },
        }
      );
      const data = response.json();
      console.log(data);
    };
    putData();

    return {
      listItems: updatedItems,
      cartItems: updateCartItems,
      totalAmount: amt,
    };
  }
  if (action.type === "LOAD") {
    
    return action.item
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );
  useEffect(()=>{
    const fetchData = async () => {
      const response = await fetch(
        "https://shoe-commerce-e965d-default-rtdb.firebaseio.com/products.json"
      );
      const data = await response.json();
      const key=localStorage.getItem("key")
      const item = Object.entries(data)[0][1]
      // console.log(Object.entries(data)[0][1])
      dispatchCartState({ type: "LOAD",item: item });
    };
    fetchData();

    
    
  },[])
  const addItemToCartHandler = (itemobj) => {
    dispatchCartState({ type: "ADD", item: itemobj });
  };
  const addItemsAddedToCartHandler = () => {};
  const updateItemFromCartHandler = (id, target) => {
    dispatchCartState({ type: "UPDATE", id: id, target: target });
  };
  const addItemHandler = () => {
    dispatchCartState({ type: "LOAD" });
  };
  const cartContext = {
    listItems: cartState.listItems,
    totalAmount: cartState.totalAmount,
    cartItems: cartState.cartItems,
    addItemsAdded: addItemsAddedToCartHandler,
    addItem: addItemToCartHandler,
    updateItem: updateItemFromCartHandler,
    addtodb: addItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
