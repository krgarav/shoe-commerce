import React, { useContext, useState } from "react";
import "./App.css";
import Cart from "./components/cart/Cart";
import CartButton from "./components/cart/CartButton";
import InputItemForm from "./components/inputForm/InputItemForm";
import ListData from "./components/ListData/ListData";
import CartProvider from "./store/CartProvider";


function App() {
 
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const closeCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
     
      {cartIsShown && <Cart onClickClose={closeCartHandler} />}
      <div className="overall">
        <InputItemForm />
        <CartButton onClick={showCartHandler} />
      </div>
       <ListData />
    </CartProvider>
  );
}

export default App;
