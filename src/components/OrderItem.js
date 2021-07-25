import React from "react";
import PropTypes from "prop-types";
import {ListGroupItem} from "react-bootstrap";

const OrderItem = (props) => {

  return (
    <ListGroupItem
      className="d-inline-flex align-items-center justify-content-between"
      style={{ borderColor: "#85A582" }}
    >
      <div className="img-container d-flex align-items-center " style={{width:300, height:300}}>
        <ul className="list-group list-group-flush">
          {props.image &&
          props.image.map((img, index) => (
              <li className="list-group-item" key={index}>
                <img
                    className="my-auto d-block"
                    src={img}
                    style={{width:300, maxHeight:300}}
                    alt="item"
                />
              </li>
          ))}
        </ul>
      </div>
      <div className="name-and-tags flex-fill" style={{marginLeft:100}}>
        <div className="item-name" type="name" fullWidth required>
          {" "}
          {props.name}{" "}
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
      <div className="justify-content-end d-inline-flex align-items-center justify-content-end">
      <div className="item-price" style={{"marginRight":15, "fontSize":20}}><strong>€{props.price}</strong></div>
      </div>
    </ListGroupItem>
  );
};

OrderItem.propTypes = {
  item: PropTypes.object,
  new: PropTypes.bool
};

export default OrderItem;
