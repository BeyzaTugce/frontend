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
    Image,
    ListGroup,
    ListGroupItem, Nav,
    Row, TabContent, TabPane, TabContainer
} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import {Clock, PlusLg} from "react-bootstrap-icons";

import "./GarageCreation.css"
import logo from "../views/logo.png";
import GarageItem from "./GarageItem";

const GarageCreation = (props) => {

    const [dateCreated, setDateCreated] = React.useState("");
    const [isPromoted, setIsPromoted] = React.useState("");
    const [discount, setDiscount] = React.useState("");
    const [bargain, setBargain] = React.useState("");
    const [shipmentType, setShipmentType] = React.useState("");
    const [items, setItems] = React.useState([]);


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

    const onAddItems = (item) => {
        setItems([...setItems, item]);
    };

    const onRemoveItem = (index) => {
        items.splice(index, 1);
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
                                    <FormCheckInput isValid />
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
                        <Button className="button-rounded">
                            <PlusLg></PlusLg>
                        </Button>
                        <FormLabel className="frame">Add Item</FormLabel>
                        <ListGroup>
                            <ListGroupItem className="d-flex align-items-start">
                                <TabContainer id="left-tabs-example" defaultActiveKey="info">
                                    <Row>
                                        <Col sm={3}>
                                            <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="item">Item Title</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="info">General Information</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="price">Price</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="tag">Tags</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={9}>
                                            <TabContent>
                                                <TabPane eventKey="item">
                                                    <FormControl type="title" placeholder="Enter item title" style={{marginLeft:15}}/>
                                                </TabPane>
                                                <TabPane eventKey="info">
                                                    <FormControl type="info" placeholder="Write about your item" style={{marginLeft:15, marginTop:75}}/>
                                                </TabPane>
                                                <TabPane eventKey="price">
                                                    <FormControl type="price" placeholder="Enter item price" style={{marginLeft:15, marginTop:130}}/>
                                                </TabPane>
                                                <TabPane eventKey="tag">
                                                    <FormControl type="tag" placeholder="Enter some tags" style={{marginLeft:15, marginTop:170}}/>
                                                </TabPane>
                                            </TabContent>
                                        </Col>
                                    </Row>
                                </TabContainer>
                            </ListGroupItem>
                        </ListGroup>
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


export default GarageCreation
