import React, { useEffect, useState } from "react";
import { Button, Form, FormCheck, Image, ListGroupItem, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const GarageItem = (props) => {
  // const items = useSelector((state) => state.items);
  const [button1Name, setButton1Name] = useState("");
  const [button2Name, setButton2Name] = useState("");
  const [condition, setCondition] = useState(false);
  //const [selectedItems, setSelectedItems] = useState(0);

  useEffect(() => {
    setButton1Name(button1Name)
    setButton2Name(button2Name)
    /*
    if(selectedItems>1){
      props.onMultipleItems();
    }

     */
}, [] );

  const onCheckboxClick = (e) => {
    if (e.target.checked) {
      props.onClickSelect();
      //setSelectedItems(selectedItems+1);
    } else {
      props.onClickDeselect();
      //setSelectedItems(selectedItems-1);
    }
  };

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
          {" "}
          {props.name}{" "}
        </div>
        <div
          className="item-tags text-black-50"
          style={{ fontSize: 14 }}
          type="name"
          fullWidth
          //value={props.tags.map(tag => {return "#"+tag})}
          required
          // > {props.tags.map(tag => {return "#"+tag})} </div>
        >
          {" "}
          {props.tags}{" "}
        </div>
      </div>
      <div className="justify-content-end d-inline-flex align-items-center justify-content-end">
      <div className="item-price" style={{"marginRight":15, "font-size":20}}><strong>€{props.price}</strong></div>
        <Button
          className="btn border-0"
          variant="dark"
          style={{ backgroundColor: "#85A582", width: 80, marginRight: 10 }}
        >
          {props.button1Name}
        </Button>
        {props.condition ?
          <Button
          className="btn border-0"
          variant="dark"
          style={{ backgroundColor: "#85A582", width: 80 }}
          onClick={props.onRemove}
          >
            {props.button2Name}
          </Button> : null
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
