import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, FormCheck, FormGroup, FormLabel, ListGroup} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import { Clock, PlusLg } from "react-bootstrap-icons";

import "./GarageCreation.css";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ItemCreation from "../views/ItemView";
import GarageItem from "./GarageItem";
import garage from "../redux/reducers/garageReducer";
import {addGarage} from "../redux/actions";
//import ItemList from "./ItemList";

const GarageCreation = (props) => {
  const history = useHistory();

  const [dateCreated, setDateCreated] = React.useState("");
  const [isPromoted, setIsPromoted] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [bargain, setBargain] = React.useState("");
  const [shipmentType, setShipmentType] = React.useState("");
  //const [items, setItems] = React.useState([]);

  // for extracting the attributes of the given garage to the appropriate state variables
  const extractGarage = () => {
    if (!props.garage) {
      return;
    }
    setDateCreated(props.garage.dateCreated);
    setIsPromoted(props.garage.isPromoted);
    setDiscount(props.garage.discount);
    setBargain(props.garage.bargain);
    setShipmentType(props.garage.shipmentType);
    //setItems(JSON.parse(JSON.stringify(props.garage.items)));
  };

  // creating a object with all relevant data to update or create a changed garage
  const packGarage = () => {
    let back = {
      ...props.garage,
    };

    back.dateCreated = dateCreated;
    back.isPromoted = isPromoted;
    back.discount = discount;
    back.bargain = bargain;
    back.shipmentType = shipmentType;
    //back.items = items;

    return back;
  };

  // indicates whether the garage can be changed
  const [editMode, setEditMode] = React.useState(null);

  const onChangeIsPromoted = (e) => {
    setIsPromoted(e.target.value);
  };

  const onChangeDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const onChangeBargain = (e) => {
    setBargain(e.target.value);
  };

  const onChangeShipmentType = (e) => {
    setShipmentType(e.target.value);
  };

  const onCreate = (e) => {
      e.preventDefault();
      props.onCreate(packGarage());
  }

  const getDate = (today) => {
    let day = new Date();
    if (today) {
      return (
        day.getDate() + "." + (day.getMonth() + 1) + "." + day.getFullYear()
      );
    }
    return day.getDate() + "." + (day.getMonth() + 2) + "." + day.getFullYear();
  };

  return (
    <div>
      <h1 className="myGarage text-center">My Garage</h1>
      <div className="w-100" style={{ paddingInline: 50 }}>
        <div className="d-flex justify-content-between">
          <div className="d-inline-block">
            <FormGroup style={{ marginTop: 60 }}>
              <div className="garageOptions">
                <FormLabel>Garage Sale Options</FormLabel>
                <FormCheck onClick={onChangeDiscount}>
                  <FormCheckInput isValid/>
                  <FormCheck.Label>{`Discount for multiple item selection`}</FormCheck.Label>
                </FormCheck>
                <FormCheck onClick={onChangeBargain}>
                  <FormCheckInput isValid />
                  <FormCheck.Label>{`Bargain offers`}</FormCheck.Label>
                </FormCheck>
              </div>
            </FormGroup>
            <FormGroup>
              <div className="garageOptions">
                <FormLabel>Delivery</FormLabel>
                <FormCheck onClick={onChangeShipmentType}>
                  <FormCheckInput isValid />
                  <FormCheck.Label>{`Shipment`}</FormCheck.Label>
                </FormCheck>
                <FormCheck onClick={onChangeShipmentType}>
                  <FormCheckInput isValid />
                  <FormCheck.Label>{`Pick-up`}</FormCheck.Label>
                </FormCheck>
              </div>
            </FormGroup>
            <div
              className="d-inline-flex justify-content-center"
              style={{ marginBottom: -20 }}
            >
              <div style={{ marginRight: 10, marginTop: 10 }}>
                <Clock />
              </div>
              <FormGroup style={{ fontStyle: "italic" }}>
                <FormLabel>Beginning Date: {getDate(true)}</FormLabel>
                <br />
                <FormLabel>Ending Date: {getDate(false)}</FormLabel>
              </FormGroup>
            </div>
          </div>
          <div className="d-inline-block" style={{ width: 800 }}>
            <ItemCreation
                garage={props.garage}
            />
          </div>
        </div>
        <Button
            className="d-flex align-content-end"
            style={{marginLeft: 1065, marginTop:10}}
            onClick={onCreate}
        >Create</Button>
      </div>
    </div>
  );
};

GarageCreation.propTypes = {
  //onCreate: PropTypes.func.isRequired,
  newItem: PropTypes.object,
};

export default GarageCreation;
