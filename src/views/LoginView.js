import React from 'react';
import { useHistory } from 'react-router-dom';

import Login from "../components/Login";

import { login } from "../redux/actions/UserActions";

const LoginView = () => {


    return (
        <Login />
    );
}

export default LoginView;