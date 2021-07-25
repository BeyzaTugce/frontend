import React, {useEffect, useState} from "react";
import {useHistory, withRouter} from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Header from "../components/Header";
import {Button, Carousel, ListGroup, ListGroupItem,} from "react-bootstrap";
import logo from "../resources/logo.png";
import logo2 from "../resources/logo2.png";
import comingsoon from "../resources/coming-soon.png";
import comingsoon2 from "../resources/coming-soon2.png";
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

    const handleClick = (e) => {
        history.push("/garage/"+e.target.value);
    }

    useEffect(() => {
        if ( items.items !== undefined && items.items !== null) {
            items.items.items?.map( item =>
            {
                renderedList.push(
                    <ListGroupItem
                        className="d-inline-flex align-items-center justify-content-between border"
                        style={{ borderColor: "#85A582", width: 250, height: 400}}
                    >
                        <div className="content flex-fill text-center">
                            <div className="item-name" type="name" required style={{ fontWeight:"bold" }}>
                                {item.name}
                            </div>
                            <div
                                className="item-tags text-black-50"
                                type="name"
                            >
                                {item.tags.map(tag => "#"+tag+" ")}
                            </div>
                            <div className="img-container d-flex align-items-center"
                                 style={{width: 200, height: 200, textAlign: "center",}}
                            >
                                <img
                                    className="img my-auto d-block"
                                    src={item.image[0]}
                                    maxHeight= "200"
                                    width="200"
                                    alt={item.name}>
                                </img>
                            </div>
                            <div className="garage-name">At {item.username}'s Garage</div>
                            <div className="garage-name">Ends on {new Date (item.deadline).toLocaleDateString()}</div>
                            <div className="item-price" style={{ fontWeight:"bold" }}>€{item.price}</div>
                            <Button
                                className="btn-green border-0"
                                variant="light"
                                value={item.garageId}
                                onClick={handleClick}
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
            <div className="jumbotron jumbotron-fluid" style={{backgroundColor: "white", marginBottom:-50}}>
                <div className="container"><Carousel>
                    <Carousel.Item style={{maxHeight:400}}>
                        <img
                            className="d-block w-100"
                            src={logo}
                            alt="MyGarage"
                            height="400"
                        />
                    </Carousel.Item>
                    <Carousel.Item style={{maxHeight:400}}>
                        <img
                            className="d-block w-100"
                            src={comingsoon}
                            alt="Coming Soon"
                            height="400"
                        />
                    </Carousel.Item>
                    <Carousel.Item style={{maxHeight:400}}>
                        <img
                            className="d-block w-100"
                            src={comingsoon2}
                            alt="Coming Soon"
                            height="400"
                        />
                    </Carousel.Item>
                    <Carousel.Item style={{maxHeight:400}}>
                        <img
                            className="d-block w-100"
                            src={logo2}
                            alt="MyGarage"
                            height="400"
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
