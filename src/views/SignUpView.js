import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import SignUpComponent from "../components/Signup";
import Header from "../components/Header";

/**
 * For register new users
 * @param {props} props
 */
function SignUpView(props) {

  return (
      <div>
        <Header/>
        <SignUpComponent/>
      </div>
  );
}

export default connect()(withRouter(SignUpView));
