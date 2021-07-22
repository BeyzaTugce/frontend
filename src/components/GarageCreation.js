import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import "./GarageCreation.css";

import {Button, FormGroup, FormLabel, Alert} from "react-bootstrap";
import { Clock } from "react-bootstrap-icons";

import ItemCreation from "./ItemCreation";


const GarageCreation = (props) => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);

  //const [dateCreated, setDateCreated] = useState("");
  const [isPromoted, setIsPromoted] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [bargain, setBargain] = useState(false);
  const [shipment, setShipment] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isCreated, setIsCreated] = useState(false);


  // for extracting the attributes of the given garage to the appropriate state variables
  const extractGarage = () => {
    if (!props.garage) {
      return;
    }
    setIsPromoted(props.garage.isPromoted);
    setDiscount(props.garage.discount);
    setBargain(props.garage.bargain);
    setShipment(props.garage.shipment);
    setPickup(props.garage.pickup);
  };

  // creating a object with all relevant data to update or create a changed garage
  const packGarage = () => {
    let back = {
      ...props.garage,
    };
    back.user = user._id;
   // back.isPromoted = isPromoted;
    back.discount = discount;
    back.bargain = bargain;
    back.pickup = pickup;
    back.shipment = shipment;

    return back;
  };

  useEffect(() => {
    extractGarage();
  }, [props.garage] );

  useEffect(() => {
    if ( (shipment || pickup) && !isCreated)
      setDisabled(false);
    else
      setDisabled(true);
  }, [shipment, pickup]);


  // indicates whether the garage can be changed
  const [editMode, setEditMode] = React.useState(null);

  const onChangeIsPromoted = (e) => {
    setIsPromoted(e.target.checked);
  };

  const onChangeDiscount = (e) => {
    setDiscount(e.target.checked);
  };

  const onChangeBargain = (e) => {
    setBargain(e.target.checked);
  };

  const onChangeShipment = (e) => {
    setShipment(e.target.checked);

  };
  const onChangePickUp = (e) => {
    setPickup(e.target.checked);
  };

  const onCreate = (e) => {
    //e.preventDefault();
    if (!isCreated){
      setIsCreated(true);
      props.onCreate(packGarage());
      setDisabled(true);
    }
  }


  const getDate = (today) => {
    let day = new Date();
    let dd = day.getDate();
    let mm = day.getMonth();
    let mmUntil = day.getMonth() + 1;
    let yyyy = day.getFullYear();
    if(dd < 10)
      dd='0'+dd;
    if(mm < 10)
      mm='0'+mm;
    
    const startDate = dd+'.'+mm+'.'+yyyy;
    const endDate = dd+'.'+mmUntil+'.'+yyyy;
    if (today) {
      return (
        startDate
      );
    }
    return endDate
  };


  return (
    <div>
      <h1 className="myGarage text-center">My Garage</h1>
      <div className="w-100" style={{ paddingInline: 50 }}>
        <div className="d-flex justify-content-between">
          <div className="d-inline-block">
            <FormGroup style={{ marginTop: 60 }}>
              <div className="garageOptions">
                <FormLabel className="labels">Garage Sale Options</FormLabel>
                <div>
                  <label>
                    Discount for multiple item selection
                    <input className="ml-2"
                      name="discount"
                      type="checkbox"
                      onChange={onChangeDiscount} />
                  </label>
                </div>
                <div>
                  <label>
                    Bargain offers
                    <input className="ml-2"
                      name="bargain"
                      type="checkbox"
                      onChange={onChangeBargain} />
                  </label>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <div className="garageOptions">
                <FormLabel className="labels">Delivery</FormLabel>
                <div>
                  <label>
                    Shipment
                    <input className="ml-2"
                      name="shipment"
                      type="checkbox"
                      onChange={onChangeShipment} />
                  </label>
                </div>
                <div>
                  <label>
                    Pick-up
                    <input className="ml-2"
                      name="pick-up"
                      type="checkbox"
                      onChange={onChangePickUp} />
                  </label>
                </div>
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
                garageCreated={props.garageCreated}
            />
          </div>
        </div>
        {disabled && !isCreated ?
          <Alert className="mb-5 mt-5" variant="danger">
            <Alert.Heading>Please select at least one delivery option to create your garage!</Alert.Heading>
          </Alert> : (isCreated ? <Alert className="mb-5 mt-5" variant="danger">
              <Alert.Heading>You have successfully created your garage! Let's add some items!</Alert.Heading>
            </Alert> : <p></p>)
        }
        {disabled ?
        <Button
            className="d-flex align-content-end"
            variant="secondary"
            size="lg"
            style={{marginLeft: 1065, marginTop:10}}
            disabled={disabled}
            onClick={onCreate}
        >Create</Button>
        :
        <Button
            className="d-flex align-content-end"
            variant="success"
            size="lg"
            style={{marginLeft: 1065, marginTop:10}}
            disabled={disabled}
            onClick={onCreate}
        >Create</Button>
        }
      </div>
    </div>
  );
};

GarageCreation.propTypes = {
  newItem: PropTypes.object,
  garage: PropTypes.object,
  garageCreated: PropTypes.bool,
};

export default GarageCreation;
