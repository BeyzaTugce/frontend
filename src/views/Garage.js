import React from "react";
import {Button, FormCheck, Image, ListGroup, ListGroupItem} from "react-bootstrap";
import logo from "./logo.png";
import "./Garage.css"

function App() {
/*
    TODO: After backend get the garage items using GarageItem.js with this method
    const renderedList = garageItems.map(garageItem => {
        return <GarageItem
            key={id-here}
            item={item}
        />;
    });
*/

    //TODO: "Select All" button color
    //TODO: Bargain and buy buttons do not light up when clicked.
    return (
        <div className="Garage">
            <span>
                <div className="jumbotron jumbotron-fluid bg-white" style={{marginBottom:-10}}>
                    <h1 className="display-5 text-center">Beyza's Garage</h1>
                    <em>
                        <p className="lead text-black-50 text-sm-center" style={{fontSize:17}}>
                            Schwabing-Freimann 80805 <br />until 26.07.2021
                        </p>
                    </em>
                </div>
                <div className="select-all-button-field" style={{paddingInline:50}}>
                    <Button
                        className="btn select-all-button"
                        variant="light"
                        style={{color:"black", borderColor:"lightgray"}}
                    >
                        <div style={{fontSize:14}}>Select all</div>
                    </Button>
                </div>
                <div className="list-whole w-100" style={{paddingInline:50}}>
                    <ListGroup>
                        <ListGroupItem className="garage-item d-inline-flex align-items-center justify-content-between">
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
                                <div className="item-price" style={{marginRight:15}}>€30</div>
                                <Button
                                    className='btn'
                                    variant="dark"
                                    style={{backgroundColor: "#A282A5", marginRight:8}}
                                >
                                    Bargain
                                </Button>
                                <Button
                                    className='btn'
                                    variant="dark"
                                    style={{backgroundColor: "#85A582"}}
                                >
                                    Buy
                                </Button>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem className="d-inline-flex align-items-center justify-content-between">
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
                                <div className="item-price" style={{marginRight:15}}>€30</div>
                                <Button
                                    className='btn border-0'
                                    variant="dark"
                                    style={{backgroundColor: "#A282A5", marginRight:8}}
                                >
                                    Bargain
                                </Button>
                                <Button
                                    className='btn border-0 text-white'
                                    variant="light"
                                    style={{backgroundColor: "#85A582"}}
                                >
                                    Buy
                                </Button>
                            </div>
                        </ListGroupItem>
                    </ListGroup>

                    <div className="price-info-text text-center" style={{marginTop:25, marginBottom:25}}>
                        <div className="total-price-text">Total price: €60</div>
                        <div className="saving-text">Saving: €10</div>
                        <div className="amount-to-pay-text">Amount to Pay: €50</div>
                        <div className="promotional-sentence-text text-danger">You can save up to 10% by choosing 1 more item!</div>
                    </div>
                    <div className="bargain-buy-buttons d-flex align-items-center justify-content-center">
                        <Button
                            className='btn border-0'
                            variant="dark"
                            style={{backgroundColor: "#A282A5", marginRight:8}}
                        >
                            Bargain for Selected Items
                        </Button>
                        <Button
                            className='btn border-0 text-white'
                            variant="light"
                            style={{backgroundColor: "#85A582"}}
                        >
                            Buy Selected Items
                        </Button>
                    </div>
                </div>
            </span>
        </div>
    );
}

export default App;