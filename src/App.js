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

// //external logins
// import GoogleBtn from './external-logins/GoogleBtn';
// // import FacebookLogin from "react-facebook-login";
// import FacebookLoginComponent from "./external-logins/facebooklogin.component";


function App({addPost, setAlert, login, logout, isAuthenticated, auth: { user }}) {

  // const [email, setEmail] = useState()
  // const [password, setPassword] = useState()

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

  // const handleGoogleSubmit = async (g) => {
  //   await login(g.getEmail(), g.getId());
  //   console.log('inside handleGoogleSubmit');
  //   console.log("in app: ", g);
  // }

  // const responseFacebook = async (fb) => {
  //   console.log(fb);
  //   if (fb.status === "unknown") {
  //     alert("Facebook authentication failed!");
  //     return false;
  //   }
  //   console.log('FACEBOOK login successful: ', fb)
  //   console.log('inside handleFacebookSubmit');
  //   console.log('in app: ', fb);
  //   await login(fb.email, fb.id);
  // };

  return (
    <Container className="App" >

      <Alert />
       
      <Navbar className="App-header"> 
          {/* <img src="wave.png" /> */}
          <h1>MyRead Curated Blog</h1>
      </Navbar>

      { !isAuthenticated && user ? 
      <h2>Curate a new post - while you're browsing!</h2>
      :
      <h2>Welcome... Curate a new post now!</h2>}

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