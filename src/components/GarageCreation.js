import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Button,
    Col,
    Container,
    FormCheck,
    FormGroup,
    FormLabel,
    FormControl,
    ListGroup,
    ListGroupItem, Nav,
    Row, TabContent, TabPane, TabContainer
} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import {Clock, PlusLg} from "react-bootstrap-icons";

import "./GarageCreation.css"
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import GarageItem from "./GarageItem";
import ItemComponent from "./ItemComponent";

const GarageCreation = (props) => {
    const history = useHistory();

    const [dateCreated, setDateCreated] = React.useState("");
    const [isPromoted, setIsPromoted] = React.useState("");
    const [discount, setDiscount] = React.useState("");
    const [bargain, setBargain] = React.useState("");
    const [shipmentType, setShipmentType] = React.useState("");
    const [items, setItems] = React.useState([]);
    const [itemTags, setItemTags] = React.useState("");
    const [itemPrice, setItemPrice] = React.useState("");
    const [itemInfo, setItemInfo] = React.useState("");
    const [itemTitle, setItemTitle] = React.useState("");

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


    const onChangeItemInfo = (e) => {
        setItemInfo(e.target.value);
    };
    const onChangeItemPrice = (e) => {
        setItemPrice(e.target.value);
    };
    const onChangeItemTags = (e) => {
        setItemTags(e.target.value);
    };
    const onChangeItemTitle = (e) => {
        setItemTitle(e.target.value);
    };

    const onChangeShipmentType = (e) => {
        setShipmentType(e.target.value);
    };

    
    const onRemoveItems = (removedItem) => {
        removedItem.preventDefault();
        setItems.filter(item => item !== removedItem._id);

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
                       <ItemComponent 
                          item={props.item}
                          onSave={
                              props.onSave
                          }
                          onCreate={
                            props.onCreate
                        }
            
                       
                       />
                    </div>
                </div>
                <div><FormLabel className="addItems">Added Items</FormLabel></div>
                <div className="list-whole">
                    <ListGroup>
                        <GarageItem/>
                    </ListGroup>
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
