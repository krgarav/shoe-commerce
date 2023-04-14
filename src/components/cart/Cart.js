import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../Modals/Modal";
import classes from "./Cart.module.css";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  let Total = 0;

  const items = cartCtx.cartItems.map((item) => {
    const aggregatePrice =
      item.itemPrice * (item.itemSizeS + item.itemSizeM + item.itemSizeL);

    Total += aggregatePrice;
    return (
      <li key={item.itemName}>
        <div className={classes.box}>
          <h3>{item.itemName}</h3>
          {item.itemSizeS > 0 && <p>${item.itemSizeS}S</p>}
          {item.itemSizeM > 0 && <p>${item.itemSizeM}M</p>}
          {item.itemSizeL > 0 && <p>${item.itemSizeL}L</p>}
          <p>{aggregatePrice}</p>
        </div>
      </li>
    );
  });

  return (
    <Modal onClickBackdrop={props.onClickClose}>
      <ul className={classes.ul}>{items}</ul>
      <div className={classes.box2}>
        <h2>Total </h2>
        <span>
          <h3>{Total}</h3>
        </span>
      </div>
      <div className={classes.buttonOrder}>
        <button onClick={props.onClickClose}>Place Order</button>
        <button onClick={props.onClickClose}>Close</button>
      </div>
    </Modal>
  );
};
export default Cart;
