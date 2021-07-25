import React, { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron, Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { loginNew } from "../redux/actions/AuthActions";

const Login = ({
  isAuthenticated,
  loginNew,
  error
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [msg, setMsg] = useState(null);
  const [emailRegisterError, setEmailRegisterError] = useState("");
  const [disabled, setDisabled] = useState(false);


  const handleSignupClick = () => {
    history.push("/signup");
  };

  const onLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    loginNew(user);
  };

  useEffect(() => {
    if(!isEmail(email) || isEmpty(email))
      setDisabled(true)
    else
      setDisabled(false)
  }, [email])


  useEffect(() => {
    // Check for register error
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
    if(isAuthenticated) {
      history.push("/home")
    }
  }, [error, msg, isAuthenticated])

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

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="Login-page">
      <Container>
        <Row>
          <Col className="mt-5" md={{ span: 7, offset: 3 }}>
            <Jumbotron>
              <h1 className="display-5 text-center">Login</h1>
              <Form>
                {/* Email */}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    fullWidth
                    placeholder="Email Address"
                    value={email}
                    onChange={onChangeEmail}
                    error={emailRegisterError !== ""}
                  />
                  {emailRegisterError !== "" ? (
                    <div style={{marginTop:10}}>
                      <p class="text-danger"><strong>{emailRegisterError}</strong></p>
                    </div>
                     ) : null}
                </Form.Group>

                {/* Password */}
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChangePassword}
                  />
                </Form.Group>
                {msg ? <Alert variant="danger">{msg}</Alert> : null}

                <div className="d-flex justify-content-end">
                  <Button
                    className="btn-green"
                    variant="light"
                    onClick={onLogin}
                    disabled={disabled}
                    type="submit"
                  >
                    Login
                  </Button>
                </div>
                <div className="text-center">
                  <h4 className="mt-4 text-center"> Not Registered yet?</h4>
                  <Button className="btn-purple" onClick={handleSignupClick} variant="light">
                    Sign Up Now!
                  </Button></div>
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

export default connect(mapStateToProps, { loginNew })(
  Login
);
