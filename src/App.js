import React, {useState, useEffect} from "react";
import {Container, Form, Button, Navbar} from "react-bootstrap";
import { connect } from 'react-redux';
import { login, register, loadUser, logout } from './actions/auth';
import './App.css';

function App({login, logout, isAuthenticated, auth: { user }}) {

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
    await login(email, password);
  };

  return (
    <Container className="App" >
       
      <Navbar className="App-header"> 
          <img src="./wave.png" />
          <h1>MyRead Curated Blog</h1>
      </Navbar>

      { !isAuthenticated && user.firstName ? 
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
              </form>)
              :
              (
              <form
                className="form"
                onSubmit={(e) => onSubmitPost(e)}>
      
                <label>Title</label>
                <input type="text" id="title" name="title" placeholder="Enter title of article..." value={title} onChange={(e) => onChangePost(e)} />

                <label>Description</label>
                <textarea type="text" id="description" name="description" placeholder="Enter article description..." value={description} onChange={(e) => onChangePost(e)}></textarea>

                <label>Article URL</label>
                <input type="url" id="url" name="url" placeholder="Enter URL here..." value={url} onChange={(e) => onChangePost(e)}></input>

                <label>Category</label>
                <select id="category" name="category" value={category} onChange={(e) => onChangePost(e)}/>
            
                <input type="submit"></input>

                <Button className="rounded-pill" type = "primary" onClick={logout}>Logout</Button>
              </form>
              )
          }
        
      </div>

      

    </Container>
  );
}

// export default App

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  login,
  logout,
})(App);