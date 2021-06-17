import React from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Form, NavDropdown, Nav, Navbar, NavbarBrand} from "react-bootstrap";
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
const Header = () => {
    //const classes = useStyles();
    //const [menuAnchor, setMenuAnchor] = React.useState(null);

    const history = useHistory();

    const handleLoginClick = () => {
        history.push("/login");
    }

    //TODO: Change the logo to .svg
    //TODO: Find a better icon for Garage
    //TODO: Extend search bar and I think it is not centered
    //TODO: Color of the buttons?

    return (
        <div className="Header">
            <Navbar bg="#85A582" variant="dark" sticky="top" className="justify-content-between">
                <NavbarBrand href="#mygarage">
                    <img src={logo} style={{width:200, marginTop:-7, marginBottom:-10}}/>
                </NavbarBrand>
                <Form inline>
                    <Form.Control type="text" placeholder="Search for an item or a hashtag" className="mr-sm-2" />
                    <Button className="search-button" variant="light"><Search size={15} className="text-white"/></Button>
                </Form>
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

