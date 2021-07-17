import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import LoginComponent from "../components/Login";

import { login } from "../redux/actions/UserActions";
import Header from "../components/Header";

function UserLoginView(props) {
  // const user = useSelector((state) => state.user);

  // // useEffect(() => {
  // //   if (user.user) {
  // //     props.history.push("/");
  // //   }
  // // }, [user, props.history]);

  // const onLogin = (email, password) => {
  //   props.dispatch(login(email, password));
  // };

  // const onCancel = () => {
  //   props.history.push("/");
  // };

  // const onSignUp = () => {
  //   props.history.push("/register");
  // };

  return (
      <div>
        <Header/>
        <LoginComponent/>
      </div>
  );
}

export default connect()(withRouter(UserLoginView));
