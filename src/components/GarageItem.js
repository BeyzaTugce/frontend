import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { Button, FormCheck, ListGroupItem } from "react-bootstrap";

const GarageItem = (props) => {

  const [button1Name, setButton1Name] = useState("");
  const [button2Name, setButton2Name] = useState("");

  const history = useHistory();

  useEffect(() => {
    setButton1Name(button1Name)
    setButton2Name(button2Name)

}, [] );

  const onCheckboxClick = (e) => {
    if (e.target.checked) {
      props.onClickSelect();
    } else {
      props.onClickDeselect();
    }
  };

  const onClickItemDetail = () => {
    history.push("/item/"+props.itemId);
  }

  return (
    <ListGroupItem
      className="d-inline-flex align-items-center justify-content-between"
      style={{ borderColor: "#85A582" }}
    >
      <FormCheck
        type="checkbox"
        id="item-checkbox"
        style={{ marginInline: 17, marginRight: 30 }}
        onClick={onCheckboxClick}
      />
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
      <div className="item-price" style={{"marginRight":15, "font-size":20}}><strong>€{props.price}</strong></div>
        {props.userView ?
            <div>
              <Button
                  className="btn border-0"
                  variant="dark"
                  style={{ backgroundColor: "#85A582", width: 80, marginRight:10}}
                  onClick={onClickItemDetail}
              >
                {props.button1Name}
              </Button>
              <Button
                  className="btn border-0"
                  variant="dark"
                  style={{ backgroundColor: "#85A582", width: 80 }}
                  onClick={props.onRemove}
              >
                {props.button2Name}
              </Button>
            </div>
            :
            <Button
                className="btn border-0"
                variant="dark"
                style={{ backgroundColor: "#85A582", width: 80 }}
                onClick={onClickItemDetail}
            >
              {props.button1Name}
            </Button>
        }
      </div>
    </ListGroupItem>
  );
};

GarageItem.propTypes = {
  item: PropTypes.object,
  new: PropTypes.bool
};

export default GarageItem;
