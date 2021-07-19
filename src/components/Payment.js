import { PayPalButton } from "react-paypal-button-v2";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import store from "../redux/store";
import { Container, Row, Col, Jumbotron, Form, Button } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPurchase, changePurchase } from "../redux/actions/PurchaseActions";

const Payment = (props) => {
  const purchase = useSelector((state) => state.purchase);
  const loggedInUser = useSelector((state) => state.auth.user);
  const [userType, setUserType] = useState("Unknown");
  let { match, getPurchase } = props;
  const history = useHistory();
  useEffect(() => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
  }, [match.params]);

  useEffect(() => {
    checkUser();
}, [loggedInUser]);

const checkUser = () => {
  if(loggedInUser != null){
    if (loggedInUser._id == purchase.purchase.seller) {
      setUserType("Seller");
    } else if (loggedInUser._id == purchase.purchase.buyer) {
      setUserType("Buyer");
    }
  }
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
    back.method = purchase.purchase.method;
    back.purchaseStatus = "Order";
    back.availableDates = purchase.purchase.availableDates;
    back.pickupLocation = purchase.purchase.pickupLocation;
    back.pickUpDate = purchase.purchase.pickUpDate;

    return back;
  };

  const goToOrderPage = (e) => {
    e.preventDefault();
    store.dispatch(changePurchase(packPurchase()));
    history.push(`../order/${purchase.purchase._id}`);
  };

  return (
    <div className="Payment">
      {userType == "Buyer" ? (
        <PayPalButton
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: "0.01",
                  },
                },
              ],
              // application_context: {
              //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
              // }
            });
          }}
          onApprove={(data, actions) => {
            // Capture the funds from the transaction
            return actions.order.capture().then(function (details) {
              // Show a success message to your buyer
              alert(
                "Transaction completed by " + details.payer.name.given_name
              );

              // OPTIONAL: Call your server to save the transaction
              return fetch("/paypal-transaction-complete", {
                method: "post",
                body: JSON.stringify({
                  orderID: data.orderID,
                }),
              });
            });
          }}
        />
      ) : (
        "You are not a buyer or seller. Check if you are logged in"
      )}
      <div className="buttons d-flex align-items-center justify-content-center">
        <Button
          className="btn border-0"
          variant="dark"
          style={{ backgroundColor: "#A282A5", marginRight: 8 }}
        >
          Go Back
        </Button>
        <Button
          className="btn border-0 text-white"
          variant="light"
          style={{ backgroundColor: "#85A582" }}
          onClick={goToOrderPage}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  purchase: state.purchase,
});
export default connect(mapStateToProps, {
  getPurchase,
  changePurchase,
})(withRouter(Payment));
