import React from "react";
import {FormCheck, ListGroupItem} from "react-bootstrap";
import logo from "../views/logo.png"

const GarageItem = (props) => {
    return (
        <ListGroupItem className="d-inline-flex">
            <FormCheck
                type="checkbox"
                id="item-checkbox"
            />
            <img
                className="item-image"
                src={logo}
                style={{width:200}}
            />
        </ListGroupItem>
    );
};

export default GarageItem;