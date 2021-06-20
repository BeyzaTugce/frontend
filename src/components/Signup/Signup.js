import React from 'react';
import { Container, Row, Col, Jumbotron, Form, Button } from 'react-bootstrap';

const Signup = () => {


    return (
        <div className="Signup-page">
            <Container>
                <Row>
                    <Col className="mt-5" md={{ span: 7, offset: 3 }}>
                        <Jumbotron>
                            <h1>Become our customer</h1>
                            <p>
                                By registering to our platform, you can create your own garage sale, also start bargaining for zillions of products. 
                            </p>
                            <Form>

                                {/* Name */}
                                <Form.Group>
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
                                    <Form.Group xs={8} as={Col} controlId="signupBirth">
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
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Email" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPhone">
                                        <Form.Label>Phone</Form.Label>
                                            <Form.Control type="telephone" placeholder="Enter Phone Number" />
                                    </Form.Group>
                                </Form.Row>
                                
                                {/* Password */}
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Row>                                   
                                        <Col>
                                            <Form.Control type="password" placeholder="Password" />
                                        </Col>
                                        <Col>
                                            <Form.Control type="password" placeholder="Re-enter password" />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                {/* Address */}
                                <Form.Group>
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
                                <Form.Group>
                                    <Form.Label>Town/City</Form.Label>
                                    <Form.Control placeholder="Munich"></Form.Control>
                                </Form.Group>

                                {/* Checkbox for terms and Register button */}
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="I agree to the terms and conditions ..." />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Register
                                </Button>
                                
                            </Form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Signup;