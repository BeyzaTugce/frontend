import React from "react";
import {Button, FormCheck, Image, ListGroupItem} from "react-bootstrap";
import logo from "../views/logo.png"

const GarageItem = (props) => {


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
                    style={{backgroundColor: "#85A582", width: 80, marginRight: 10}}
                >
                    Edit
                </Button>
                <Button
                    className='btn'
                    variant="dark"
                    style={{backgroundColor: "#85A582", width: 80}}
                >
                    Remove
                </Button>
            </div>
        </ListGroupItem>
    );
};

export default GarageItem;