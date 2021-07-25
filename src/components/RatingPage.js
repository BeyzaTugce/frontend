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

import { getPurchase,getPurchases, changePurchase, getPurchaseSeller, loadSeller } from "../redux/actions/PurchaseActions";

import { changeUser} from "../redux/actions/UserActions";
import { deleteItem } from "../redux/actions/ItemActions";
import { getGarage, getItems, deleteGarage } from "../redux/actions/GarageActions";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Header from "./Header";
import RateItem from "./RateItem";

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
  let { match, getPurchase, getGarage, getItems, changeUser,deleteGarage } = props;
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.auth.user);
  const purchase = useSelector((state) => state.purchase);
  const garage = useSelector((state) => state.garage);
  const [userType, setUserType] = useState("Unknown");
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [methodType, setMethodType] = useState("Unknown");
  const [comment, setComment] = React.useState("");
  const [garageItems, setGarageItems] = useState([]);
  const classes = useStyles();
  let totalRating = 0;
  let purchaseNumber = 0;
  let newAvgRating = 0;
  let purchaseReached = false;
  let purchasesReached = false;
  let itemsReached = false;
  let garageReached = false;
  let itemsRemoved = false;

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
    getPurchases();
  }, [ purchase.purchases, purchasesReached === false]);

  useEffect(() => {
    if (purchase.purchases !== undefined && purchase.purchases !== null) {
      purchasesReached = true;
    }
  }, [purchase.purchases,purchasesReached === false]);
  

  useEffect(() => {
    console.log("second use effect " + purchaseReached);
    if (purchase.purchase !== undefined && purchase.purchase !== null) {

      checkUser();
      checkMethod();
      store.dispatch(loadSeller(purchase.purchase.seller));
      let garageId = purchase?.purchase?.garageId;
      getGarage(garageId);

    }
  }, [purchase.purchase, purchaseReached]);


  useEffect(() => {
    
    if(purchase?.purchases?.purchases !== null && purchase.purchases !== undefined){
      purchase?.purchases?.purchases?.filter(p => p.seller == purchase?.purchase?.seller).map( p => {
        totalRating = totalRating + p.rating;
        purchaseNumber = purchaseNumber + 1;
        console.log("rating "+p.rating + " totalRating"+ totalRating + "purchaseNumber"+purchaseNumber);
    });
  }

}, [purchasesReached, purchase.purchases] );

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


  const packSeller= () => {
    let back = {
      ...props.purchase,
    };
    back._id = purchase.seller._id;
    newAvgRating =  (totalRating + value)  /(purchaseNumber + 1);
    console.log("newAvgRating "+ newAvgRating);
    back.avgRating= newAvgRating;
    return back;
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
      itemsRemoved = true;
    });
  };

  useEffect(() => {
    let garageId =  purchase?.purchase?.garageId;
    getGarage(garageId);
  }, [match.params, garageReached === false,  purchaseReached ===true]);

  useEffect(() => {
    if (garage.garage !== undefined && garage.garage !== null) {
      garageReached = true;
    }
  }, [garage.garage, garageReached === false,  purchaseReached ===true]);


  useEffect(() => {
    let garageId = purchase?.purchase?.garageId;
    getItems(garageId);
  }, [match.params, itemsReached === false, itemsRemoved === true,  purchaseReached ===true]);

  useEffect(() => {
    if (garage.garageItems !== undefined && garage.garageItems !== null) {
      itemsReached = true;
    }
  }, [garage.garageItems, itemsReached === false,itemsRemoved === true,  purchaseReached ===true]);

  useEffect(() => {
    console.log("second use effect " + itemsReached);
    if (garage.garageItems !== undefined && garage.garageItems !== null && garage.garageItems.items.length === 0) {
      deleteGarage(purchase.purchase.garageId);
    }
  }, [garage.garageItems, itemsReached=== true, itemsRemoved === true,  purchaseReached ===true]);



  const backToMainPage = (e) => {
    e.preventDefault();
    store.dispatch(changePurchase(packPurchase()));
    itemListRemove();
    changeUser(packSeller());
    history.push(`../home`);
  };

  const renderedList = purchase.purchase?.selectedItemList.map((garageItem) => {
    return (
      <div
          className="d-flex align-items-center border"
          style={{ border: "#85A582", borderColor: "#85A582" }}>
        <div className="text-center">
          <Rating
              name="hover-feedback"
              style={{marginLeft:15}}
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
        <div className="flex-grow-1">
          <RateItem
              name={garageItem.name}
              info={garageItem.info}
              tags={garageItem.tags}
              price={garageItem.price}
              itemId={garageItem._id}
              button1Name={"Details"}
              //userView={false}
              image={garageItem.image}
          />
        </div>
      </div>
    );
  })

  return (
    <div>
      <Header />
        <div style={{paddingInline:100}}>
          <div
              className="jumbotron jumbotron-fluid bg-white"
              style={{ marginTop: -10}}
          >
            <h1 className="display-5 text-center">Rate Your Purchase</h1>
          </div>
          <ListGroup className="mb-3">{renderedList}</ListGroup>

          <InputGroup className="mb-3">
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
          <div className="buttons d-flex align-items-center justify-content-center" style={{marginBottom:20}}>
            <Button
              className="btn-purple"
              variant="light"
              style={{ marginRight: 8 }}
            >
              Go Back
            </Button>
            <Button
              className="btn-green"
              variant="light"
              onClick={backToMainPage}
            >
              Confirm
            </Button>
          </div>
        </div>

    </div>
  );
};

export default connect(null, {
  getPurchase,
  getPurchases,
  getPurchaseSeller,
  changePurchase,
  getGarage,
  getItems,
  changeUser,
  deleteGarage
})(withRouter(RatingPage));
