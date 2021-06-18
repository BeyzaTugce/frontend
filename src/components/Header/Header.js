import React from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Form, NavDropdown, Nav, Navbar, NavbarBrand, InputGroup} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Cart3, House, PersonCircle, Search} from "react-bootstrap-icons";
import "./Header.css";
import logo from './logo.png';

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

    const history = useHistory();

    const handleLoginClick = () => {
        history.push("/login");
    }

    //TODO: Change the logo to .svg
    //TODO: Find a better icon for Garage
    //TODO: Colors?

    return (
        <div className="Header">
            <Navbar bg="#85A582" variant="dark" sticky="top" className="header-navbar navbar fixed-top justify-content-between">
                <NavbarBrand href="/">
                    <img src={logo} style={{width:200, marginTop:-7, marginBottom:-10}}/>
                </NavbarBrand>
                <Nav className="d-flex flex-sm-grow-1 justify-content-center">
                    <Form className="w-50">
                        <InputGroup className="input-group">
                            <Form.Control type="text" className="form-control border border-right-0" placeholder="Search for an item or a hashtag"/>
                            <span className="input-group-append">
                                <Button className='btn shadow-none border-left-0' variant="light"><Search size={18} className="text-white my-lg-1"/></Button>
                            </span>
                        </InputGroup>
                    </Form>
                </Nav>
                <Nav className="justify-content-end">
                    <Nav.Link href="#cart"><Cart3 size={28} /></Nav.Link>
                    <Nav.Link href="/garage"><House size={28} /></Nav.Link>
                    <NavDropdown alignRight title={<PersonCircle size={28} />}>
                        <NavDropdown.Item onClick={handleLoginClick}>Login</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Header;

