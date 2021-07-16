import React, { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron, Form, Button, Alert } from "react-bootstrap";
import { connect } from 'react-redux';
import { registerNew } from "../redux/actions/AuthActions";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { propTypes } from "react-bootstrap/esm/Image";

const useStyles = makeStyles((theme) => ({
  usersignUpRoot: {
    margin: "auto",
  },
  signUpPaper: {
    width: "500px",
    padding: theme.spacing(2),
  },
  signUpRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "&:last-child": {
      paddingBottom: theme.spacing(0),
    },
    "&:first-child": {
      paddingTop: theme.spacing(0),
    },
  },
  signUpButtons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  signUpButton: {
    marginLeft: theme.spacing(1),
  },
}));
const Signup = ({
  isAuthenticated,
  registerNew,
  error
}) => {
  const history = useHistory();
  const classes = useStyles();
  //const registeredDate = new Date();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [gender, setGender] = useState("");
  const [correspondenceAddress, setcorrespondenceAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = React.useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [passRegisterError, setPassRegisterError] = useState("");
  const [emailRegisterError, setEmailRegisterError] = useState("");
  const [userNameRegisterError, setuserNameRegisterError] = useState("");
  const [msg, setMsg] = useState(null);
  // useEffect(() => {
  //   if (isEmpty(password)){
  //     setPassRegisterError("Password can not be empty!");
  //   }

  //   else if (password !== password2);
  //     setPassRegisterError("Passwords do not match!");
  // }, [password, password2]);
  // setPassRegisterError("Password must include minimum eight characters, at least one uppercase letter, one lowercase letter and one number");
  // if (password !== "" && password2 !== "") {
  //   if (password.length < 6)
  //     setPassRegisterError("Password must be at least 6 characters!");
  //   if (password !== password2) {
  //     setPassRegisterError("Passwords do not match!");
  //   } else {
  //     setPassRegisterError("");
  //   }
  // }

  useEffect(() => {
    if (!isPassValid(password))
      setPassRegisterError("Password must include minimum eight characters, at least one uppercase letter, one lowercase letter and one number");
    else if (!isPassMatch(password, password2))
      setPassRegisterError("Passwords do not match");
    else
      setPassRegisterError("");
  }, [password, password2]);

  useEffect(() => {
    if (!isEmpty(email)){
      if (!isEmail(email))
        setEmailRegisterError("Email is not in valid format!");
      else
      setEmailRegisterError("");
    }
    else
      setEmailRegisterError("Email can not be empty!");
  }, [email]);

  useEffect(() => {
    if (isEmpty(username))
      setuserNameRegisterError("Username field can not be empty!");
    else
      setuserNameRegisterError("");
  }, [username]);

  useEffect(() => {
    if(passRegisterError ==! "" || emailRegisterError ==! "" || !isEmail(email))
      setDisabled(true)
    else
      setDisabled(false)
  }, [password, password2, email])

  const isEmail = (val) => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regEmail.test(val))
      return true
    return false
  }

  const isEmpty = (val) => {
    if(val == "")
      return true
    return false
  }
  const isPassValid = (val) => {
    let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(regPass.test(val))
      return true
    return false
  };

  const isPassMatch = (pass, pass2) => {
    if (pass !== "" && pass2 !== "") {
      if (pass !== pass2) {
        return false;
    }
    return true;
    }
  };


  const onCancel = () => {
    history.push("/");
  };

  const onRegister = (e) => {
    e.preventDefault();
    // Create user object
    const user = {
      email,
      username,
      firstname,
      surname,
      password,
      phone,
      birthdate,
      //registeredDate,
      gender,
      district,
      postcode,
      city,
      correspondenceAddress
    };

    // Attempt to register
    registerNew(user);
  };

  useEffect(() => {
    // Check for register error
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
    if(isAuthenticated) {
      history.push("/garage")
    }
  }, [error, msg, isAuthenticated])

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    //setRegisterError("");
  };

  const onChangeAdress = (e) => {
    setcorrespondenceAddress(e.target.value);
    setRegisterError("");
  };

  const onChangeDistrict = (e) => {
    setDistrict(e.target.value);
    setRegisterError("");
  };

  const onChangePostcode = (e) => {
    setPostcode(e.target.value);
    setRegisterError("");
  };

  const onChangeCity= (e) => {
    setCity(e.target.value);
    setRegisterError("");
  };

  const onChangeFirstname = (e) => {
    setFirstname(e.target.value);
    setRegisterError("");
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
    setRegisterError("");
  };
  const onChangeSurname = (e) => {
    setSurname(e.target.value);
    setRegisterError("");
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    //setEmailRegisterError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    //setRegisterError("");
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
    setRegisterError("");
  };

  const onChangeBirthdate = (e) => {
    setBirthdate(e.target.value);
    setPassRegisterError("");
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
    setPassRegisterError("");
  };

  return (
    <div className="Signup-page">
      <Container>
        <Row>
          <Col className="mt-5" md={{ span: 7, offset: 3 }}>
            <Jumbotron>
              <h1>Become our customer</h1>
              <p>
                By registering to our platform, you can create your own garage
                sale, also start bargaining for zillions of products.
              </p>
              {msg ? <Alert variant="danger">{msg}</Alert> : null}
              <Form>
                <Form.Group controlId="Username">
                  <Form.Label>Username</Form.Label>
                  <Form.Row>
                    <Col>
                      <Form.Control
                        placeholder="Username"
                        fullWidth
                        value={username}
                        onChange={onChangeUsername}
                        error={userNameRegisterError !== ""}
                        required
                      />
                    </Col>
                  </Form.Row>
                  {userNameRegisterError !== "" ? (
                    <div className={classes.signUpRow}>
                      <p class="text-danger"><strong>{emailRegisterError}</strong></p>
                    </div>
                     ) : null}
                </Form.Group>
                {/* Name */}
                <Form.Group controlId="signupName">
                  <Form.Label>Name</Form.Label>
                  <Form.Row>
                    <Col>
                      <Form.Control
                        placeholder="First Name"
                        fullWidth
                        value={firstname}
                        onChange={onChangeFirstname}
                        error={registerError !== ""}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Last Name"
                        fullWidth
                        value={surname}
                        onChange={onChangeSurname}
                        error={registerError !== ""}
                        required
                      />
                    </Col>
                  </Form.Row>
                </Form.Group>

                {/* Birthday and Gender */}
                <Form.Row>
                  <Form.Group xs={8} as={Col} controlId="signupBirthDate">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthdate}
                      onChange={onChangeBirthdate}
                      error={registerError !== ""}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        as="select"
                        className="my-1 mr-sm-2"
                        id="inlineFormCustomSelectPref"
                        onChange={onChangeGender}
                        error={registerError !== ""}
                        custom
                      >
                        <option value="m/f/d">Choose...</option>
                       <option value="m">m</option>
                       <option value="f">f</option>
                       <option value="d">d</option>
                  </Form.Control>
                  </Form.Group>
                </Form.Row>

                {/* Email and Phone*/}
                <Form.Row>
                  <Form.Group as={Col} controlId="signupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      fullWidth
                      placeholder="Enter Email"
                      value={email}
                      onChange={onChangeEmail}
                      error={emailRegisterError !== ""}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="signupPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="telephone"
                      placeholder="Enter Phone Number"
                      value={phone}
                      onChange={onChangePhone}
                      error={registerError !== ""}
                      required
                    />
                  </Form.Group>
                </Form.Row>
                {emailRegisterError !== "" ? (
                    <div className={classes.signUpRow}>
                      <Typography color="error">{emailRegisterError}</Typography>
                    </div>
                     ) : null}
                {/* Password */}
                <Form.Group controlId="signupPass">
                  <Form.Label>Password</Form.Label>
                  <Form.Row>
                    <Col>
                      <Form.Control
                        placeholder="Password"
                        fullWidth
                        value={password}
                        onChange={onChangePassword}
                        error={passRegisterError !== ""}
                        onBlur={isPassValid}
                        type="password"
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Repeat Password"
                        fullWidth
                        value={password2}
                        onChange={onChangePassword2}
                        error={passRegisterError !== ""}
                        onBlur={isPassValid}
                        type="password"
                      />
                    </Col>
                  </Form.Row>
                  {passRegisterError !== "" ? (
                    <div className={classes.signUpRow}>
                      <p className="text-danger"><strong>{passRegisterError}</strong></p>
                    </div>
                     ) : null}
                </Form.Group>

                {/* Address */}
                <Form.Group controlId="signupAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="Address line 1 (or Company name)"
                   value={correspondenceAddress}
                   onChange={onChangeAdress}
                   error={registerError !== ""}
                   required
                  ></Form.Control>
                </Form.Group>

                <Form.Row>
                  <Form.Group xs={8} as={Col}>
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Street and house number"
                    
                    value={district}
                    onChange={onChangeDistrict}
                    error={registerError !== ""}
                    required></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control placeholder="80797"
                    value={postcode}
                    onChange={onChangePostcode}
                    error={registerError !== ""}
                    
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>

                {/* City */}
                <Form.Group controlId="signupCity">
                  <Form.Label>Town/City</Form.Label>
                  <Form.Control placeholder="Munich"
                                      value={city}
                                      onChange={onChangeCity}
                                      error={registerError !== ""}
                  ></Form.Control>
                </Form.Group>

                {/* Checkbox for terms and Register button */}
                {/* <Form.Group controlId="signupCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I agree to the terms and conditions ..."
                  />
                </Form.Group> */}
                <div
                  className={classes.signUpRow + " " + classes.signUpButtons}
                >
                  <Button
                    className={classes.signUpButton}
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={classes.signUpButton}
                    variant="primary"
                    onClick={onRegister}
                    disabled={disabled}
                    type="submit"
                  >
                    Register
                  </Button>
                </div>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { registerNew })(
  Signup
);
