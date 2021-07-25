import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  FormLabel,
  FormControl,
  ListGroup,
  ListGroupItem,
  Nav,
  Row,
  TabContent,
  TabPane,
  TabContainer, Tabs, Tab,
} from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import GarageItem from "./GarageItem";
import ImageComponent from "./Image";

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
  const [garageId, setGarageId] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [listEmpty, setListEmpty] = React.useState(true);


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
    setUserId(props.item.userId);
    setUserName(props.item.userName);
    setItemImage(props.item.itemImage);
    setDeadline(props.item.deadline);
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
    setListEmpty(false);
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

  const onMyGarage = () => {
    if (props.garageCreated){
      garage.garages.garages.filter(g => g.user === user._id).map(g => {props.history.push("/garage/"+g._id)});
    }
  }

  const packItem = () => {
    props.dispatch(getGarages());
    let back = {
      ...props.item,
    };

    if (!props.garageCreated){
      back.garageId = garageId;
      back.deadline = deadline;
    }
    else{
      garage.garages.garages.filter(g => g.user === user._id).map(x => {back.garageId = x._id});
    }
    back.name = itemTitle;
    back.price = itemPrice;
    back.tags = itemTags.split(" ");
    back.info = itemInfo;
    back.username = user.username;
    back.userId = user._id;
    back.image = itemImage;
    let today = new Date();
    back.deadline = today.setMonth(today.getMonth() + 1, today.getDate());

    return back;
  };

  const onCreate = (e) => {
    e.preventDefault();
    if (props.garageCreated){
      addToList(packItem());
      props.dispatch(addItem(packItem()))
    }
    setItemTitle("");
    setItemInfo("");
    setItemTags("");
    setItemPrice("");
    setItemImage([]);
  };

  const onRemove = (e) => {
    e.preventDefault();
    removeFromList(packItem());
    console.log("onRemove itemcreation");
    props.dispatch(deleteItem(packItem()))
  }


  return (
    <div className="Item justify-content-center align-items-start mb-3">
      <ListGroup className="mb-3">
        <ListGroupItem style={{marginInline:275}}>
          <TabContainer className="left-tabs mb-3" variant="light" id="left-tabs" defaultActiveKey="item">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="tab-navs flex-column">
                  <Nav.Item className="tab-nav-item">
                    <Nav.Link className="tab-nav" eventKey="item">Item Title</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="tab-nav-item">
                    <Nav.Link className="tab-nav " eventKey="info">
                      <div className="text-nowrap">General Information</div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="tab-nav-item">
                    <Nav.Link className="tab-nav" eventKey="price">Price</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="tab-nav-item">
                    <Nav.Link className="tab-nav" eventKey="tag">Tags</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="tab-nav-item">
                    <Nav.Link className="tab-nav" eventKey="image">Upload Image
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
                    />
                  </TabPane>
                  <TabPane eventKey="info" style={{marginTop:40}}>
                    <FormControl
                      type="info"
                      placeholder="Write about your item"
                      fullWidth
                      value={itemInfo}
                      onChange={onChangeItemInfo}
                      required
                    />
                  </TabPane>
                  <TabPane eventKey="price" style={{marginTop:80}}>
                    <div className="w-100 d-inline-flex">
                      <div style={{fontSize:20, marginTop:4}}>€ </div>
                      <FormControl
                        type="price"
                        placeholder="Enter item price"
                        type="Number"
                        fullWidth
                        value={itemPrice}
                        onChange={onChangeItemPrice}
                    /></div>
                  </TabPane>
                  <TabPane eventKey="tag" style={{marginTop:120}}>
                    <FormControl
                      type="tag"
                      placeholder="Enter some tags"
                      fullWidth
                      value={itemTags}
                      onChange={onChangeItemTags}
                    />
                  </TabPane>
                  <TabPane eventKey="image">
                    <div>
                      <ImageComponent
                          onChangeItemImage = {onChangeItemImage}
                      />
                    </div>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </TabContainer>
          <div className="d-flex align-items-center justify-content-center">
            <Button className="btn-green" onClick={onCreate} disabled={!props.garageCreated} type="save">
              <PlusLg></PlusLg>
            </Button></div>
        </ListGroupItem>
      </ListGroup>
      {listEmpty ?
        "" : <div className="d-flex align-items-center justify-content-center">
        <h4 className="addItems mb-3">Added Items</h4>
        </div>
      }
      <div className="list-whole mb-2 pb-3" style={{marginInline:100}}>
        <ListGroup>
          {itemList.map((item) => {
            return (
              <GarageItem
                  name={item.name}
                  info={item.info}
                  price={item.price}
                  tags={item.tags}
                  image={item.image}
                  onRemove={onRemove}
                  button1Name={"Details"}
                  button2Name={"Remove"}
                  userView={true}
              />
            );
          })}
        </ListGroup>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <Button className="btn-green" onClick={onMyGarage} disabled={!props.garageCreated} type="save" style={{marginBottom: 70}}>
          Go to My Garage!
        </Button>
      </div>
    </div>
  );
}

ItemCreation.propTypes = {
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