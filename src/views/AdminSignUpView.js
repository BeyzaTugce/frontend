import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import AdminSignUpComponent from "../components/AdminSignUp";

import { register } from "../redux/actions/AdminActions";

/**
 * For register new users
 * @param {props} props
 */
function AdminSignUpView(props) {
    const admin = useSelector((state) => state.user);

    useEffect(() => {
        if (admin.admin) {
            props.history.push("/");
        }
    }, [admin, props.history]);

    const onRegister = (email,password) => {
        props.dispatch(register(email, password));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    return (
        <AdminSignUpComponent
            admin={admin}
            onRegister={onRegister}
            onCancel={onCancel}
        />
    );
}

export default connect()(withRouter(AdminSignUpView));