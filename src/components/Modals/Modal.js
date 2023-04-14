import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from 'react-dom';

const Backdrops = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}/>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const modalRoot = document.getElementById("overlays")
const Modal = (props) => {
    return <React.Fragment>
       {ReactDOM.createPortal(<Backdrops onClick={props.onClickBackdrop}/>,modalRoot)}
       {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,modalRoot)}
    </React.Fragment>
};

export default Modal;
