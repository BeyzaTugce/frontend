import React, { useState, useEffect } from "react";
import {Button, FormGroup, FormLabel,ListGroup, Alert} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import GarageItem from "./GarageItem";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {getPurchases} from "../redux/actions/PurchaseActions";
import garage from "../redux/reducers/garageReducer";

const Garage = (props) => {
  const history = useHistory();
  const purchase = useSelector((state) => state.purchase);
  const loggedInUser = useSelector((state) => state.auth.user);


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
  const [purchaseSeller, setPurchaseSeller] = useState("");
  const [purchaseGarage, setPurchaseGarage] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [creationDate, setCreationDate] = useState(new Date());
  const [buyer, setBuyer] = useState("");
  const [price, setPurchasePrice] = useState(0);
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

  const extractGarage = () => {
    if (!props.garage ) {
      return;
    }
    //will change the date later.
    setGarageId(props.garage._id)
    setGarageEndDate(props.garage.dateCreated)
    setFormattedDate(new Date(props.garage.dateCreated).toLocaleDateString())
    setDiscount(props.garage.discount)
    setBargain(props.garage.bargain)
    setIsPromoted(props.garage.isPromoted);
  }

  const extractPurchase = () => {
    if (!props.purchase) {
      return;
    }
    setCreationDate(props.purchase.creationDate);
    setBuyer(props.purchase.buyer);
    setPurchaseSeller(props.purchase.seller);
    setPurchaseGarage(props.purchase.garageId);
    setPurchasePrice(props.purchase.price);
  };

  const packPurchase = () => {
    let back = {
      ...props.purchase,
    };
    //back.purchaseId = purID;
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

  const forwardToSignUpPage = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  const forwardToLoginPage = (e) => {
    e.preventDefault();
    history.push("/login");
  };

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


  const onClickPromote = (e) => {
    e.preventDefault();
    //handleToggle();
    history.push(`../promote/${props.garageId}`);
  };

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

 
  const extractItems = () => {
    if (!props.items ) {
      return;
    }
    setGarageItems(props.items.items);
  }

  const getMethod = () => {
    if (!props.garage ) {
      return;
    }
    if(props.garage.shipment == true){
      if(props.garage.pickup == true){
        setSelectedMethod("Both");
        setShipmentAddress(loggedInUser.correspondenceAddress + loggedInUser.district + loggedInUser.city);
      }
      else {
        setSelectedMethod("Shipment");
        setShipmentAddress(loggedInUser.correspondenceAddress + loggedInUser.district + loggedInUser.city);
        
      }
    }
    else setSelectedMethod("PickUp");
  }
  useEffect(() => {
    extractGarage();
    console.log("garageee: "+JSON.stringify(props.garage));
  }, [] );

  useEffect(() => {
    extractGarage();
    console.log("garageee: "+JSON.stringify(props.garage));
    getMethod();
  }, [props.garage] );

  useEffect(() => {
    extractSeller();
  }, [props.seller] );

  useEffect(() => {
    extractItems();
  }, [props.items] );

  useEffect(() => {
      extractPurchase();
  }, [props.purchase]);

  useEffect(() => {
    if(numSelectedItems>1 & discount){
      setSaving(totalPrice/20);
    } else {
      setSaving(0);
    }
    setAmountToPay(totalPrice-saving);
  }, );

  useEffect(() => {
    setIsMyGarage(loggedInUser?._id == purchaseSeller?._id);
    //console.log(loggedInUser?._id);
    //console.log(purchaseSeller?._id);
    //console.log(isMyGarage)
    if(loggedInUser?._id != null){
      setLoggedIn(true);
    }
  }, [packPurchase])


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

  const removeGarage = () => {
    props.onRemoveGarage();
  }


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


  //TODO: "Select All" button color
  //TODO: Bargain and buy buttons do not light up when clicked.
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
        <div className="text-center">
          {isMyGarage && !isPromoted ?
              <Button className="btn-purple" variant="light" onClick={onClickPromote}>Want to get promoted?</Button> :
              isMyGarage && isPromoted ?
                  <Button className="btn-green" variant="light" disabled={true} onClick={onClickPromote}>You are promoted!</Button> :
                  <p></p>
          }
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
