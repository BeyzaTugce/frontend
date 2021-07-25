import React, { useState, useEffect } from "react";
import {Button,ListGroup} from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import GarageItem from "./GarageItem";


const Garage = (props) => {
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.auth.user);
  const purchase = useSelector((state) => state.purchase);

  const [userName, setUserName] = useState("");
  const [sellerId, setSellerId] = useState(0);
  const [postcode, setPostcode] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [garageEndDate, setGarageEndDate] = useState("");
  const [garageItems, setGarageItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numSelectedItems, setNumSelectedItems] = useState(0);
  const [discount, setDiscount] = useState(false);
  const [saving, setSaving] = useState(0);
  const [amountToPay, setAmountToPay] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [creationDate, setCreationDate] = useState(new Date());
  const [garageId, setGarageId] = useState("");
  const [shipAddress, setShipmentAddress] = useState("");
  const [bargain, setBargain] = useState(false);
  const [isPromoted, setIsPromoted] = useState(false);
  const [isMyGarage, setIsMyGarage] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedItemList, setSelectedItemList] = useState([]);

  let buy = false;
  let bargainOption= false;
  let garageReached = false;
  let sellerReached = false;
  let itemsReached = false;

  //Extract existing garage
  const extractGarage = () => {
    if (!props.garage ) {
      return;
    }
    setGarageId(props.garage._id)
    setGarageEndDate(props.garage.dateCreated)
    const date = new Date(props.garage.dateCreated)
    date.setMonth(date.getMonth() + 1)
    setFormattedDate(date.toLocaleDateString())
    setDiscount(props.garage.discount)
    setBargain(props.garage.bargain)
    setIsPromoted(props.garage.isPromoted);
  }

  //Create a purchase
  const packPurchase = () => {
    let back = {
      ...props.purchase,
    };
    back.creationDate = creationDate;
    back.buyer = loggedInUser._id;
    back.seller = sellerId;
    back.garageId = garageId;
    back.price = totalPrice;
    back.selectedItemList = selectedItemList;
    back.method = selectedMethod;
    back.shipAddress = shipAddress;
    if(buy == true)
       back.purchaseStatus = "DeliveryScheduling";
    return back;
  };

  const buyFunction = (e) => {
    e.preventDefault();
    buy = true;
    addPurchase(e);
  
  };

  const bargainFunction = (e) => {
    e.preventDefault();
    bargainOption = true;
    addPurchase(e);
  };

  //Signup to bargain or buy items
  const forwardToSignUpPage = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  //Login before bargaining or buying items
  const forwardToLoginPage = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  //When a bargain or buy action started, create a new purchase
  const addPurchase = (e) => {
    e.preventDefault();
    if(!purchase.purchase){
       props.onCreatePurchase(packPurchase());
      }   
    else {
      if(buy == true)
         history.push(`../delivery/${purchase.purchase._id}`)
      else if(bargainOption == true)
          history.push(`../bargain/${purchase.purchase._id}`)
    }
  };

  //Promote your garage
  const onClickPromote = (e) => {
    e.preventDefault();
    history.push(`../promote/${props.garageId}`);
  };

  //Extract existing seller
  const extractSeller = () => {
    if (!props.seller ) {
      return;
    }
    setSellerId(props.seller._id)
    setUserName(props.seller.firstname)
    setPostcode(props.seller.postcode)
    setDistrict(props.seller.district)
    setCity(props.seller.city)
  }

 //Extract existing item
  const extractItems = () => {
    if (!props.items ) {
      return;
    }
    setGarageItems(props.items.items);
  }

  //Decide on purchase delivery method
  const getMethod = () => {
    if (!props.garage ) {
      return;
    }
    if(props.garage.shipment === true){
      if(props.garage.pickup === true){
        setSelectedMethod("Both");
        setShipmentAddress(loggedInUser.correspondenceAddress + ", " + loggedInUser.postcode + " " + loggedInUser.district + "/" + loggedInUser.city);
      }
      else {
        setSelectedMethod("Shipment");
        setShipmentAddress(loggedInUser.correspondenceAddress + ", " + loggedInUser.postcode + " " + loggedInUser.district + "/" + loggedInUser.city);
      }
    }
    else setSelectedMethod("PickUp");
  }

  useEffect(() => {
    extractGarage();
  }, [props.garage, garageReached === false]);

  useEffect(() => {
    if (props.garage!== undefined && props.garage !== null) {
      garageReached = true;
    }
  }, [props.garage, garageReached === false]);

  useEffect(() => {
    if (props.garage !== undefined && props.garage !== null) {
      getMethod();
    }
  }, [props.garage, garageReached]);

  useEffect(() => {
    extractSeller();
  }, [props.seller] );

  useEffect(() => {
    extractSeller();
  }, [props.seller,sellerReached === false]);

  useEffect(() => {
    if (props.seller!== undefined && props.seller !== null) {
      sellerReached = true;
    }
  }, [props.seller, sellerReached === false]);

  useEffect(() => {
    if (props.seller !== undefined && props.seller !== null) {
      setIsMyGarage(loggedInUser?._id === props.seller?._id);
      if(loggedInUser?._id !== null){
        setLoggedIn(true);
      }
    }
  }, [props.seller, sellerReached]);


  useEffect(() => {
    extractItems();
  }, [props.items,itemsReached === false]);

  useEffect(() => {
    if (props.items!== undefined && props.items !== null) {
      itemsReached = true;
    }
  }, [props.items, itemsReached === false]);


  useEffect(() => {
    if(numSelectedItems>1 & discount){
      setSaving(totalPrice/20);
    } else {
      setSaving(0);
    }
    setAmountToPay(totalPrice-saving);
  }, );

  const addToSelected = (input) => {
    if (!selectedItemList.includes(input)) {
        setSelectedItemList([...selectedItemList, input]);
    }
  };

  const removeFromSelected = (input) => {
    if (selectedItemList.includes(input)) {
        let filteredArray = selectedItemList.filter(item => item !== input)
        setSelectedItemList(filteredArray);
    }
  };


  const renderedListBuyer = garageItems.map((garageItem) => {
    return (
      <GarageItem
        name={garageItem.name}
        info={garageItem.info}
        tags={garageItem.tags}
        price={garageItem.price}
        itemId={garageItem._id}
        image= {garageItem.image}
        button1Name={"Details"}
        userView={false}
        onClickSelect={() =>
         {
           setTotalPrice(totalPrice+garageItem.price);
           setNumSelectedItems(numSelectedItems+1);
           addToSelected(garageItem);
         }
        }
        onClickDeselect={() =>
        {
          setTotalPrice(totalPrice-garageItem.price);
          setNumSelectedItems(numSelectedItems-1);
          removeFromSelected(garageItem);
        }}
      />
    );
  });

  const renderedListUser = garageItems.map((garageItem) => {
    return (
        <GarageItem
            name={garageItem.name}
            info={garageItem.info}
            tags={garageItem.tags}
            price={garageItem.price}
            itemId={garageItem._id}
            image= {garageItem.image}
            button1Name={"Details"}
            button2Name={"Remove"}
            userView={true}
            onClickSelect={() =>
            {
              setTotalPrice(totalPrice+garageItem.price);
              setNumSelectedItems(numSelectedItems+1);
              addToSelected(garageItem);
            }
            }
            onClickDeselect={() =>
            {
              setTotalPrice(totalPrice-garageItem.price);
              setNumSelectedItems(numSelectedItems-1);
              removeFromSelected(garageItem);
            }}
        />
    );
  });


  return (
    <div className="Garage">
      <span>
        <div
          className="jumbotron jumbotron-fluid bg-white"
          style={{ marginBottom: -10 }}
        >
          {isMyGarage ?
              <h1 className="display-5 text-center">My Garage</h1> :
              <h1 className="display-5 text-center">{userName}'s Garage</h1>
          }
          <em>
            <p
              className="lead text-black-50 text-sm-center"
              style={{ fontSize: 17 }}
            >
              {postcode} {district} {city} <br />
              until {formattedDate}
            </p>
          </em>
        </div>
        <div>
          <div className="promote-button text-center mb-5">
            {isMyGarage && !isPromoted ?
                <Button className="btn-purple" variant="light" onClick={onClickPromote}>Want to get promoted?</Button> :
                isMyGarage && isPromoted ?
                    <Button className="btn-green" variant="light" disabled={true} onClick={onClickPromote}>You are promoted!</Button> :
                    <p></p>
            }
          </div>
          <div className="list-whole w-100" style={{ paddingInline: 50 }}>
            {isMyGarage ?
                <ListGroup>{renderedListUser}</ListGroup> :
                <ListGroup>{renderedListBuyer}</ListGroup>
            }
            {isMyGarage ?
                "" :
                <div
                    className="price-info-text text-center"
                    style={{ marginTop: 25, marginBottom: 25 }}
                >
                  <div className="total-price-text">Total price: €{totalPrice}</div>
                  {discount ?
                      <div>
                        <div className="saving-text">Saving: €{saving}</div>
                        <div className="amount-to-pay-text">Amount to Pay: <strong></strong>€{amountToPay}</div>
                      </div>
                      : ""}
                  {discount && numSelectedItems===1 ?
                      <div className="promotional-sentence-text text-danger">
                        You can save up to 10% by choosing 1 more item!
                      </div> : ""
                  }
                </div>
            }
            {
              (()=>{
                if (loggedIn) {
                  return <div style={{marginBottom:30}}>{isMyGarage ? "" : bargain ?
                      <div className="bargain-buy-buttons d-flex align-items-center justify-content-center">
                        <Button
                            className="btn-purple"
                            variant="light"
                            style={{ marginRight: 8 }}
                            onClick={bargainFunction}
                        >
                          Bargain for Selected Items
                        </Button>
                        <Button
                            className="btn-green"
                            variant="light"
                            onClick={buyFunction}
                        >
                          <div className="text-white">Buy Selected Items</div>
                        </Button>
                      </div>
                      :
                      <div className="bargain-buy-buttons d-flex align-items-center justify-content-center">
                        <Button
                            className="btn-green"
                            variant="light"
                            onClick={buyFunction}
                        >
                          Buy Selected Items
                        </Button>
                      </div>}</div>
                } else {
                  return <div style={{marginBottom:30}}>
                    <div className="login-or-sign-up-text text-center">Log in or create an account to continue your purchase!{"\n"}</div>
                    <div className="sign-in-sign-up-button d-flex align-items-center justify-content-center">
                      <div className="bargain-buy-buttons d-flex align-items-center justify-content-center">
                        <Button
                            className="btn border-0"
                            variant="dark"
                            style={{ backgroundColor: "#A282A5", marginRight: 8 }}
                            onClick={forwardToSignUpPage}
                        >
                          Sign Up
                        </Button>
                        <Button
                            className="btn border-0 text-white"
                            variant="light"
                            style={{ backgroundColor: "#85A582" }}
                            onClick={forwardToLoginPage}
                        >
                          Sign In
                        </Button>
                      </div>
                    </div></div>
                }
              })()}
          </div>
        </div>
      </span>
    </div>
  );
};


Garage.propTypes = {
  garage: PropTypes.object,
  purchase: PropTypes.object,
  onCreatePurchase: PropTypes.func.isRequired,
  seller: PropTypes.object,
  loggedInUser: PropTypes.object,
  items: PropTypes.object,
};

const mapStateToProps = (state) => ({
  purchase: state.purchase,
});

export default connect(mapStateToProps, null)(withRouter(Garage));