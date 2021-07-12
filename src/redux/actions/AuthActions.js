import axios from 'axios';

const baseURL = "http://localhost:4000/auth"

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: "USER_LOADING" });

    axios.get(`${baseURL}/user`, tokenConfig(getState))
        .then(res => dispatch({
            type: "USER_LOADED",
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: "AUTH_ERROR"
            });
        })
}

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