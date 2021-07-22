import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  Container,
  FormCheck,
  FormGroup,
  FormLabel,
  FormControl,
  ListGroup,
  ListGroupItem,
  Nav,
  Row,
  TabContent,
  TabPane,
  TabContainer,
} from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import GarageItem from "./GarageItem";
import ImageComponent from "./Image";

import { useHistory } from "react-router-dom";

//import ItemComponent from "../components/ItemCreation";
import {addItem, deleteItem, getItem} from "../redux/actions/ItemActions";
import {getGarages} from "../redux/actions/GarageActions";

/**
 * For register new users
 * @param {props} props
 */

function ItemCreation(props) {
  const garage = useSelector((state) => state.garage);
  const user = useSelector((state) => state.auth.user);

  const [itemList, setItemList] = useState([]);
  const [itemTitle, setItemTitle] = React.useState("");
  const [itemInfo, setItemInfo] = React.useState("");
  const [itemTags, setItemTags] = React.useState("");
  const [itemPrice, setItemPrice] = React.useState("");
  const [itemImage, setItemImage] = React.useState([]);
  const [garageId, setGarageId] = React.useState([]);
  const [userName, setUserName] = React.useState([]);





  const extractItem = () => {
    if (!props.item) {
      return;
    }
    setItemTitle(props.item.itemTitle);
    setItemInfo(props.item.itemInfo);
    setItemTags(props.item.itemTags);
    setItemPrice(props.item.itemPrice);
    setItemImage(props.item.itemImage);
    setGarageId(props.item.garageId);
    setUserName(props.item.userName);
  };

  useEffect(() => {
    if (!props.new) {
      //extractUser();
      extractItem();
    }
  }, [props.user, props.item, props.new]);


  const addToList = (input) => {
    props.dispatch(getGarages());
    if (!itemList.includes(input)) {
      setItemList([...itemList, input]);
    }
  };

  const removeFromList = (input) => {
    if (itemList.includes(input)) {
      let filteredArray = itemList.filter(item => item !== input)
      setItemList(filteredArray);
    }
  };

  const onChangeItemTitle = (e) => {
    props.dispatch(getGarages());
    setItemTitle(e.target.value);
  };

  const onChangeItemInfo = (e) => {
    setItemInfo(e.target.value);
  };

  const onChangeItemTags = (e) => {
    console.log(e.target.value);
    setItemTags(e.target.value);
  };

  const onChangeItemPrice = (e) => {
    setItemPrice(e.target.value);
  };

 const onChangeItemImage = (input) => {
    setItemImage(input);
  };

  const packItem = () => {
    props.dispatch(getGarages());
    let back = {
      ...props.item,
    };

    if (!props.garageCreated){
      back.garageId = garageId;
    }
    else{
      garage.garages.garages.filter(g => g.user == user._id).map(x => {back.garageId = x._id});
    }
    back.name = itemTitle;
    back.price = itemPrice;
    back.tags = itemTags.split(" ");
    back.info = itemInfo;
    back.username = user.username;
    console.log("pictures"+itemImage);
    back.image = itemImage;

    return back;
  };

  const onMyGarage = () => {
    if (props.garageCreated){
      garage.garages.garages.filter(g => g.user == user._id).map( g => {props.history.push("/garage/"+g._id)});
    }
  }

  const onCreate = (e) => {
    e.preventDefault();
    addToList(packItem());
    if (props.garageCreated){
      props.dispatch(addItem(packItem()))
    }
  };

  const onRemove = (e) => {
    e.preventDefault();
    removeFromList(packItem());
    console.log("onRemove itemcreation");
    props.dispatch(deleteItem(packItem()))
  }


  return (
    <div className="Item" style={{ paddingRight: 40, width: 800 }}>
      <Button className="button-rounded" onClick={onCreate} disabled={!props.garageCreated} type="save" style={{marginLeft: 150}}>
        <PlusLg></PlusLg>
      </Button>
      <FormLabel className="frame">Add Item</FormLabel>
      <Button className="button-rounded" onClick={onMyGarage} disabled={!props.garageCreated} type="save" style={{marginLeft: 320}}>
        Go to My Garage!
      </Button>
      <ListGroup>
        <ListGroupItem className="d-flex align-items-start" style={{marginLeft: 120, paddingRight:30}}>
          <TabContainer id="left-tabs-example" defaultActiveKey="info">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="item">Item Title</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="info">General Information</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="price">Price</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tag">Tags</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="image">Upload Image
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <TabContent>
                  <TabPane eventKey="item">
                    <FormControl
                      type="title"
                      placeholder="Enter item title"
                      fullWidth
                      value={itemTitle}
                      onChange={onChangeItemTitle}
                      required
                      style={{ marginLeft: 60 }}
                    />
                  </TabPane>
                  <TabPane eventKey="info">
                    <FormControl
                      type="info"
                      placeholder="Write about your item"
                      fullWidth
                      value={itemInfo}
                      onChange={onChangeItemInfo}
                      required
                      style={{ marginLeft: 60, marginTop: 70 }}
                    />
                  </TabPane>
                  <TabPane eventKey="price">
                    <FormControl
                      type="price"
                      placeholder="Enter item price"
                      fullWidth
                      value={itemPrice}
                      onChange={onChangeItemPrice}
                      style={{ marginLeft: 60, marginTop: 125 }}
                    />
                  </TabPane>
                  <TabPane eventKey="tag">
                    <FormControl
                      type="tag"
                      placeholder="Enter some tags"
                      fullWidth
                      value={itemTags}
                      onChange={onChangeItemTags}
                      style={{ marginLeft: 60, marginTop: 165 }}
                    />
                  </TabPane>
                  <TabPane eventKey="image">
                    <div style={{ marginLeft: 60, marginTop: 200 }}>
                      <ImageComponent 
                   onChangeItemImage = {onChangeItemImage} 
                      />
                    </div>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </TabContainer>
        </ListGroupItem>
      </ListGroup>
      <div style={{marginLeft: -380}}>
        <FormLabel className="addItems">Added Items</FormLabel>
      </div>
      <div className="list-whole" style={{marginLeft: -380}}>
        <ListGroup>
          {itemList.map((item) => {
            return (
              <GarageItem
                  name={item.name}
                  info={item.info}
                  price={item.price}
                  tags={item.tags}
                  onRemove={onRemove}
                  button1Name={"Details"}
                  button2Name={"Remove"}
                  userView={true}
              />
            );
          })}
        </ListGroup>
      </div>
    </div>
  );
}

ItemCreation.prototypes = {
  onRemove : PropTypes.func.isRequired,
  garage: PropTypes.object,
  user: PropTypes.object,
};

export default connect()(withRouter(ItemCreation));


/*
Bu kullanılcak Imageları göstermek için
      <div className="card mt-3">
          <ul className="list-group list-group-flush">
            {pictures &&
              pictures.map((img, index) => (
                <li className="list-group-item" key={index}>
                     <img 
                        src={img}
                   alt="new"
                 />
                </li>
              ))}
          </ul>
        </div>
*/