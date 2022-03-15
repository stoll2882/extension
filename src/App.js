/* global chrome */
import React, {useState, useEffect} from "react";
import {Container, Form, Button, Navbar, Row, Col} from "react-bootstrap";
import { connect } from 'react-redux';
import { login, register, loadUser, logout } from './actions/auth';
import { addPost } from './actions/post';
import './App.css';
import Alert from './Alert';
import { setAlert } from "./actions/alert";
import NewPost from "./NewPost";
import PopUp from "./PopUp";
import Wave from './wave.png';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App({addPost, loadUser, setAlert, login, logout, isAuthenticated, auth: { user }}) {

  useEffect(() => {
    loadUser();
  }, []);

  const [formDataLogin, setFormDataLogin] = useState({
    email: '',
    password: '',
  });

  const {
    email,
    password,
  } = formDataLogin;

  const onChangeLogin = (e) => {
    console.log("changing login")
    console.log(e.target.name)
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  }
    

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

  // for connecting with MyRead
  // const [userId, setUser] = useState("");
  // chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  //   console.log("hello from extension");
  //   if (request.messageFromWeb.cliqmark_user) {
  //     console.log(request.messageFromWeb);
  //     setUser(request.messageFromWeb.cliqmark_user);
  //   }
  // })

  return (
    <Container className="App" >

      <Alert />
      
      <div>
          { !isAuthenticated?
          <div>
            <Row style={{marginBottom:"-1rem"}}>
            <h1 className="App-header">MyRead</h1>
            </Row>
            <Row style={{marginBottom:"1rem"}}>
            <h2>Log in to blog as you surf</h2>
            </Row>
              <Form onSubmit={(e) => onSubmitLogin(e)}>
                 <Form.Group className="mb-3" controlId="email">
                   <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={(e) => onChangeLogin(e)}/>
                 </Form.Group>
              
                 <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={(e) => onChangeLogin(e)}/>
             </Form.Group>
              <Button variant="primary" type="submit">
                Login
               </Button>
               <Row className="justify-content-center" style={{borderTop:"1px solid #bebebe", marginTop:"2rem", marginLeft:"0.5rem", marginRight:"0.5rem", paddingTop:"1rem"}}>
                <Row className="text-center" style={{marginTop:"-1.75rem", }}>
                    <span style={{padding:"0.5rem", background:"whiteSmoke"}}>
                    OR
                    </span>
                </Row>
                </Row>
              <PopUp />
              <Col className="center-block text-center" style={{marginTop:"10rem"}}>
              <span><img src ={Wave} height={"50px"}></img></span>
              </Col>
              </Form>
              </div>
              :
              <NewPost /> 
          }
      </div>  
    </Container>
  );
}

//

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  login,
  logout,
  addPost,
  setAlert,
  loadUser,
})(App);