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
    const admin = useSelector((state) => this.state.admin);

    useEffect(() => {
        if (admin.admin) {
            this.props.history.push("/");
        }
    }, [admin, this.props.history]);

    const onRegister = (email,password) => {
        this.props.dispatch(register(email, password));
    };

    const onCancel = () => {
        this.props.history.push("/");
    };
    const onSignUp = () => {
        this.props.history.push("/adminsinup");
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