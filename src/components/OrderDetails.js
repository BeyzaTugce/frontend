import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "./OrderDetails.css";
import GarageItem from "./GarageItem";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import user from "../redux/reducers/userReducer";
import { Container, Row, Col, Jumbotron, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getPurchase, changePurchase } from "../redux/actions/PurchaseActions";
import RatingPageComponent from "../components/RatingPage";

const OrderDetails = (props) => {
  const [sellerName, setSellerName] = React.useState(" ");
  const [status, setStatus] = React.useState("New");
  const [orderDate, setOrderDate] = React.useState("");
  const [method, setMethod] = React.useState("");
  const [shipDate, setShipDate] = React.useState("Not specified");
  const [pickUpDate, setPickUpDate] = React.useState("");
  const [pickUpAddress, setPickUpAddress] = React.useState("Not specified");
  const [shipAddress, setShipAddress] = React.useState("Not specified");
  const [paymentMethod, setPaymentMethod] = React.useState("Not specified");
  const [totalwoTax, setTotalwoTax] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [tax, setTax] = React.useState(5);
  const [items, setItems] = React.useState([]);

  const purchase = useSelector((state) => state.purchase);
  const loggedInUser = useSelector((state) => state.auth.user);

  const [userType, setUserType] = useState("Unknown");
  let { match, getPurchase } = props;
  const history = useHistory();
  useEffect(() => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
  }, []);

  useEffect(() => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
    checkUser();
  }, [loggedInUser]);

  const checkUser = () => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
    if (loggedInUser != null) {
      if (loggedInUser._id == purchase?.purchase?.seller) {
        setUserType("Seller");
      } else if (loggedInUser._id == purchase?.purchase?.buyer) {
        setUserType("Buyer");
      }
    }
  };

  useEffect(() => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
    setPickUpAddress(purchase.purchase.pickupLocation);
    setPrice(purchase.purchase.price + tax);
    setTotalwoTax(purchase.purchase.price);
    setItems(purchase.purchase.selectedItemList);
    setOrderDate(purchase.purchase.creationDate);
    setMethod(purchase.purchase.method);
    setPickUpDate(purchase.purchase.pickUpDate);
    setShipAddress(purchase.purchase.shipAddress);
    //setMethod(purchase.purchase.method);
    // setPickUpAddress(purchase.purchase.pickUpAddress);
  }, [purchase.purchase != null]);

  /*
    const extractOrder = () => {
        if (!props.order ) {
            return;
        }

        setStatus(props.order.enum);
        setOrderDate(props.order.ordered);
        /*setMethod(props.order.method);
        setShipAddress(props.order.shipAddress);
        setPickUpAddress(props.order.pickUpAddress);
        setPickUpDate(props.order.pickUpDate);
        setShipDate(props.order.shipDate);*/
  /*  setTotalwoTax(props.order.total);
        setTax(props.order.brokerageFee);
    }*/
  let purchaseID = match.params.id;
  //will get the items from purchase.
  const extractItems = () => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
    if (!purchase?.purchase?.selectedItemList) {
      return;
    }
    setItems(purchase.purchase.selectedItemList);
  };

  const extractSeller = () => {
    if (!props.seller) {
      return;
    }
    setSellerName(props.seller.firstname);
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

  useEffect(() => {
    // extractOrder();
    extractSeller();
    extractItems();
  }, [props.order, props.seller, props.items]);

  const renderedList = items.map((garageItem) => {
    return (
      <GarageItem
        name={garageItem.name}
        info={garageItem.info}
        tags={garageItem.tags}
        price={garageItem.price}
        image={garageItem.image}
      />
    );
  });

  return (
    <div className="OrderDetails">
      <span>
        <div class="container pb-5 mb-sm-4">
          <div class="row mb-3">
            <div class="col-sm-4 mb-2">
              <div class="bg-secondary p-4 text-dark text-center">
                <span class="font-weight-semibold mr-2">Shipped via:</span>UPS
                Ground
              </div>
            </div>
            <div class="col-sm-4 mb-2">
              <div class="bg-secondary p-4 text-dark text-center">
                <span class="font-weight-semibold mr-2">Status:</span>
              </div>
            </div>
            <div class="col-sm-4 mb-2">
              <div class="bg-secondary p-4 text-dark text-center">
                <span class="font-weight-semibold mr-2">Expected date:</span>
                June 17, 2019
              </div>
            </div>
          </div>

          <div class="steps">
            <div class="steps-header">
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style={{ width: 40 }}
                  aria-valuenow="40"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
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
              <a
                class="btn btn-primary btn-sm mt-2"
                href="../rating/?purchaseID"
              >
                {" "}
                <div class="step step-active">
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
                  Rate
                </div>
              </a>
            </div>
          </div>

          <div class="d-sm-flex flex-wrap justify-content-between align-items-center text-center pt-4">
            <div class="custom-control custom-checkbox mt-2 mr-3">
              <input
                class="custom-control-input"
                type="checkbox"
                id="notify-me"
                checked=""
              />
            </div>
            <a
              class="btn btn-primary btn-sm mt-2"
              href="#order-details"
              data-toggle="modal"
            >
              View Order Details
            </a>
          </div>
        </div>
        <div
          className="jumbotron jumbotron-fluid bg-white"
          style={{ marginBottom: -10 }}
        >
          <h2 className="display-5 text-center">
            Order from {sellerName}'s Garage on {orderDate}
          </h2>
          <p className="text-sm-center" style={{ fontSize: 20 }}>
            Status: {status}
          </p>
        </div>

        <div
          className="d-flex justify-content-center"
          style={{ paddingInline: 50 }}
        >
          <div className="order-details d-flex justify-content-center w-50">
            <div className="delivery-pickup-details d-flex justify-content-start w-50">
              <div
                className="delivery-pickup-labels text-right text-nowrap"
                style={{ paddingRight: 5 }}
              >
                <div className="date">{method} Date: </div>
                <div className="address">{method} Address: </div>
              </div>
              <div className="delivery-pickup-values">
                <div className="date">
                  {method === "Delivery" ? (
                    <div>{shipDate}</div>
                  ) : (
                    <div>{pickUpDate}</div>
                  )}
                </div>
                <div className="address text-wrap">
                  {method === "Delivery" ? (
                    <div>{pickUpAddress}</div>
                  ) : (
                    <div>{shipAddress}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="payment-details d-flex justify-content-start w-50">
              <div
                className="payment-detail-labels text-right"
                style={{ paddingRight: 5 }}
              >
                <div className="price-before-tax">Price before Tax: </div>
                <div className="tax">Tax: </div>
                <div className="total-price">Total Price: </div>
              </div>
              <div className="payment-detail-values">
                <div className="price-before-tax">€{totalwoTax}</div>
                <div className="tax">€{tax}</div>
                <div className="total-price">€{price}</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="list-whole w-100"
          style={{ paddingInline: 50, paddingTop: 30 }}
        >
          <p className="items-bought text-sm-center" style={{ fontSize: 20 }}>
            Items Bought
          </p>
          <ListGroup>{renderedList}</ListGroup>
        </div>
      </span>
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.object,
  seller: PropTypes.object,
  user: PropTypes.object,
  items: PropTypes.object,
};
const mapStateToProps = (state) => ({
  purchase: state.purchase,
});
export default connect(mapStateToProps, {
  getPurchase,
  changePurchase,
})(withRouter(OrderDetails));
