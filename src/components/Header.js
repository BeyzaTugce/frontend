import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  NavDropdown,
  Nav,
  Navbar,
  NavbarBrand,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Cart3, House, PersonCircle, Search } from "react-bootstrap-icons";
import "./Header.css";
import { connect, useSelector } from "react-redux";
import logo from "../views/logo.png";
import { logout } from "../redux/actions";
import {getGarageByUser} from "../redux/actions/GarageActions"
import CategoryBar from "./CategoryBar";

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
  const user = useSelector((state) => state.user);


  const history = useHistory();

  const onClickLogin = () => {
    // close this menu
    // props.onClose();
    // navigate to the login page
    props.history.push("/login");
  };

  const onClickLogout = () => {
    // trigger redux logout action
    props.dispatch(logout());
    // close this menu
    // props.onClose();
    // navigate to the home page
    props.history.push("/");
  };


  //TODO: Change the logo to .svg
  //TODO: Find a better icon for Garage
  //TODO: Colors?

  return (
    <div className="Header">
      <Navbar
        bg="#85A582"
        variant="dark"
        sticky="top"
        className="header-navbar navbar fixed-top justify-content-between"
      >
        <NavbarBrand href="/">
          <img
            src={logo}
            style={{ width: 200, marginTop: -7, marginBottom: -10 }}
          />
        </NavbarBrand>
        <Nav className="d-flex flex-sm-grow-1 justify-content-center">
          <Form className="w-50">
            <InputGroup className="input-group">
              <Form.Control
                type="text"
                className="form-control border border-right-0"
                placeholder="Search for an item or a hashtag"
              />
              <span className="input-group-append">
                <Button
                  className="btn shadow-none border-left-0"
                  variant="light"
                >
                  <Search size={18} className="text-white my-lg-1" />
                </Button>
              </span>
            </InputGroup>
          </Form>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link href="#cart">
            <Cart3 size={28} />
          </Nav.Link>
          {user.user == null ? (
              <Nav.Link href="/yourgarage">
                <House size={28} />
              </Nav.Link>
          ) : (getGarageByUser(user.user._id) == null) ? (
              <Nav.Link href="/garage">
                <House size={28} />
              </Nav.Link>
              ) : <Nav.Link href="/delivery">
            <House size={28} />
          </Nav.Link>
          }

          <NavDropdown alignRight title={<PersonCircle size={28} />}>
          {user.user == null ? (
                  <div>
                   <NavDropdown.Item onClick={onClickLogin}>Login</NavDropdown.Item>
                  </div>
                ) :  <div> 
                  <NavDropdown.Item onClick={onClickLogout}>Logout</NavDropdown.Item> </div> }
          </NavDropdown>
        </Nav>
      </Navbar>
      <CategoryBar />
    </div>
  );
};

// attributes of props and their type
Header.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.element,
  open: PropTypes.bool.isRequired,
};

export default connect()(withRouter(Header));
