import React, {useState, useEffect} from "react";
import {Container, Form, Button, Navbar} from "react-bootstrap";
import { connect } from 'react-redux';
import { login, register, loadUser, logout } from './actions/auth';
import { addPost } from './actions/post';
import './App.css';
import Alert from './Alert';
import { setAlert } from "./actions/alert";
import NewPost from "./NewPost";
import PopUp from "./PopUp";

function App({addPost, setAlert, login, logout, isAuthenticated, auth: { user }}) {

  const [formDataLogin, setFormDataLogin] = useState({
    email: '',
    password: '',
  });

  const {
    email,
    password,
  } = formDataLogin;

  const onChangeLogin = (e) =>
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    console.log("email:" + email)
    console.log("password: " + password)
    await login(email, password);
  };

  const [formDataPost, setFormDataPost] = useState({
    title: '',
    description: '',
    url: '',
    category: '',
  });

  const {
    title,
    description,
    url,
    category,
  } = formDataPost;

  const onChangePost = (e) =>
    setFormDataPost({ ...formDataPost, [e.target.name]: e.target.value });

  const onSubmitPost = async (e) => {
    e.preventDefault();
    await addPost(formDataPost);
  };

  return (
    <Container className="App" >

      <Alert />
       
      <Navbar className="App-header"> 
          {/* <img src="wave.png" /> */}
          <h1>MyRead</h1>
      </Navbar>

      { !isAuthenticated && user ? 
      <h2>Curate a new post - while you're browsing!</h2>
      :
      <h2>Log in to blog as you surf.</h2>}

      <div>
          { !isAuthenticated ?
            (<form
              className="form"
              onSubmit={(e) => onSubmitLogin(e)}>
    
              <label>Email</label>
              <input type="text" id="email" name="email" placeholder="email..." value={email} onChange={(e) => onChangeLogin(e)}/>
    
              <label>Password</label>
              <input type="text" id="password" name="password" placeholder="Password" value={password} onChange={(e) => onChangeLogin(e)}/>
    
              <input type="submit"></input>

              <PopUp />
              
              </form>)
              :
              (
              <NewPost />
              )
          }
        
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  login,
  logout,
  addPost,
  setAlert,
})(App);