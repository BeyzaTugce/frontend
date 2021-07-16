import React, {useEffect} from "react";
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
  const [allGarages, setAllGarages] = React.useState([]);
  const [myGaragePath, setMyGaragePath] = React.useState(false);

  const history = useHistory();

  useEffect(() => {
    store.dispatch(getGarages());
    //setAllGarages(garage.garages);
  }, [] );

  //console.log(garage.garages.garages.filter(g => g.user == user._id).length);
  //garage.garages.garages.filter(g => g.user == user._id).map( g => {id = g._id});

  let path = ""
  const onMyGarage = () => {
    //setMyGaragePath(!myGaragePath);
    if (garage.garages.garages.filter(g => g.user == user._id).length === 0){
      //props.history.push("/garage");
      path = "/garage"
    }
    else{
      garage.garages.garages.filter(g => g.user == user._id).map(  g => {path = "/garage"+g._id});
    }
  };

  const onClickLogin = () => {
    // close this menu
    // props.onClose();
    // navigate to the login page
    history.push("/login");
  };

  const onClickLogout = () => {
    // trigger redux logout action
    store.dispatch(logoutNew());
    // close this menu
    // props.onClose();
    // navigate to the home page
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
          {!isAuthenticated ? (
              <Nav.Link href="/yourgarage">
                <House size={28} />
              </Nav.Link>
          ) : <Nav.Link href="/garage">
            <House size={28} />
          </Nav.Link>
          }

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
