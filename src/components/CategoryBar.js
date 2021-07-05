import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./CategoryBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CategoryBar = (props) => {
  //TODO: Colors?
  return (
    <div className="CategoryBar">
      <Navbar className="navbar-links" variant="dark">
        <Nav className="mr-auto text-white">
          <Nav.Link href="#sales">Today's Sales</Nav.Link>
          <Nav.Link href="#fashion">Fashion</Nav.Link>
          <Nav.Link href="#furniture">Furniture</Nav.Link>
          <Nav.Link href="#books">Books</Nav.Link>
          <Nav.Link href="#electronics">Electronics</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default CategoryBar;
