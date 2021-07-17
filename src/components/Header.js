import React, {useEffect, useState} from "react";
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
import {Cart3, House, PersonCircle, Search} from "react-bootstrap-icons";
import "./Header.css";
import { connect, useSelector } from "react-redux";
import logo from "../views/logo.png";
import { logoutNew } from "../redux/actions/AuthActions";
import store from '../redux/store';
import {getGarages} from "../redux/actions/GarageActions"
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
const Header = ({ auth, props }) => {
  const { isAuthenticated, user } = auth;

  const garage = useSelector((state) => state.garage);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const history = useHistory();

  //Set search item with debouncing
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 100);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);


  useEffect(() => {
    store.dispatch(getGarages());
  }, [] );

  const onClickSearch = () => {
    //event.preventDefault();
    history.push(`/search?term=${debouncedTerm}`);
    //props.onSearchSubmit(debouncedTerm);
  };

  const onMyGarage = () => {
    store.dispatch(getGarages());
    if (garage.garages.garages.filter(g => g.user == user._id).length === 0){
      history.push("/garage");
    }
    else{
      garage.garages.garages.filter(g => g.user == user._id).map(  g => {history.push("/garage/"+g._id)});
    }
  };

  const onClickCreateGarage = () => {
    history.push("/yourgarage");
  };

  const onClickLogin = () => {
    history.push("/login");
  };

  const onClickLogout = () => {
    store.dispatch(logoutNew());
    // props.onClose();
    history.push("/");
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
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <span className="input-group-append">
                <Button
                  className="btn shadow-none border-left-0"
                  variant="light"
                  onClick={onClickSearch}
                >
                  <Search size={18} className="text-white my-lg-1" />
                </Button>
              </span>
            </InputGroup>
          </Form>
        </Nav>
        <Nav className="justify-content-end">
          {isAuthenticated ? (
              <Nav.Link>
                <span className="navbar-text mr-3">
                  <strong>{user ? `Welcome ${user.username}` : ''}</strong>
                </span>
              </Nav.Link>
          ) : ("")
          }
          <Nav.Link href="#cart">
            <Cart3 size={28} />
          </Nav.Link>

          <NavDropdown alignRight title={<House size={28} />}>
            {!isAuthenticated ? (
                <div>
                  <NavDropdown.Item onClick={onClickCreateGarage}>SignUp</NavDropdown.Item>
                </div>
            ) :  <div>
              <NavDropdown.Item onClick={onMyGarage}>MyGarage</NavDropdown.Item> </div> }
          </NavDropdown>
          <NavDropdown alignRight title={<PersonCircle size={28} />}>
          {!isAuthenticated ? (
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

const mapStateToProps = state => ({
  auth: state.auth
});


// //attributes of props and their type
// Header.propTypes = {
//   //onClose: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, null)(withRouter(Header));
