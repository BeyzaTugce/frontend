import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import AdminSignUpComponent from "../components/AdminSignUp";

import { register } from "../redux/actions/AdminActions";
import Header from "../components/Header";

/**
 * For register new users
 * @param {props} props
 */
function AdminSignUpView(props) {
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    if (admin.admin) {
      props.history.push("/");
    }
  }, [admin, props.history]);

  const onRegister = (email, password) => {
    //  props.dispatch(register(email, password));
  };

  const onCancel = () => {
    props.history.push("/");
  };
  const onSignUp = () => {
    props.history.push("/adminsinup");
  };

  return (
      <div>
        <Header/>
        <AdminSignUpComponent
            admin={admin}
            onRegister={onRegister}
            onCancel={onCancel}
        />
      </div>
  );
}

export default connect()(withRouter(AdminSignUpView));
