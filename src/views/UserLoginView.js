import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LoginComponent from "../components/Login";

import Header from "../components/Header";

function UserLoginView(props) {

  return (
      <div>
        <Header/>
        <LoginComponent/>
      </div>
  );
}

export default connect()(withRouter(UserLoginView));
