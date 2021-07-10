import React, { useEffect } from "react";
import {
    ListGroup,
} from "react-bootstrap";
import "./OrderDetails.css";
import GarageItem from "./GarageItem";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";

const OrderDetails = (props) => {
    const [sellerName, setSellerName] = React.useState(" ");
    const [status, setStatus] = React.useState("New");
    const [orderDate, setOrderDate] = React.useState(" ");
    const [method, setMethod] = React.useState("Delivery");
    const [date, setDate] = React.useState("Not specified");
    const [address, setAddress] = React.useState("Not specified");
    const [paymentMethod, setPaymentMethod] = React.useState("Not specified");
    const [totalwoTax, setTotalwoTax] = React.useState(0);
    const [tax, setTax] = React.useState(0);
    //const [items, setItems] = React.useState([]);

    const totalPrice = () => {
        let price = totalwoTax+tax;
        return price;
    }

    const extractOrder = () => {
        if (!props.order ) {
            return;
        }

        setStatus(props.order.enum);
        setOrderDate(props.order.ordered);
        setMethod(props.order.method);
        if (method == "Delivery"){
            setAddress(props.order.ship_to);
        }
        //not sure about shipped cause what will we do if it's pick-up?
        setDate(props.order.shipped);
        setTotalwoTax(props.order.total);
    }

    //will get the items from purchase.
    const extractItems = () => {
        if (!props.items ) {
            return;
        }
        //setGarageItems(props.purchase.items)
    }

    const extractSeller = () => {
        if (!props.seller ) {
            return;
        }

        setSellerName(props.seller.firstname)
        if (method == "Pick-Up"){
            setAddress(props.seller.address);
        }
    }

    useEffect(() => {
        extractOrder();
    }, [props.order] );

    useEffect(() => {
        extractSeller();
    }, [props.seller] );

    useEffect(() => {
        extractItems();
    }, [props.items] );

    const items = [];

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
                              <div className="date">{date}</div>
                              <div className="address text-wrap">{address}</div>
                          </div>
                      </div>
                      <div className="payment-details d-flex justify-content-start w-50">
                          <div className="payment-detail-labels text-right" style={{paddingRight:5}}>
                              <div className="payment-method">Payment Method: </div>
                              <div className="price-before-tax">Price before Tax: </div>
                              <div className="tax">Tax: </div>
                              <div className="total-price">Total Price: </div>
                          </div>
                          <div className="payment-detail-values">
                              <div className="payment-method">{paymentMethod}</div>
                              <div className="price-before-tax">{totalwoTax}</div>
                              <div className="tax">{tax}</div>
                              <div className="total-price">{totalPrice()}</div>
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
    //items: PropTypes.object,
};

export default withRouter(OrderDetails);
