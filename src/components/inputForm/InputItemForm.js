import React, { useContext, useRef } from "react";
import Input from "../UI/input";
import Button from "../UI/button";
import classes from "./InputItemForm.module.css";
import CartContext from "../../store/cart-context";
const InputItemForm = (props) => {
  const cartCtx = useContext(CartContext);
  const productName = useRef();
  const productDescription = useRef();
  const productPrice = useRef();
  const productQtyS = useRef();
  const productQtyM = useRef();
  const productQtyL = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const itemName = productName.current.value;
    const itemPrice = productPrice.current.value;
    const itemDescription = productDescription.current.value;
    const itemSizeS = productQtyS.current.value;
    const itemSizeM = productQtyM.current.value;
    const itemSizeL = productQtyL.current.value;
    const itemobj = {
      itemName: itemName,
      itemPrice: itemPrice,
      itemDescription: itemDescription,
      itemSizeS: itemSizeS,
      itemSizeM: itemSizeM,
      itemSizeL: itemSizeL,
      quantity: 0,
    };
    cartCtx.addItem(itemobj);
  };
  return (
    <div className={classes.box}>
      <form onSubmit={submitHandler}>
        <div className={classes["input-items"]}>
          <div>
            <h3>Items</h3>
            <Input ref={productName} label="Shoe name" />
            <Input ref={productDescription} label="Description" />
            <Input ref={productPrice} label="price" type="number" />
          </div>

          <div>
            <h3>Quantity Available</h3>
            <Input ref={productQtyS} label="S" type="number" />
            <Input ref={productQtyM} label="M" type="number" />
            <Input ref={productQtyL} label="L" type="number" />
          </div>
        </div>
        <div>
          <Button>Add Product</Button>
        </div>
      </form>
    </div>
  );
};

export default InputItemForm;
