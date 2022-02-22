import React, { useState } from "react";
import {Button} from "react-bootstrap";
import "./App.css"
import Google from "./google.png"
import Facebook from "./f_logo_RGB-Blue_58.png"

const PopUp = ({ idMessage }) => {
  // create state `open` as false
  const [open, setOpen] = useState(false);

  const openPopupHandler = () => {
    var popupWindow = window.open("https://my-read-08.herokuapp.com/extension-login","mywindow","menubar=1,resizable=1,width=600,height=350");
    
  }
  
  const closePopupHandler = () => {
    setOpen(false);
  }

  return (
    <>
      {/* click of button toggles `open` value therefore visibility */}
      <Button
        onClick={(e) => {openPopupHandler()}}
        variant="secondary"
      >
        Sign in via Facebook or Google
      </Button>

    </>
  );
};

export default PopUp;