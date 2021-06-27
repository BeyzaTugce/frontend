import React from 'react';
import { Container, Row, Col, Jumbotron, Form, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const history = useHistory();

    const handleSignupClick = () => {
        history.push("/signup");
    }

    return (
        <div className="Login-page">
            <Container>
                <Row>
                    <Col className="mt-5" md={{ span: 7, offset: 3 }}>
                        <Jumbotron>
                            <h1>Login</h1>
                            <Form>

                                {/* Email */}
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                {/* Password */}
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>

                                {/* Login and Signup buttons */}
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                                <h3 className="mt-4">Still haven't registered?</h3>
                                <Button onClick={handleSignupClick} variant="primary">
                                    Signup
                                </Button>
                                
                            </Form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;