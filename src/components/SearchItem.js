import React, { useEffect } from "react";
import { Button, ListGroupItem } from "react-bootstrap";
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
            <Button className="content flex-fill text-center" variant="" onClick={onClickGoToGarage}>
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
                <div className="img-container d-flex align-items-center">
                     <ul className="list-group list-group-flush" style={{width: 200, height: 200}}>
                         <img
                             className="img my-auto d-block"
                             src={props.image}
                             width= "200"
                             height="auto"
                             alt={props.name}>
                         </img>
                     </ul>
                </div>
                <div className="garage-name">At {props.username}'s Garage</div>
                <div className="garage-name">Ends on {props.endDate}</div>
                <div className="item-price" style={{ fontWeight:"bold" }}>€{props.price}</div>
            </Button>
        </ListGroupItem>
    );
};

SearchItem.propTypes = {
    item: PropTypes.object,
};

export default SearchItem;
