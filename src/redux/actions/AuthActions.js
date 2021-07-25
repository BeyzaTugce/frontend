import axios from 'axios';
import { returnErrors } from './ErrorActions';

const baseURL = "http://localhost:4000/auth"

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: "USER_LOADING" });

    axios
      .get(`${baseURL}/user`, tokenConfig(getState))
      .then(res => dispatch({
          type: "USER_LOADED",
          payload: res.data
        })
      )
      .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));
          dispatch({
            type: "AUTH_ERROR"
        });
      });
}

// Register User
export const registerNew = ({   
    email,
    username,
    firstname,
    surname,
    password,
    phone,
    birthdate,
    gender,
    district,
    postcode,
    city,
    correspondenceAddress }) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    // Request body
    const body = JSON.stringify({   
        email,
        username,
        firstname,
        surname,
        password,
        phone,
        birthdate,
        //registeredDate,
        gender,
        district,
        postcode,
        city,
        correspondenceAddress });
  
    axios
      .post(`${baseURL}/register`, body, config)
      .then(res =>
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: res.data
        })
      )
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
        dispatch({
          type: "REGISTER_FAIL"
        });
      });
};

// Login User
export const loginNew = ({ email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post(`${baseURL}/login`, body, config)
    .then(res =>
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: "LOGIN_FAIL"
      });
    });
};

// Logout User
export const logoutNew = () => {
  return {
    type: "LOGOUT_SUCCESS"
  };
};

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};


  