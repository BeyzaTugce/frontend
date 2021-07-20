
import React, { useState, useEffect } from "react";
import {
    ListGroup,
} from "react-bootstrap";
import "./OrderDetails.css";
import GarageItem from "./GarageItem";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import user from "../redux/reducers/userReducer";
import { Container, Row, Col, Jumbotron, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getPurchase, changePurchase } from "../redux/actions/PurchaseActions";


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
  if(loggedInUser != null){
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
    setPrice(purchase.purchase.price +tax);
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

    //will get the items from purchase.
    const extractItems = () => {
        let purchaseId = match.params.id;
        getPurchase(purchaseId);
        if (!purchase?.purchase?.selectedItemList ) {
            return;
        }
        setItems(purchase.purchase.selectedItemList)
    }

    const extractSeller = () => {
        if (!props.seller ) {
            return;
        }
        setSellerName(props.seller.firstname);
    }

    useEffect(() => {
       // extractOrder();
        extractSeller();
        extractItems();
    }, [props.order, props.seller, props.items] );

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
              <div
                  className="jumbotron jumbotron-fluid bg-white"
                  style={{ marginBottom: -10 }}
              >
                  <h2 className="display-5 text-center">Order from {sellerName}'s Garage on {orderDate}</h2>
                  <p
                      className="text-sm-center"
                      style={{ fontSize: 20 }}
                  >
                      Status: {status}
                  </p>
              </div>

              <div className="d-flex justify-content-center" style={{paddingInline:50}}>
                  <div className="order-details d-flex justify-content-center w-50">
                      <div className="delivery-pickup-details d-flex justify-content-start w-50">
                          <div className="delivery-pickup-labels text-right text-nowrap" style={{paddingRight:5}}>
                              <div className="date">{method} Date: </div>
                              <div className="address">{method} Address: </div>
                          </div>
                          <div className="delivery-pickup-values">
                              <div className="date">
                                  {method === "Delivery" ?
                                      <div>{shipDate}</div> :
                                      <div>{pickUpDate}</div>
                                  }</div>
                              <div className="address text-wrap">
                                  {method === "Delivery" ?
                                      <div>{pickUpAddress}</div> :
                                      <div>{shipAddress}</div>
                                  }</div>
                          </div>
                      </div>
                      <div className="payment-details d-flex justify-content-start w-50">
                          <div className="payment-detail-labels text-right" style={{paddingRight:5}}>
                             
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

              <div className="list-whole w-100" style={{ paddingInline: 50, paddingTop:30 }}>
                      <p
                          className="items-bought text-sm-center" style={{fontSize: 20}}
                      >
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
  