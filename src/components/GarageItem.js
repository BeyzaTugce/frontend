import React, {useEffect} from "react";
import {Button, Form, FormCheck, Image, ListGroupItem} from "react-bootstrap";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const GarageItem = (props) => {
   // const items = useSelector((state) => state.items);

    return (
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

            </div>
            <div className="name-and-tags flex-fill">
                <div className="item-name"
                     type="name"
                     fullWidth
                     required
                > {props.name} </div>
                <div className="item-tags text-black-50" style={{fontSize:14}}
                     type="name"
                     fullWidth
                     value={props.tags.map(tag => {return "#"+tag})}
                     required
                > {props.tags.map(tag => {return "#"+tag})} </div>
            </div>
            <div className="justify-content-end d-inline-flex align-items-center justify-content-end">
                <Button
                    className='btn border-0'
                    variant="dark"
                    style={{backgroundColor: "#85A582", width: 80, marginRight: 10}}
                >
                    Edit
                </Button>
                <Button
                    className='btn border-0'
                    variant="dark"
                    style={{backgroundColor: "#85A582", width: 80}}
                >
                    Remove
                </Button>
            </div>
        </ListGroupItem>
    );
};

GarageItem.propTypes = {
    item: PropTypes.object,
    new: PropTypes.bool,
};

export default GarageItem;