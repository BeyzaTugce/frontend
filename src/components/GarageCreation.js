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

const GarageCreation = (props) => {

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
                        <ListGroupItem className="d-inline-flex align-items-center justify-content-between" style={{borderColor: "#85A582"}}>
                            <FormCheck
                                type="checkbox"
                                id="item-checkbox"
                                style={{marginInline:17, marginRight:30}}
                            />
                            <div
                                className="img-container d-flex align-items-center"
                                style={{width:100, height:100, textAlign:"center", marginRight:30}}
                            >
                                <Image
                                    className="item-image"
                                    src={logo}
                                    fluid
                                />
                            </div>
                            <div className="name-and-tags flex-fill">
                                <div className="item-name">Some Item</div>
                                <div className="item-tags text-black-50" style={{fontSize:14}}>#all #tags #here</div>
                            </div>
                            <div className="justify-content-end d-inline-flex align-items-center justify-content-end">
                                <Button
                                    className='btn'
                                    variant="dark"
                                    style={{backgroundColor: "#85A582"}}
                                >
                                    Edit
                                </Button>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        </div>

    );
}


export default GarageCreation
