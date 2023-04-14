import React, { useContext } from "react";
import Card from "../UI/Card";
import classes from "./ListData.module.css";
import CartContext from "../../store/cart-context";
const ListData = (props) => {
  const cartCtx = useContext(CartContext);

  const smallButtonHandler = (item1) => {
    const id = item1.currentTarget.parentNode.firstChild.textContent;
   
    const listItem = cartCtx.listItems.filter((item) => {
      return id === item.itemName;
    });
    if(listItem[0].itemSizeS>0){
      cartCtx.updateItem(id, "itemSizeS");
    }else{
      alert("Item out of stock")
    }
   
  };
  const mediumButtonHandler = (item2) => {
    const id = item2.currentTarget.parentNode.firstChild.textContent;
   
    const listItem = cartCtx.listItems.filter((item) => {
      return id === item.itemName;
    });
    if(listItem[0].itemSizeM>0){
      cartCtx.updateItem(id, "itemSizeM");
    }else{
      alert("Item out of stock")
    }
  };
  const largeButtonHandler = (item3) => {
    const id = item3.currentTarget.parentNode.firstChild.textContent;
    
    const listItem = cartCtx.listItems.filter((item) => {
      return id === item.itemName;
    });
    if(listItem[0].itemSizeM>0){
      cartCtx.updateItem(id, "itemSizeL");
    }else{
      alert("Item out of stock")
    }
  };
  const listLength = cartCtx.listItems.length;
  const cartItems = cartCtx.listItems.map((item) => {
    return (
      <li key={item.itemName}>
        <div className={classes.box}>
          <span>{item.itemName}</span>
          <span>{item.itemDescription}</span>
          <span>{item.itemPrice}</span>
          <button onClick={smallButtonHandler}>
            Buy Small <span>({item.itemSizeS})</span>
          </button>
          <button onClick={mediumButtonHandler}>
            Buy Medium <span>({item.itemSizeM})</span>
          </button>
          <button onClick={largeButtonHandler}>
            Buy Large <span>({item.itemSizeL})</span>
          </button>
        </div>
      </li>
    );
  });

  return (
    <React.Fragment>
      {listLength > 0 && (
        <Card className={classes.wrap}>
          <ul>{cartItems}</ul>
        </Card>
      )}
    </React.Fragment>
  );
};

export default ListData;
