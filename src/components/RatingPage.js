import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import store from "../redux/store";
import InputGroup from "react-bootstrap/InputGroup";
import { Form, Button } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import GarageItem from "./GarageItem";
import "react-nice-dates/build/style.css";

import { getPurchase, changePurchase } from "../redux/actions/PurchaseActions";
import { deleteItem } from "../redux/actions/ItemActions";
import { getGarage } from "../redux/actions/GarageActions";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});

const RatingPage = (props) => {
  let { match, getPurchase } = props;
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.auth.user);
  const purchase = useSelector((state) => state.purchase);
  const [userType, setUserType] = useState("Unknown");
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [methodType, setMethodType] = useState("Unknown");
  const [comment, setComment] = React.useState("");
  const [garageItems, setGarageItems] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
  }, [match.params]);

  useEffect(() => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
    checkUser();
  }, [purchase.purchase]);

  useEffect(() => {
    checkMethod();
  }, [loggedInUser]);

  useEffect(() => {
    let garageId = purchase?.purchase?.garageId;
    getGarage(garageId);
  }, [purchase.purchase != null]);

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const checkUser = () => {
    if (loggedInUser != null) {
      if (loggedInUser._id === purchase?.purchase?.seller) {
        setUserType("Seller");
      } else if (loggedInUser._id === purchase?.purchase?.buyer) {
        setUserType("Buyer");
      }
    }
  };

  const checkMethod = () => {
    if (purchase.purchase != null) {
      setMethodType(purchase.purchase.method);
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
    back.rating = value;
    back.ratingComment = comment;
    back.purchaseStatus = "Closed";
    back.availableDates = purchase.purchase.availableDates;
    back.pickupLocation = purchase.purchase.pickupLocation;
    back.pickUpDate = purchase.purchase.pickUpDate;
    back.method = purchase.purchase.method;
    return back;
  };

  const itemListRemove = () => {
    purchase.purchase?.selectedItemList.map((garageItem) => {
      //console.log("garageItem._id" + garageItem._id);
      store.dispatch(deleteItem(garageItem._id));
    });
  };
  const backToMainPage = (e) => {
    e.preventDefault();
    //   props.onCreate(packPickUp());
    store.dispatch(changePurchase(packPurchase()));
    itemListRemove();
    history.push(`../home`);
  };

  const renderedList = purchase.purchase?.selectedItemList.map((garageItem) => {
    return (
      <div className="RateList">
        <GarageItem
          name={garageItem.name}
          info={garageItem.info}
          tags={garageItem.tags}
          price={garageItem.price}
          itemId={garageItem._id}
          button1Name={"Details"}
          //userView={false}
          image={garageItem.image}
        />

        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          size="large"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {value !== null && (
          <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </div>
    );
  });

  return (
    <div>
      {userType == "Buyer" ? (
        <div>
          <ListGroup>{renderedList}</ListGroup>

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Comment</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              placeholder="Please enter a comment"
              fullWidth
              value={comment}
              onChange={onChangeComment}
              required
            />
          </InputGroup>
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
              onClick={backToMainPage}
            >
              Confirm
            </Button>
          </div>
        </div>
      ) : (
        "You are not a buyer . You cannot rate this purchase "
      )}
    </div>
  );
};

export default connect(null, {
  getPurchase,
  changePurchase,
})(withRouter(RatingPage));
