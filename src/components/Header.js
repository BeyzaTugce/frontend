import React, {useEffect, useState} from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import CategoryBar from "./CategoryBar";
import store from '../redux/store';
import {
  Button,
  Form,
  NavDropdown,
  Nav,
  Navbar,
  NavbarBrand,
  InputGroup,
} from "react-bootstrap";
import {Cart3, House, PersonCircle, Search} from "react-bootstrap-icons";
import logo from "../resources/logo.png";
import { logoutNew, loadUser } from "../redux/actions/AuthActions";
import {getGarages} from "../redux/actions/GarageActions";
import {getItems} from "../redux/actions/ItemActions";


/**
 * Navigation bar of the app
 * @param {props} props
 */
const Header = ({auth}) => {
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
    store.dispatch(loadUser());
    store.dispatch(getGarages());
    store.dispatch(getItems());
  }, [] );

  const onMyGarage = () => {
    //store.dispatch(loadUser());
    store.dispatch(getGarages());
    if (isAuthenticated){
      if (garage?.garages?.garages?.filter(g => g.user === user._id).length === 0){
        history.push("/garage");
      }
      else{
        garage?.garages?.garages?.filter(g => g.user === user._id).map(  g => {history.push("/garage/"+g._id)});
      }
    } else {
      history.push("/yourgarage");
    }
  };

  const onMyPurchases = () => {
    history.push("/mypurchase");
  };

  const onClickSignUp = () => {
    history.push("/signup");
  };

  const onClickLogin = () => {
    history.push("/login");
  };

  const onClickLogout = () => {
    store.dispatch(logoutNew());
    history.push("/home");
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
        <NavbarBrand href="/home">
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
                onChange={
                  e => {setSearchTerm(e.target.value)}}
              />
              <span className="input-group-append">
                <Button
                  className="search-btn shadow-none border-left-0"
                  variant="light"
                  href={`/search?term=${debouncedTerm}`}
                >
                  <Search size={18} className="text-white my-lg-1" />
                </Button>
              </span>
            </InputGroup>
          </Form>
        </Nav>
        <Nav className="justify-content-end">
          {isAuthenticated ? (
              <div>
                <span className="navbar-text mr-2">
                  <strong>{user ? `Welcome ${user.username}` : ''}</strong>
                </span>
              </div>
          ) : ("")
          }
          <Nav.Link alignRight onClick={onMyGarage} style={{marginTop:-3}}>
            <House size={28}/>
          </Nav.Link>
          <NavDropdown alignRight title={<PersonCircle size={28} />} style={{marginTop:-3}}>
          {!isAuthenticated ? (
                  <div>
                    <NavDropdown.Item onClick={onClickSignUp}>Sign Up</NavDropdown.Item>
                    <NavDropdown.Item onClick={onClickLogin}>Login</NavDropdown.Item>
                  </div>
                ) :  (<div>
                  <NavDropdown.Item onClick={onMyPurchases}>My Purchases</NavDropdown.Item>
                  <NavDropdown.Item onClick={onClickLogout}>Log out</NavDropdown.Item> </div> )}
          </NavDropdown>
        </Nav>
      </Navbar>
      <CategoryBar />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,

});

export default connect(mapStateToProps, null)(withRouter(Header));
