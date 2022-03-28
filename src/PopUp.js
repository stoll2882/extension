/* global chrome */
import React, { useState } from "react";
import {Button} from "react-bootstrap";
import { connect } from "react-redux";
import {login} from './actions/auth';

import "./App.css";

const PopUp = ({ login }) => {

  const openPopupHandler = () => {
    // window.open("http://localhost:3000/extension-login","mywindow","menubar=1,resizable=1,width=600,height=350");
    window.open("https://myreaddev-ext-logins-duhpcboow.herokuapp.com/extension-login","mywindow","menubar=1,resizable=1,width=600,height=350");
    console.log("opened popup");

    chrome.runtime.onMessageExternal.addListener(
      function(request, sender, sendResponse) {
        // if (sender.url !== "https://my-read-08.herokuapp.com/extension-login")
        // if (sender.url !== "http://localhost:3000/extension-login")
        if (sender.url !== "https://myreaddev-ext-logins-duhpcboow.herokuapp.com/extension-login")
          return;
        if (request.openUrlInEditorEmail && request.openUrlInEditorPword)
          // console.log("request: ", request);
          login(request.openUrlInEditorEmail, request.openUrlInEditorPword);
          sendResponse({request});
      });

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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  login,
})(PopUp);