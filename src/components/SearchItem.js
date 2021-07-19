import React, { useEffect, useState } from "react";
import { Button, Form, FormCheck, Image, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";


const SearchItem = (props) => {

    const history = useHistory();

    useEffect(() => {
    }, [] );

    const onClickGoToGarage = () => {
        history.push("/garage/"+props.garageId);
    }


    return (
        <ListGroupItem
            className="d-inline-flex align-items-center justify-content-between border"
            style={{ borderColor: "#85A582"}}
        >
            <div className="content flex-fill text-center">
                <div className="item-name" type="name" required style={{ fontSize: 18, fontWeight:"bold" }}>
                    {props.name}
                </div>
                <div
                    className="item-tags text-black-50"
                    type="name"
                    fullWidth
                    //value={props.tags.map(tag => {return "#"+tag})}
                    required
                    // > {props.tags.map(tag => {return "#"+tag})} </div>
                >
                    {props.tags.map( tag => {return "#"+tag+" "})}
                </div>
                <div className="img-container d-flex align-items-center"
                     style={{width: 200, height: 200, textAlign: "center",}}
                />
                <div className="garage-name">At {props.username}'s Garage</div>
                <div className="garage-name">Ends on {props.endDate}</div>
                <div className="item-price" style={{ fontWeight:"bold" }}>€{props.price}</div>
                <Button style={{marginTop: 10}} onClick={onClickGoToGarage}>Select</Button>
            </div>
        </ListGroupItem>
    );
};

SearchItem.propTypes = {
    item: PropTypes.object,
};

export default SearchItem;
