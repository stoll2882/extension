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

function App({addPost, setAlert, login, logout, isAuthenticated, auth: { user }}) {

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

  return (
    <Container className="App" >

      <Alert />
       
      <Navbar className="App-header"> 
          <h1>MyRead</h1>
      </Navbar>

      { isAuthenticated && user ? 
      <h2>Curate a new post</h2>
      :
      <h2>Log in to blog as you surf</h2>}

      <div>
          { !isAuthenticated?
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
              <Col className="center-block text-center" style={{marginTop:"15rem"}}>
              <span><img src ={Wave} height={"50px"}></img></span>
              </Col>
              </Form>
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
})(App);