import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import SignUpComponent from "../components/Signup";

import { register } from "../redux/actions/UserActions";

/**
 * For register new users
 * @param {props} props
 */
function SignUpView(props) {
    const user = useSelector((state) => this.state.user);

    useEffect(() => {
        if (user.user) {
            this.props.history.push("/");
        }
    }, [user, this.props.history]);

    const onRegister = (email, userName,password, loginStatus, registerDate,role) => {
        this.props.dispatch(register(email, userName,password, loginStatus, registerDate,role));
    };

    const onCancel = () => {
        this.props.history.push("/");
    };

    return (
        <SignUpComponent
            user={user}
            onRegister={onRegister}
            onCancel={onCancel}
        />
    );
}

export default connect()(withRouter(SignUpView));