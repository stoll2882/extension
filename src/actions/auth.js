import axios from 'axios';
import { setAlert } from './alert';
// import { fetchUrl } from 'fetch';
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    SET_ALERT,
    REMOVE_ALERT,
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  
    try {
      const res = await axios.get('https://my-read-08.herokuapp.com/api/auth');
  
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

// Register User
export const register = (
    firstName,
    lastName,
    email,
    alias,
    password,
    phoneNumber,
    idNum
  ) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    var body = JSON.stringify({ firstName, lastName, alias, email, password, phoneNumber, idNum });
  
    try {
      const res = await axios.post('https://my-read-08.herokuapp.com/api/auth', body, config);
  
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
  
      dispatch(loadUser());
      dispatch(setAlert("Successful Registration 🎉🎉🎉", 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
// export async function login(email, password) {
    var body = JSON.stringify({ email: email, password: password });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const res = await axios.post('https://my-read-08.herokuapp.com/api/auth', body, config);
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch(setAlert("Successful Login 🎉🎉🎉", 'success'));
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

// Add a User Category
export const addCategory = (category) => async (dispatch) => {
    // export async function login(email, password) {
    var body = JSON.stringify({ category: category });
    // body = { email: email, password: password };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put('https://my-read-08.herokuapp.com/api/auth', body, config);
      // const res = await axios.post('/api/auth', body);
      console.log(res);

    } catch (err) {
      console.log(err.message);
    }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const uploadPostPicture = (file, postId) => async (dispatch) => {
  try {
    console.log("in post upload")
    console.log(file)
    var result = await axios.get('https://my-read-08.herokuapp.com/api/postimage/' + postId);
    console.log(result.data);
    const response = await fetch(result.data, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
      'Cache-Control': 'no-store max-age=0',
      'Content-Type': file.type,
      'x-ms-date': new Date().toUTCString(),
      'x-ms-version': '2020-04-08',
      'x-ms-blob-type': 'BlockBlob'
      },
      body: file, // body data type must match "Content-Type" header
    });
    await axios.post('https://my-read-08.herokuapp.com/api/postimage/' + postId);
  } catch (error) {
    console.log(error);
  }
};