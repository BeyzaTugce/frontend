import React, { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron, Form, Button, Alert } from "react-bootstrap";
import { connect } from 'react-redux';
import { registerNew } from "../redux/actions/AuthActions";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [correspondenceAddress, setcorrespondenceAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = React.useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [passRegisterError, setPassRegisterError] = useState("");
  const [emailRegisterError, setEmailRegisterError] = useState("");
  const [userNameRegisterError, setuserNameRegisterError] = useState("");
  const [msg, setMsg] = useState(null);


  useEffect(() => {
    if (!isPassValid(password))
      setPassRegisterError("Password must include minimum eight characters, at least one uppercase letter, one lowercase letter and one number");
    else if (!isPassMatch(password, password2))
      setPassRegisterError("Passwords do not match");
    else
      setPassRegisterError("");
  }, [password, password2]);

  useEffect(() => {
      if (!isEmail(email))
        setEmailRegisterError("Email is not in valid format!");
      else
        setEmailRegisterError("");

  }, [email]);


  useEffect(() => {
    if( !username || !password || !email || !firstname || !surname || !city || !district || !correspondenceAddress || !postcode ){
      setRegisterError("Fields with (*) can not be empty")
      setDisabled(true)
    }
    else
      setRegisterError("")
  }, [username, password, email, firstname, surname, city, district, correspondenceAddress, postcode])

  useEffect(() => {
    if( passRegisterError || emailRegisterError || registerError || !isEmail(email) )
      setDisabled(true)
    else
      setDisabled(false)
  }, [emailRegisterError, passRegisterError, registerError])

  const isEmail = (val) => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regEmail.test(val))
      return true
    return false
  }

  const isPassValid = (val) => {
    const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!-_@#$%^&*?]{8,}$/;
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
      history.push("/home")
    }
  }, [error, msg, isAuthenticated])

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setRegisterError("");
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
    //setRegisterError("");
  };
  const onChangeSurname = (e) => {
    setSurname(e.target.value);
    setRegisterError("");
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setRegisterError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setRegisterError("");
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
    //setRegisterError("");
  };

  const onChangeBirthdate = (e) => {
    setBirthdate(e.target.value);
    //setPassRegisterError("");
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
    // setPassRegisterError("");
  };

  return (
    <div className="Signup-page">
      <Container>
        <Row>
          <Col className="mt-5" md={{ span: 7, offset: 3 }}>
            <Jumbotron>
              <h1 className="display-5 text-center">Create an account</h1>
              {msg ? <Alert variant="danger">{msg}</Alert> : null}
              <Form>
                <Form.Group controlId="Username">
                  <Form.Label>Username<strong>(*)</strong></Form.Label>
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
                      <p class="text-danger"><strong>{userNameRegisterError}</strong></p>
                    </div>
                     ) : null}
                </Form.Group>
                {/* Name */}
                <Form.Group controlId="signupName">
                  <Form.Label>Name<strong>(*)</strong></Form.Label>
                  <Form.Row>
                    <Col>
                      <Form.Control
                        placeholder="First Name"
                        fullWidth
                        value={firstname}
                        onChange={onChangeFirstname}
                        //error={registerError !== ""}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Last Name"
                        fullWidth
                        value={surname}
                        onChange={onChangeSurname}
                        //error={registerError !== ""}
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
                      //error={registerError !== ""}
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
                        //error={registerError !== ""}
                        custom
                      >
                      <option value="m/f/d">Choose...</option>
                      <option value="m">Male</option>
                      <option value="f">Female</option>
                      <option value="o">Other</option>
                  </Form.Control>
                  </Form.Group>
                </Form.Row>

                {/* Email and Phone*/}
                <Form.Row>
                  <Form.Group as={Col} controlId="signupEmail">
                    <Form.Label>Email<strong>(*)</strong></Form.Label>
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
                      //error={registerError !== ""}
                      required
                    />
                  </Form.Group>
                </Form.Row>
                {emailRegisterError !== "" ? (
                    <div className={classes.signUpRow} style={{marginBlock:-15}}>
                      <p class="text-danger"><strong>{emailRegisterError}</strong></p>
                    </div>
                     ) : null}
                {/* Password */}
                <Form.Group controlId="signupPass">
                  <Form.Label>Password<strong>(*)</strong></Form.Label>
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
                  <Form.Label>Address<strong>(*)</strong></Form.Label>
                  <Form.Control placeholder="Street and House Number"
                   value={correspondenceAddress}
                   onChange={onChangeAdress}
                   error={registerError !== ""}
                   required
                  ></Form.Control>
                </Form.Group>

                <Form.Row>
                  <Form.Group xs={8} as={Col}>
                    <Form.Label>District<strong>(*)</strong></Form.Label>
                    <Form.Control placeholder="District"
                    
                    value={district}
                    onChange={onChangeDistrict}
                    //error={registerError !== ""}
                    required></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Postcode<strong>(*)</strong></Form.Label>
                    <Form.Control placeholder="Postcode"
                    value={postcode}
                    onChange={onChangePostcode}
                    //error={registerError !== ""}
                    
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>
                {/* City */}
                <Form.Group controlId="signupCity">
                  <Form.Label>Town/City<strong>(*)</strong></Form.Label>
                  <Form.Control placeholder="City"
                                value={city}
                                onChange={onChangeCity}
                                //error={registerError !== ""}
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
                    className="btn-green"
                    variant="light"
                    onClick={onRegister}
                    disabled={disabled}
                    type="submit"
                  >
                    Register
                  </Button>
                </div>
                {registerError !== "" ? (
                <div className={classes.signUpRow}>
                  <p class="text-danger"><strong>{registerError}</strong></p>
                </div>
                  ) : null}
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
