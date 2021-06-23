import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header/Header";
import {Button, Col, Container, FormCheck, FormGroup, FormLabel, Row} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import {Book, PlusLg} from "react-bootstrap-icons";
import "./GarageCreation.css"

const GarageCreation = (props) => {

    return(

        <div>
            <Header />
            <Container>
                <Row>
                    <FormLabel className="myGarage">My Garage</FormLabel>
                </Row>
                <Row>
                    <Col md={{ span: 4}}>
                        <FormGroup>
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
                        <div>

                        </div>
                    </Col>
                    <Col md={{ span: 3, offset: 3 }}>
                        <Button className="button-rounded">
                            <PlusLg></PlusLg>
                        </Button>
                        <FormLabel className="frame">Add Item</FormLabel>
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
                    </Col>
                </Row>
                <Row><FormLabel className="addItems">Add Items</FormLabel></Row>
                <Row>
                    <div className="addItemTable">
                        <div className="itemImage"><Book></Book></div>
                        <FormLabel className="itemName">Some Book</FormLabel>
                    </div>
                    <div className="addItemTable">
                        <FormCheck className="addItemCheckBox">
                            <FormCheck.Input></FormCheck.Input>
                        </FormCheck>
                    </div>

                </Row>
            </Container>

        </div>

    );
}


export default GarageCreation
