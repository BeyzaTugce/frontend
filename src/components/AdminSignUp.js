import React from "react";
import { Container, Row, Col, Jumbotron, Form} from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Button,
    TextField,
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


function AdminSignUp  (props) {
    const classes = useStyles();

  const [email, setEmail] = React.useState("");
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
    props.onRegister(email, password);
  };


  
  const onChangeEmail= (e) => {
    setEmail(e.target.value);
    setRegisterError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
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
    <div className="AdminSignup-page">
      <Container>
        <Row>
          <Col className="mt-5" md={{ span: 7, offset: 3 }}>
            <Jumbotron>
              <h1>Admin Sign Up Pahr</h1>
              <Form>
        
                {/* Email*/}
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
}

export default AdminSignUp;
