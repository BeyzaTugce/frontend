import React from 'react';
import { Container, Row, Col, Jumbotron, Form, Button} from 'react-bootstrap';
import CategoryBar from "../Header/CategoryBar";

const Login = () => {

    return (
        <div className="Login-page">
            <CategoryBar />
            <div className="Loginform">
                <Container>
                    <Row>
                        <Col md={{ span: 7, offset: 3 }}>
                            <Jumbotron>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember me" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Login;