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

import { useHistory } from "react-router-dom";

//import ItemComponent from "../components/ItemCreation";
import {addItem, deleteItem, getItem} from "../redux/actions/ItemActions";
import {getGarages} from "../redux/actions/GarageActions";

/**
 * For register new users
 * @param {props} props
 */

function ItemCreation(props) {
  const history = useHistory();
  const garage = useSelector((state) => state.garage);
  const user = useSelector((state) => state.auth.user);

  const [itemList, setItemList] = useState([]);

  //const [itemGarage, setItemGarage] = React.useState(ObjectId);
  const [itemTitle, setItemTitle] = React.useState("");
  const [itemInfo, setItemInfo] = React.useState("");
  const [itemTags, setItemTags] = React.useState([]);
  const [itemPrice, setItemPrice] = React.useState("");
  const [itemImage, setItemImage] = React.useState([]);


  const extractItem = () => {
    if (!props.item) {
      return;
    }

    //setItemGarage(props.item.garageId);
    setItemTitle(props.item.itemTitle);
    setItemInfo(props.item.itemInfo);
    setItemTags(props.item.itemTags);
    setItemPrice(props.item.itemPrice);
    setItemImage(props.item.itemImage);
  };

  useEffect(() => {
    if (!props.new) {
      //extractUser();
      extractItem();
    }
  }, [props.user, props.item, props.new]);


  /*useEffect(() => {
    if (props.garageCreated){
      packItem();
    }
  }, [props.garageCreated, props.item]);*/

  const addToList = (input) => {
    //setNewDate(input);
    props.dispatch(getGarages());
    if (!itemList.includes(input)) {
      setItemList([...itemList, input]);
    }
  };

  const removeFromList = (input) => {
    //setNewDate(input);
    if (itemList.includes(input)) {
      itemList.filter(item => item.id !== input.id);
      setItemList([...itemList]);
    }
  };

  const onChangeItemTitle = (e) => {
    setItemTitle(e.target.value);
  };

  const onChangeItemInfo = (e) => {
    setItemInfo(e.target.value);
  };

  const onChangeItemTags = (e) => {
    setItemTags(e.target.value);
  };

  const onChangeItemPrice = (e) => {
    setItemPrice(e.target.value);
  };

  const onChangeItemImage = (e) => {
    setItemImage(e.target.value);
  };

  const packItem = () => {
    let back = {
      ...props.item,
    };

    if (!props.garageCreated){
      back.garageId = null;
    }
    else{
      //console.log("itemcreation:"+garage.garages.garages.filter(g => g.user == user._id));
      //console.log("itemcreation stringfy:"+JSON.stringify(garage.garages.garages.filter(g => g.user == user._id)));
      garage.garages.garages.filter(g => g.user == user._id).map(x => {back.garageId = x._id});
      //back.garageId = id;
    }
    back.name = itemTitle;
    back.price = itemPrice;
    back.tags = itemTags;
    back.info = itemInfo;
    back.image = itemImage;

    return back;
  };

  const onMyGarage = () => {
    console.log("item?:"+props.garageCreated);
    console.log("id?:"+props.newId);

    if (props.garageCreated){
      props.dispatch(addItem(packItem()));
      garage.garages.garages.filter(g => g.user == user._id).map( g => {props.history.push("/garage/"+g._id)});
      //console.log("garage view id?:"+id);

      //props.history.push("/"+props.newId)
    }
  }

  const onCreate = (e) => {
    e.preventDefault();
    addToList(packItem());
    //props.history.push("/");
  };

  const onRemove = (e) => {
    e.preventDefault();
    removeFromList(packItem());
    props.dispatch(deleteItem(packItem()))
  }

  const onCancel = () => {
    props.history.push("/");
  };



  return (
    <div className="Item" style={{ paddingRight: 40, width: 800 }}>
      <Button className="button-rounded" onClick={onCreate} type="save" style={{marginLeft: 200}}>
        <PlusLg></PlusLg>
      </Button>
      <FormLabel className="frame">Add Item</FormLabel>
      <Button className="button-rounded" onClick={onMyGarage} type="save" style={{marginRight: -200}}>
        Go to My Garage!
      </Button>
      <ListGroup>
        <ListGroupItem className="d-flex align-items-start" style={{marginLeft: 200, paddingRight:100}}>
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
                    <Nav.Link eventKey="image">Upload Image</Nav.Link>
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
                      style={{ marginLeft: 15 }}
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
                      style={{ marginLeft: 15, marginTop: 75 }}
                    />
                  </TabPane>
                  <TabPane eventKey="price">
                    <FormControl
                      type="price"
                      placeholder="Enter item price"
                      fullWidth
                      value={itemPrice}
                      onChange={onChangeItemPrice}
                      style={{ marginLeft: 15, marginTop: 130 }}
                    />
                  </TabPane>
                  <TabPane eventKey="tag">
                    <FormControl
                      type="tag"
                      placeholder="Enter some tags"
                      fullWidth
                      value={itemTags}
                      onChange={onChangeItemTags}
                      style={{ marginLeft: 15, marginTop: 170 }}
                    />
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
                  button1Name={"Edit"}
                  button2Name={"Remove"}
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
