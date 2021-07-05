import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    FormCheck,
    FormGroup,
    FormLabel,
    ListGroup,
} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import {Clock, PlusLg} from "react-bootstrap-icons";

import "./GarageCreation.css"
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import GarageService from "../services/GarageService";
import ItemCreation from "../views/ItemView";
import GarageItem from "./GarageItem";
//import ItemList from "./ItemList";

const GarageCreation = (props) => {
    const history = useHistory();

    const [dateCreated, setDateCreated] = React.useState("");
    const [isPromoted, setIsPromoted] = React.useState("");
    const [discount, setDiscount] = React.useState("");
    const [bargain, setBargain] = React.useState("");
    const [shipmentType, setShipmentType] = React.useState("");
    const [items, setItems] = React.useState([]);

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
        setItems(JSON.parse(JSON.stringify(props.garage.items)));
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
        back.items = items;

        return back;
    };

    // indicates whether the garage can be changed
    const [editMode, setEditMode] = React.useState(null);

    const onChangeDateCreated = (e) => {
        setDateCreated(e.target.value);
    };

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

    const onAddItems = async (newItem) => {
        await GarageService.addItem(props.garage._id, newItem);
        let items = await GarageService.getItems(props.garage._id);
        setItems(items);
    }
    
    const onRemoveItems = async (removedItem) => {
        removedItem.preventDefault();
        let items = await GarageService.getItems(props.garage._id);
        await items.deleteItem(removedItem);
        setItems(items);
        //setItems.filter(item => item !== removedItem._id);
    };

    const onRemoveGarage = (garage) => {
        garage.preventDefault();
        setItems([...setItems]);
    };


    const getDate = (today) => {
        let day = new Date();
        if ( today){
            return day.getDate() + '.' + (day.getMonth()+1) + '.' + day.getFullYear();
        }
        return day.getDate() + '.' + (day.getMonth()+2) + '.' + day.getFullYear();
    }

    return(

        <div>
            <h1 className="myGarage text-center">My Garage</h1>
            <div className="w-100" style={{paddingInline:50}}>
                <div className="d-flex justify-content-between">
                    <div className="d-inline-block">
                        <FormGroup style={{marginTop: 60}}>
                            <div className="garageOptions">
                                <FormLabel>Garage Sale Options</FormLabel>
                                <FormCheck>
                                    <FormCheckInput
                                        isValid
                                    />
                                    <FormCheck.Label >{`Discount for multiple item selection`}</FormCheck.Label>
                                </FormCheck>
                                <FormCheck>
                                    <FormCheckInput isValid />
                                    <FormCheck.Label>{`Bargain offers`}</FormCheck.Label>
                                </FormCheck>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="garageOptions">
                                <FormLabel>Delivery</FormLabel>
                                <FormCheck>
                                    <FormCheckInput isValid />
                                    <FormCheck.Label>{`Shipment`}</FormCheck.Label>
                                </FormCheck>
                                <FormCheck>
                                    <FormCheckInput isValid />
                                    <FormCheck.Label>{`Pick-up`}</FormCheck.Label>
                                </FormCheck>
                            </div>
                        </FormGroup>
                        <div className="d-inline-flex justify-content-center" style={{marginBottom:-20}}>
                            <div style={{marginRight:10, marginTop:10}}><Clock/></div>
                            <FormGroup style={{fontStyle: "italic"}}>
                                <FormLabel>Beginning Date: {getDate(true)}</FormLabel>
                                <br/>
                                <FormLabel>Ending Date: {getDate(false)}</FormLabel>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="d-inline-block" style={{paddingRight: 40, width: 600}}>
                       <ItemCreation
                          //items={itemList}
                       />
                    </div>
                </div>
            </div>
        </div>

    );
}


// attributes of props and their type
GarageCreation.propTypes = {
    
    onSave: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
   
    item: PropTypes.object,
};

export default GarageCreation


