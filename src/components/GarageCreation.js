import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Buttons.css"
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
  const [optionsDisabled, setOptionsDisabled] = useState(false);


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
      setOptionsDisabled(true);
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
      <div
          className="jumbotron jumbotron-fluid bg-white"
          style={{ marginBottom: -10 }}>
        <h1 className="myGarage text-center">My Garage</h1>
      </div>
      <div className="container mb-sm-4">
        <div className="row mb-3">
          <div className="col-sm-4 mb-2 pb-3">
            <div className="bg-secondary p-4 text-dark">
              <FormGroup>
                <div className="garage-sale-options">
                  <FormLabel className="labels">Garage Sale Options</FormLabel>
                  <div>
                    <label>
                      <input className="ml-2"
                             name="discount"
                             type="checkbox"
                             onChange={onChangeDiscount}
                             style={{marginRight:15}}
                             disabled={optionsDisabled}
                      />
                      Discount for multiple item selection
                    </label>
                  </div>
                  <div>
                    <label>
                      <input className="ml-2"
                             name="bargain"
                             type="checkbox"
                             onChange={onChangeBargain}
                             style={{marginRight:15}}
                             disabled={optionsDisabled}
                      />
                      Bargain offers
                    </label>
                  </div>
                </div>
              </FormGroup>
            </div>
          </div>
          <div className="col-sm-4 mb-2">
            <div className="bg-secondary p-4 text-dark">
              <FormGroup>
                <div className="garage-delivery-options">
                  <FormLabel className="labels">Delivery<b>(*)</b></FormLabel>
                  <div>
                    <label>
                      <input className="ml-2"
                             name="shipment"
                             type="checkbox"
                             onChange={onChangeShipment}
                             style={{marginRight:15}}
                             disabled={optionsDisabled}
                      />
                      Shipment
                    </label>
                  </div>
                  <div>
                    <label>
                      <input className="ml-2"
                             name="pick-up"
                             type="checkbox"
                             onChange={onChangePickUp}
                             style={{marginRight:15}}
                             disabled={optionsDisabled}
                      />
                      Pick-up
                    </label>
                  </div>
                </div>
              </FormGroup>
            </div>
          </div>
          <div className="col-sm-4 mb-2">
            <div className="bg-secondary p-4 text-dark">
              <FormLabel className="labels"><Clock /></FormLabel>
              <FormGroup>
                <FormLabel>Beginning Date: {getDate(true)}</FormLabel>
                <br />
                <FormLabel>Ending Date: {getDate(false)}</FormLabel>
              </FormGroup>
            </div>
          </div>
        </div>
        <div className="mb-3">
          {disabled && !isCreated ?
              <div className="text-danger text-center">Please select at least one delivery option to create your garage!</div>
              : ""
          }
          <div className="d-flex align-items-center justify-content-center">
            {disabled ?
                <Button
                    className="btn-green mt-4 mb-4"
                    disabled={disabled}
                    onClick={onCreate}
                >Create</Button>
                :
                <Button
                    className="btn-green mt-4 mb-4"
                    disabled={disabled}
                    onClick={onCreate}
                >Create</Button>
            }
          </div>
          {isCreated ? <div className="text-success text-center">You have successfully created your garage! Let's add some items!</div>
                  : ""
          }
        </div>
      </div>
      {isCreated ?
          <ItemCreation className="d-flex align-items-center justify-content-center"
                        garage={props.garage}
                        garageCreated={props.garageCreated}
          />
          : ""
      }
    </div>
  );
};

GarageCreation.propTypes = {
  newItem: PropTypes.object,
  garage: PropTypes.object,
  garageCreated: PropTypes.bool,
};

export default GarageCreation;
