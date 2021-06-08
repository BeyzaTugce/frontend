import React from 'react';
import { withRouter } from 'react-dom';

import logo from './logo.png';
import {Button, Col, Form, FormGroup, FormText, Nav, Navbar, NavbarBrand, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Code} from "react-bootstrap-icons";


/*const useStyles = makeStyles((theme) => ({
    toolbar: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
    },
}));*/

/**
 * Navigation bar of the app
 * @param {props} props
 */
const Header = (props) => {
    //const classes = useStyles();

    //const [menuAnchor, setMenuAnchor] = React.useState(null);

    return (
        <div className="Header">
            <Navbar bg="dark" variant="dark" sticky="top">
                <NavbarBrand href="#mygarage">
                    <img src={logo} style={{width:200, marginTop: -7}}/>
                </NavbarBrand>
                <Form inline>
                    <Row>
                        <Col xs="auto">
                            <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                        </Col>
                        <Col xs="auto">
                            <Button variant="outline-info">Search</Button>
                        </Col>
                    </Row>
                </Form>
                <Nav className="justify-content-end">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Navbar>
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link href="#sales">Today's Sales</Nav.Link>
                    <Nav.Link href="#fashion">Fashion</Nav.Link>
                    <Nav.Link href="#furniture">Furniture</Nav.Link>
                    <Nav.Link href="#books">Books</Nav.Link>
                    <Nav.Link href="#electronics">Electronics</Nav.Link>
                </Nav>
            </Navbar>

        </div>
    );
}

export default Header;
