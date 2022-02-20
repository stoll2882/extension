import React, { useState } from "react";

const PopUp = ({ idMessage }) => {
  // create state `open` as false
  const [open, setOpen] = useState(false);

  const openPopupHandler = () => {
    window.open("https://my-read-08.herokuapp.com/extension-login","mywindow","menubar=1,resizable=1,width=600,height=350");
  }
  
  const closePopupHandler = () => {
    setOpen(false);
  }

  return (
    <>
      {/* click of button toggles `open` value therefore visibility */}
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#${idMessage}`}
      >
        {/* {idMessage} */}
        Sign in via Facebook or Google
      </button>
      {/* If open is true show your <div /> */}
      {open && (
        openPopupHandler()
      )}
    </>
  );
};

export default PopUp;