import React from "react";
import { Container, Row, Col, Jumbotron, Form, Button } from "react-bootstrap";

const Signup = (props) => {
  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
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
    props.onRegister(username, password);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
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
                {/* Name */}
                <Form.Group controlId="signupName">
                  <Form.Label>Name</Form.Label>
                  <Form.Row>
                    <Col>
                      <Form.Control placeholder="First Name" />
                    </Col>
                    <Col>
                      <Form.Control placeholder="Last Name" />
                    </Col>
                  </Form.Row>
                </Form.Group>

                {/* Birthday and Gender */}
                <Form.Row>
                  <Form.Group xs={8} as={Col} controlId="signupBirthDate">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select">
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
                <Button
                  variant="primary"
                  type="submit"
                  disabled={disabled}
                  className={disabled ? "btn btn-secondary" : ""}
                  required
                >
                  Register
                </Button>
                {disabled ? (
                  <span className="text-muted font-weight-bold ml-3">
                    Passwords do not match2!
                  </span>
                ) : (
                  <p></p>
                )}
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
