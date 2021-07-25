import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "./OrderDetails.css";
import OrderItem from "./OrderItem";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import {
  NavLink,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getPurchase, changePurchase,loadSeller } from "../redux/actions/PurchaseActions";
import store from "../redux/store";

const OrderDetails = (props) => {
  const [sellerName, setSellerName] = React.useState(" ");
  const [orderDate, setOrderDate] = React.useState("");
  const [method, setMethod] = React.useState("");
  const [receiveDate, setReceiveDate] = React.useState("");
  const [pickUpAddress, setPickUpAddress] = React.useState("Not specified");
  const [shipAddress, setShipAddress] = React.useState("Not specified");
  const [totalwoTax, setTotalwoTax] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [tax, setTax] = React.useState(5);
  const [items, setItems] = React.useState([]);
  const [userType, setUserType] = useState("Unknown");

  const purchase = useSelector((state) => state.purchase);
  const loggedInUser = useSelector((state) => state.auth.user);

  const history = useHistory();

  let { match, getPurchase } = props;
  let purchaseReached = false;
  let sellerReached = false;

  useEffect(() => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
  }, [match.params, purchaseReached === false]);

  useEffect(() => {
    if (purchase.purchase !== undefined && purchase.purchase !== null) {
      purchaseReached = true;
    }
  }, [purchase.purchase, purchaseReached === false]);

  useEffect(() => {
    console.log("second use effect " + purchaseReached);
    if (purchase.purchase !== undefined && purchase.purchase !== null) {
      checkUser();
      //checkMethod();
      //checkStatus();
      setPickUpAddress(purchase.purchase.pickupLocation);
      setPrice(purchase.purchase.price + tax);
      setTotalwoTax(purchase.purchase.price);
      setItems(purchase.purchase.selectedItemList);
      setOrderDate(new Date(purchase.purchase.creationDate).toLocaleDateString())
      setMethod(purchase.purchase.method);
      setReceiveDate(new Date(purchase.purchase.pickUpDate).toLocaleDateString())
      setShipAddress(purchase.purchase.shipAddress);
      store.dispatch(loadSeller(purchase.purchase.seller));
      sellerReached = true;
    }
  }, [purchase.purchase, purchaseReached, getPurchase]);

  const checkUser = () => {
    if (loggedInUser != null) {
      if (loggedInUser._id == purchase?.purchase?.seller) {
        setUserType("Seller");
      } else if (loggedInUser._id == purchase?.purchase?.buyer) {
        setUserType("Buyer");
      }
    }
  };

  useEffect(() => {
    setSellerName(purchase?.seller?.username);
  }, [purchase?.seller , sellerReached === true]);

 
  useEffect(() => {
    // extractOrder();
    extractItems();
  }, [props.order, props.items]);

  //will get the items from purchase.
  const extractItems = () => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
    if (!purchase?.purchase?.selectedItemList) {
      return;
    }
    setItems(purchase.purchase.selectedItemList);
  };

  const packPurchase = () => {
    let back = {
      ...props.purchase,
    };
    back._id = purchase.purchase._id;
    back.creationDate = purchase.purchase.creationDate;
    back.buyer = purchase.purchase.buyer;
    back.seller = purchase.purchase.seller;
    back.garageId = purchase.purchase.garageId;
    back.price = purchase.purchase.price;
    back.selectedItemList = purchase.purchase.selectedItemList;
    if (userType == "Seller") back.purchaseStatus = "Order";
    else if (userType == "Buyer") back.purchaseStatus = "Rating";

    back.availableDates = purchase.purchase.availableDates;
    back.pickupLocation = purchase.purchase.pickupLocation;

    back.pickUpDate = purchase.purchase.pickUpDate;
    back.method = purchase.purchase.method;

    return back;
  };

  const renderedList = items.map((garageItem) => {
    return (
      <OrderItem
        name={garageItem.name}
        info={garageItem.info}
        tags={garageItem.tags}
        price={garageItem.price}
        image={garageItem.image}
      />
    );
  });

  const onRate = (e) => {
    e.preventDefault();
    store.dispatch(changePurchase(packPurchase()));
    history.push(`../rating/${purchase.purchase._id}`);
  };

  return (
    <div className="OrderDetails">
      <div
          className="jumbotron jumbotron-fluid bg-white"
          style={{ marginBottom: -10 }}
      >
        <h2 className="display-5 text-center">
          Order from {sellerName}'s Garage
        </h2>
      </div>
      <span>
        <div class="container mb-3 mb-sm-4">
          <div class="steps mb-3">
            <div class="steps-body">
              <div class="step step-completed">
                <span class="step-indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-check"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span class="step-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-check-circle"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </span>
                Order confirmed
              </div>
              <div class="step step-completed">
                <span class="step-indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-check"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span class="step-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-settings"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </span>
                Processing order
              </div>

              <div class="step">
                <span class="step-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-truck"
                  >
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </span>
                Product dispatched
              </div>
              <div class="step">
                <span class="step-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-home"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </span>
                Product delivered
              </div>
              {userType == "Buyer" ? (
              <NavLink class="step step-active" onClick={onRate}>
                <span class="step-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-award"
                  >
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </span>
                <div className="rate-text text-center">Rate</div>
              </NavLink>
               ) : ""}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 mb-2">
              <div className="col bg-secondary h-100 pt-4 pb-4 text-dark text-center">
                <div className="row-cols-1 text-center">
                <span className="font-weight-semibold mr-2">Order Date:</span>{orderDate}</div>
                <div className="row-cols-1 text-center">
                <span className="font-weight-semibold mr-2">Status:</span></div>
              </div>
            </div>
            <div className="col-sm-4 mb-2">
              <div className="col bg-secondary p-4 pb-4 text-dark text-center">
                <div className="row-cols-1 text-center">
                <span className="font-weight-semibold mr-2">{method} date:</span>{receiveDate}</div>
                <div className="row-cols-1 text-center">
                <span className="font-weight-semibold mr-2">Shipped via:</span>UPS
                Ground</div>
                <div className="row-cols-1 text-center">
                <div className="address font-weight-semibold mr-2">
                  <span className="font-weight-semibold mr-2">{method} Address:</span>
                  {method === "Delivery" ? (
                      <div>{pickUpAddress}</div>
                  ) : (
                      <div>{shipAddress}</div>
                  )}</div></div>
              </div>
            </div>
            <div className="col-sm-4 mb-2">
              <div className="bg-secondary p-4 h-100 text-dark text-center">
                <div className="row-cols-1 text-center">
                <span className="price-before-tax font-weight-semibold mr-2">Price before Tax:</span>€{totalwoTax}</div>
                <div className="row-cols-1 text-center">
                <span className="tax font-weight-semibold mr-2">Tax:</span>€{tax}</div>
                <div className="row-cols-1 text-center">
                <span className="total-price font-weight-semibold mr-2">Total Price:</span>€{price}</div>
              </div>
            </div>
          </div>
        </div>

        {userType == "Buyer" ? (
    
          <h4 className="items-bought text-center">
            Items Bought
          </h4>
          
          ) : userType == "Seller"? (
            <h4 className="items-bought text-center">
            Items Sold
          </h4>
        ) : ""}
       
        <div
          className="list-whole w-100"
          style={{ paddingInline: 250 }}
        >
          <ListGroup style={{marginBottom:50}}>{renderedList}</ListGroup>
          </div>
        
   
      </span>
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.object,
  items: PropTypes.object,
};

const mapStateToProps = (state) => ({
  purchase: state.purchase,
});

export default connect(mapStateToProps, {
  getPurchase,
  changePurchase,
})(withRouter(OrderDetails));
