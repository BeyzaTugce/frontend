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
  // const user = useSelector((state) => state.user);

  // // useEffect(() => {
  // //   if (user.user) {
  // //     props.history.push("/");
  // //   }
  // // }, [user, props.history]);

  // const onRegister = (
  //   email,
  //   username,
  //   firstname,
  //   surname,
  //   password,
  //   phone,
  //   birthdate,
  //   registeredDate,
  //   gender,
  //   district,
  //   postcode,
  //   city,
  //   correspondenceAddress
  // ) => {
  //   props.dispatch(
  //     register(
  //       email,
  //       username,
  //       firstname,
  //       surname,
  //       password,
  //       phone,
  //       birthdate,
  //       registeredDate,
  //       gender,
  //       district,
  //       postcode,
  //       city,
  //       correspondenceAddress
  //     )
  //   );
  // };

  // const onCancel = () => {
  //   props.history.push("/");
  // };

  return (
    <SignUpComponent/>
  );
}

export default connect()(withRouter(SignUpView));
