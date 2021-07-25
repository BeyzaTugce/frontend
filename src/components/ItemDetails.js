import React, { useEffect, useState } from "react";
import {getItem} from "../redux/actions/ItemActions";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {Carousel} from "react-bootstrap";


const ItemDetails = (props) => {

    let {match, getItem} = props;

    const item = useSelector((state) => state.items);
   
    useEffect(() => {
        let itemId = match.params.id;
        getItem(itemId)
    }, [match.params]);

    const imageList = item?.item?.image.map((item) => {
        return(
            <Carousel.Item interval={1000}
                           className="center-block"
            >
                <img
                    src={item}
                    alt={item.alt}
                    style={{maxHeight:300}}

                />
            </Carousel.Item>);
    })

    return(
        <div className="d-inline-block justify-content-center align-items-center text-center w-100">
            <div
                className="jumbotron jumbotron-fluid bg-white"
                style={{ marginTop: -10, marginBottom:-10}}
            >
                <h1 className="display-5 text-center">Item Details</h1>
            </div>
            <Carousel style={{height:300}} className="carousel-dark">
                {imageList}
            </Carousel>
            <h4 className="text-center mt-3">{item?.item?.username}'s {item?.item?.name}</h4>
            <div>General information:  {item?.item?.info}</div>
            <div>Tags: {item?.item?.tags.map(tag => "#"+tag+" ")}</div>
            <div>Price:  €{item?.item?.price}</div>
        </div>
    );
}


export default connect(null, { getItem })(withRouter(
    ItemDetails));