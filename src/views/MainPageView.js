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
    }, [itemReached === false]);

    useEffect(() => {
        if (items.items !== undefined && items.items !== null) {
            itemReached = true;
        }
    }, [items.items, itemReached === false]);


    useEffect(() => {
        if ( items.items !== undefined && items.items !== null) {
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
                            <div className="garage-name">Ends on {item.deadline}</div>
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
        }
    }, [garage.garages, garageReached, items.items, itemReached]);


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
            </div>
        </div>
    );
}



export default connect()(withRouter(MainPageView));
