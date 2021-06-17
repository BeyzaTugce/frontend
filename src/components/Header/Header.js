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

const NavdropdownIcon = (<PersonCircle size={25} />);
const Header = () => {

    //const classes = useStyles();

    //const [menuAnchor, setMenuAnchor] = React.useState(null);

    //TODO: Change the logo to .svg
    //TODO: Find a better icon for Garage
    //TODO: Extend search bar and I think it is not centered
    //TODO: Color of the buttons?
    
    const history = useHistory();
    const handleClick = () => {
        history.push("/login");
    }
    return (
        <div className="Header">
            <Navbar bg="#85A582" variant="light" sticky="top" className="justify-content-between">
                <NavbarBrand href="#mygarage">
                    <img src={logo} style={{width:200, marginTop:-7, marginBottom:-7}}/>
                </NavbarBrand>
                <Form inline>
                    <Form.Control type="text" placeholder="Search for an item or a hashtag" className="mr-sm-2" />
                    <Button variant="dark"><Search size={15} /></Button>
                </Form>
                <Nav className="justify-content-end">
                    <Nav.Link href="#cart"><Cart3 size={25} /></Nav.Link>
                    <Nav.Link href="#garage"><House size={25} /></Nav.Link>
                    <NavDropdown alignRight title={NavdropdownIcon}>                       
                        <NavDropdown.Item onClick={handleClick}>Login</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
            <Navbar className="navbar-links" bg="dark" variant="dark" >
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

