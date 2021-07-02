import React from "react";
import { Container, Row, Col, Jumbotron, Form, Button } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";

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
const Signup = (props) => {
  const classes = useStyles();
  const registeredDate = new Date();
  const [username, setUsername] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const [birthdate, setBirthdate] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [registerError, setRegisterError] = React.useState("");

  React.useEffect(() => {
    if (password === confirmPassword) setDisabled(false);
    else setDisabled(true);
  }, [password, confirmPassword]);

  const onRegister = (e) => {
    e.preventDefault();
    props.onRegister(email,username, firstname, surname, password, phone, birthdate,registeredDate);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
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

  
  const onChangeEmail= (e) => {
    setEmail(e.target.value);
    setRegisterError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setRegisterError("");
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
    setRegisterError("");
  };

  const onChangeBirthdate = (e) => {
    setBirthdate(e.target.value);
    setRegisterError("");
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
    setRegisterError("");
  };

  const onBlurPassword = (e) => {
    if (password !== "" && password2 !== "") {
      if (password !== password2) {
        setRegisterError("Passwords do not match.");
      } else {
        setRegisterError("");
      }
    }
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
                       error={registerError !== ""}
                       required
                      />

                    </Col>
                  </Form.Row>
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
                                             required />
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
                    value={gender}
                    onChange={onChangeGender}
                    error={registerError !== ""}
                    required
                    >
                      <option>m/f/d</option>
                      <option>m</option>
                      <option>f</option>
                      <option>d</option>
                      
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
                      error={registerError !== ""}
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
                        error={registerError !== ""}
                        onBlur={onBlurPassword}
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
                        error={registerError !== ""}
                        onBlur={onBlurPassword}
                        type="password"
                      />
                    </Col>
                  </Form.Row>
                </Form.Group>

                {/* Address */}
                <Form.Group controlId="signupAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="Address line 1 (or Company name)"></Form.Control>
                </Form.Group>

                <Form.Row>
                  <Form.Group xs={8} as={Col}>
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Street and house number"></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control placeholder="80797"></Form.Control>
                  </Form.Group>
                </Form.Row>

                {/* City */}
                <Form.Group controlId="signupCity">
                  <Form.Label>Town/City</Form.Label>
                  <Form.Control placeholder="Munich"></Form.Control>
                </Form.Group>

                {/* Checkbox for terms and Register button */}
                <Form.Group controlId="signupCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I agree to the terms and conditions ..."
                  />
                </Form.Group>
                {registerError !== "" ? (
                                    <div className={classes.signUpRow}>
                                        <Typography color="error">{registerError}</Typography>
                                    </div>
                                ) : null}
                                <div
                                    className={classes.signUpRow + " " + classes.signUpButtons}
                                >
                                    <Button
                                        className={classes.signUpButton}
                                        onClick={props.onCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className={classes.signUpButton}
                                        variant="contained"
                                        color="primary"
                                        onClick={onRegister}
                                        disabled={
                                            email === "" ||
                                            password === "" ||
                                            password2 === "" ||
                                            registerError !== "" ||
                                            password !== password2
                                        }
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
export default Signup;
