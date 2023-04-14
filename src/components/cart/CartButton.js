import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
const CartButton = (props) => {
  const cartCtx = useContext(CartContext);

  return (
    <div>
      <button onClick={props.onClick}>
        Cart <span> {cartCtx.totalAmount}</span>
      </button>
    </div>
  );
};
export default CartButton;
