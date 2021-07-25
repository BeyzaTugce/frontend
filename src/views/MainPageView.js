import React, {useEffect, useState} from "react";
import {useHistory, withRouter} from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Header from "../components/Header";
import {Button, Carousel, ListGroup, ListGroupItem,} from "react-bootstrap";
import logo from "./logo.png";
import {getGarages} from "../redux/actions/GarageActions"
import store from "../redux/store";
import {getItems} from "../redux/actions/ItemActions";


function MainPageView(props) {
    const [carouselItems, setCarouselItems] = useState([]);
    const garage = useSelector((state) => state.garage);
    const items = useSelector((state) => state.items);

    const [foundItems, setFoundItems] = React.useState([]);

    let garageReached = false;
    let itemReached = false;
    let renderedList = [];

    const history = useHistory();

    useEffect(() => {
        store.dispatch(getItems());
        store.dispatch(getGarages());
    }, [garageReached === false, itemReached === false]);

    useEffect(() => {
        if (garage.garages !== undefined && garage.garages !== null) {
            garageReached = true;
        }
        if (items.items !== undefined && items.items !== null) {
            itemReached = true;
        }
    }, [garage.garages, garageReached === false, items.items, itemReached === false]);

    useEffect(() => {
        if (garage.garages !== undefined && garage.garages !== null && items.items !== undefined && items.items !== null) {
            items.items.items?.map( item =>
            {
                renderedList.push(
                    <ListGroupItem
                        className="d-inline-flex align-items-center justify-content-between border"
                        style={{ borderColor: "#85A582"}}
                    >
                        <div className="content flex-fill text-center">
                            <div className="item-name" type="name" required style={{ fontSize: 18, fontWeight:"bold" }}>
                                {item.username}
                            </div>
                            <div
                                className="item-tags text-black-50"
                                type="name"
                            >
                                {item.tags.map(tag => "#"+tag+" ")}
                            </div>
                            <div className="img-container d-flex align-items-center"
                                 style={{width: 200, height: 200, textAlign: "center",}}
                            />
                            <div className="garage-name">At {item.username}'s Garage</div>
                            <div className="garage-name">Ends on 10.10.2021</div>
                            <div className="item-price" style={{ fontWeight:"bold" }}>€30</div>
                            <Button
                                className="btn-green border-0"
                                variant="light"
                                //onClick={history.push("/garage/"+item.garageId)}
                            >
                                Go to garage
                            </Button>
                        </div>
                    </ListGroupItem>
                )
            });
            setFoundItems(renderedList);
            console.log("rendered"+renderedList);
        }
    }, [garage.garages, garageReached, items.items, itemReached]);

    /*
    useEffect(() => {
        store.dispatch(getGarages());
        setCarouselItems(garage.garages)
    }, [] );

    const renderedListCarousel = carouselItems.map((carouselItem) => {
        return (
            <MainPageCarouselComponent
                name={carouselItem.}
                info={carouselItem.info}
                tags={carouselItem.tags}
                price={carouselItem.price}
            />
        );
    });
    */




    return (
        <div>
            <Header/>
            <div className="jumbotron jumbotron-fluid" style={{backgroundColor: "white"}}>
                <div className="container"><Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={logo}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={logo}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={logo}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
                </div>
            </div>
            <div className="jumbotron jumbotron-fluid text-center" style={{backgroundColor: "white", marginInline:100}}>
                <ListGroup className="d-inline-block">
                    {foundItems}
                </ListGroup>
                <div className="jumbotron jumbotron-fluid text-center" style={{backgroundColor: "white"}}>
                    <ListGroup className="d-inline-block w-100">
                        <ListGroupItem
                            className="d-inline-flex align-items-center justify-content-between border w-50"
                            style={{ borderColor: "#85A582"}}
                        >
                            <div className="content flex-fill text-center">
                                <div className="item-name" type="name" required style={{ fontSize: 18, fontWeight:"bold" }}>
                                    Berke's Garage
                                </div>
                                <div className="item-name" type="name" required style={{ fontSize: 16}}>
                                    Ends on 10.10.2021
                                </div>
                                <div className="Item-container d-inline-flex justify-content-center" style={{height:250}}>
                                    <div className="item-info-container d-inline-block align-items-center">
                                        <div className="img-container d-flex justify-content-center"
                                             style={{width: 200, height: 200}}>
                                            <img className="img my-auto d-block"
                                                 src={logo}
                                                 style={{maxWidth: 200}}/>
                                        </div>
                                        <div className="item-price" style={{ fontWeight:"bold" }}>€30</div>
                                    </div>
                                    <div className="item-info-container d-inline-block align-items-center">
                                        <div className="img-container d-flex justify-content-center"
                                             style={{width: 200, height: 200}}>
                                            <img className="img my-auto d-block"
                                                 src={logo}
                                                 style={{maxWidth: 200}}/>
                                        </div>
                                        <div className="item-price" style={{ fontWeight:"bold" }}>€30</div>
                                    </div>
                                    <div className="item-info-container d-inline-block align-items-center">
                                        <div className="img-container d-flex justify-content-center"
                                             style={{width: 200, height: 200}}>
                                            <img className="img my-auto d-block"
                                                 src={logo}
                                                 style={{maxWidth: 200}}/>
                                        </div>
                                        <div className="item-price" style={{ fontWeight:"bold" }}>€30</div>
                                    </div>
                                </div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem
                            className="d-inline-flex align-items-center justify-content-between border w-50"
                            style={{ borderColor: "#85A582"}}
                        >
                            <div className="content flex-fill text-center">
                                <div className="item-name" type="name" required style={{ fontSize: 18, fontWeight:"bold" }}>
                                    Berke's Garage
                                </div>
                                <div className="item-name" type="name" required style={{ fontSize: 16}}>
                                    Ends on 10.10.2021
                                </div>
                                <div className="Item-container d-inline-flex justify-content-center" style={{height:250}}>
                                    <div className="item-info-container d-inline-block align-items-center">
                                        <div className="img-container d-flex justify-content-center"
                                             style={{width: 200, height: 200}}>
                                            <img className="img my-auto d-block"
                                                 src={logo}
                                                 style={{maxWidth: 200}}/>
                                        </div>
                                        <div className="item-price" style={{ fontWeight:"bold" }}>€30</div>
                                    </div>
                                    <div className="item-info-container d-inline-block align-items-center">
                                        <div className="img-container d-flex justify-content-center"
                                             style={{width: 200, height: 200}}>
                                            <img className="img my-auto d-block"
                                                 src={logo}
                                                 style={{maxWidth: 200}}/>
                                        </div>
                                        <div className="item-price" style={{ fontWeight:"bold" }}>€30</div>
                                    </div>
                                    <div className="item-info-container d-inline-block align-items-center">
                                        <div className="img-container d-flex justify-content-center"
                                             style={{width: 200, height: 200}}>
                                            <img className="img my-auto d-block"
                                                 src={logo}
                                                 style={{maxWidth: 200}}/>
                                        </div>
                                        <div className="item-price" style={{ fontWeight:"bold" }}>€30</div>
                                    </div>
                                </div>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        </div>
    );
}



export default connect()(withRouter(MainPageView));
