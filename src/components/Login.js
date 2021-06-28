import React, { useEffect } from "react";
import { Container, Row, Col, Jumbotron, Form, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginError, setLoginError] = React.useState("");
    const history = useHistory();

    useEffect(() => {
        if (props.user.error) {
            setLoginError(props.user.error);
        } else {
            setLoginError("");
        }
    }, [props.user]);

    const handleSignupClick = () => {
        history.push("/signup");
    }


    const onLogin = (e) => {
        e.preventDefault();
        props.onLogin(username, password);
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setLoginError("");
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setLoginError("");
    };
    


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
                                    <Form.Control
                                        type="email"
                                        fullWidth
                                        placeholder="Enter Email" 
                                        value={username}
                                        onChange={onChangeUsername}
                                        error={loginError !== ""}
                                    />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                    
                                </Form.Group>

                                {/* Password */}
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={onChangePassword}
                                    error={loginError !== ""}
                                     />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>
                                {loginError !== "" ? (
                                    <div >
                                        <Form.Text color="error">{loginError}</Form.Text>
                                    </div>
                                ) : null}
                                {/* Login and Signup buttons */}
                          
                          
                                <div>
                                    <Button
                                        
                                        variant="contained"
                                        color="primary"
                                        onClick={onLogin}
                                        disabled={username === "" || password === ""}
                                        type="submit"
                                    >
                                        Login
                                    </Button>

                                <h3 className="mt-4"> Not Registered yet?</h3>
                                <Button onClick={handleSignupClick} variant="primary">
                                    Signup
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

export default Login;