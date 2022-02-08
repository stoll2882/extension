import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { login, register, loadUser } from './actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  login,
  register,
  loadUser,
  setAlert,
})(App);
