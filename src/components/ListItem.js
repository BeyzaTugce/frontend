import React from "react";
import { Button,ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ListItem = (props) => {

    const history = useHistory();
    const onClickGoToGarage = () => {
        history.push("/garage/"+props.garageId);
    }

    return (
        <ListGroupItem
            className="d-inline-flex align-items-center justify-content-between"
            style={{ borderColor: "#85A582", width: 1000}}
        >
            <div
                className="img-container d-flex align-items-center"
                style={{
                    width: 100,
                    height: 100,
                    textAlign: "center",
                    marginRight: 30,
                }}
            ></div>
            <div className="name-and-tags flex-fill">
                <div className="item-name" type="name" fullWidth required>
                    <strong>By {props.username}</strong>
                </div>
                <div className="item-name" type="name" fullWidth required>
                    {props.name}
                </div>
                <div
                    className="item-tags text-black-50"
                    style={{ fontSize: 14 }}
                    type="name"
                    fullWidth
                    required
                >
                    {props.tags.map(tag => "#"+tag+" ")}
                </div>
            </div>
            <div className="justify-content-end d-inline-flex align-items-center justify-content-end" style={{marginLeft: 40}}>
                <div className="purchase-status" style={{"marginRight":30, "font-size":20}}><strong>{props.purchaseStatus}</strong></div>
                <div className="item-price" style={{"marginRight":30, "font-size":20}}><strong>€{props.price}</strong></div>
                <Button
                    className="btn border-0"
                    variant="dark"
                    style={{ backgroundColor: "#85A582", width: 80, marginRight: 10 }}
                    onClick={onClickGoToGarage}
                >
                    Go to garage
                </Button>
            </div>
        </ListGroupItem>
    );
};


export default ListItem;
