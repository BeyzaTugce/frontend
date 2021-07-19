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
  const [purchaseId, setPurchaseId] = useState("");
  const [purID, setPurID] = useState(Math.floor(Math.random() * 100000000 + 1).toString());
  const [purchases, setPurchases] = useState([]);
  const [bargain, setBargain] = useState(false);
  const [isMyGarage, setIsMyGarage] = useState(false);

  let buy = false;
  let bargainOption= false;

  const extractGarage = () => {
    if (!props.garage ) {
      return;
    }
    //will change the date later.
    setGarageId(props.garage._id)
    setGarageEndDate(props.garage.dateCreated)
    setDiscount(props.garage.discount)
    setBargain(props.garage.bargain)
  }
  const extractPurchase = () => {
    if (!props.purchase) {
      return;
    }
   // setPurchaseId(props.purchase.purchaseId);
    setCreationDate(props.purchase.creationDate);
    setBuyer(props.purchase.buyer);
    setPurchaseSeller(props.purchase.seller);
    setPurchaseGarage(props.purchase.garageId);
    setPurchasePrice(props.purchase.price);
   // setPurchases(props.purchase.purchases);
   // setPurchaseStatus(props.purchase.purchaseStatus);
  //  setSelectedItemList(props.purchase.selectedItemList);
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


  const trialFunction = (e) => {
    e.preventDefault();
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
    getMethod();
  }, [props.garage] );

  useEffect(() => {
    extractSeller();
  }, [props.seller] );

  useEffect(() => {
    extractItems();
  }, [props.items] );

  useEffect(() => {
  
      //extractUser();
      extractPurchase();
    
  }, [props.purchase]);

  useEffect(() => {
    if(numSelectedItems>1 & discount){
      setSaving(totalPrice/5);
    } else {
      setSaving(0);
    }
    setAmountToPay(totalPrice-saving);
  }, );

  useEffect(() => {
    setIsMyGarage(loggedInUser?._id == purchaseSeller?._id);
    console.log(loggedInUser?._id);
    console.log(purchaseSeller?._id);
    console.log(isMyGarage)
  }, [packPurchase])

  const [selectedItemList, setSelectedItemList] = useState([]);

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
        button1Name={"Buy"}
        button2Name={"Bargain"}
        condition={bargain}
        userView={false}
          //image={garageItem.image}
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
            button1Name={"Edit"}
            button2Name={"Remove"}
            condition={true}
            userView={true}
            //image={garageItem.image}
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

  //console.log("seller:"+ JSON.stringify(props.garage.user));
  //console.log("user:"+ JSON.stringify(props.user));


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
              until {garageEndDate}
            </p>
          </em>
          {!bargain ?
            <Alert className="d-flex align-items-center justify-content-center" variant="info"><strong>Bargain option disabled by the seller</strong></Alert>
            : "" }
        </div>
        <div>
          <div className="select-all-button-field" style={{ paddingInline: 50 }}>
            <Button
                className="btn select-all-button"
                variant="light"
                style={{ color: "black", borderColor: "lightgray" }}
            >
              <div style={{ fontSize: 14 }}>Select all</div>
            </Button>
          </div>
          <div className="list-whole w-100" style={{ paddingInline: 50 }}>
            {props.seller === props.user ?
                <ListGroup>{renderedListBuyer}</ListGroup> :
                <ListGroup>{renderedListUser}</ListGroup>
            }
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
            {isMyGarage ? "" : bargain ? 
                  <div className="bargain-buy-buttons d-flex align-items-center justify-content-center">
                      <Button
                      className="btn border-0"
                      variant="dark"
                      style={{ backgroundColor: "#A282A5", marginRight: 8 }}
                      onClick={bargainFunction}
                      > 
                        Bargain for Selected Items
                      </Button>
                      <Button
                      className="btn border-0 text-white"
                      variant="light"
                      style={{ backgroundColor: "#85A582" }}
                      onClick={buyFunction}
                      >
                        Buy Selected Items
                      </Button> 
                  </div>  
                     : 
                  <div className="bargain-buy-buttons d-flex align-items-center justify-content-center">        
                      <Button
                      className="btn border-0 text-white"
                      variant="light"
                      style={{ backgroundColor: "#85A582" }}
                      onClick={trialFunction}
                      >
                      Buy Selected Items
                      </Button>
                  </div>}
          </div>
        </div>
      </span>
    </div>
  );
};

/*
might be useful for GarageItem
<ListGroupItem className="d-inline-flex align-items-center justify-content-between">
                            <FormCheck
                                type="checkbox"
                                id="item-checkbox"
                                style={{marginInline:17, marginRight:30}}
                            />
                            <div
                                className="img-container d-flex align-items-center"
                                style={{width:100, height:100, textAlign:"center", marginRight:30}}
                            >
                                <Image
                                    className="item-image"
                                    src={logo}
                                    fluid
                                />
                            </div>
                            <div className="name-and-tags flex-fill">
                                <div className="item-name">Some Item</div>
                                <div className="item-tags text-black-50" style={{fontSize:14}}>#all #tags #here</div>
                            </div>
                            <div className="justify-content-end d-inline-flex align-items-center justify-content-end">
                                <div className="item-price" style={{marginRight:15}}>€30</div>
                                <Button
                                    className='btn border-0'
                                    variant="dark"
                                    style={{backgroundColor: "#A282A5", marginRight:8}}
                                >
                                    Bargain
                                </Button>
                                <Button
                                    className='btn border-0 text-white'
                                    variant="light"
                                    style={{backgroundColor: "#85A582"}}
                                >
                                    Buy
                                </Button>
                            </div>
                        </ListGroupItem>
 */

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
