import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import store from "../redux/store";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Bargain.css";
import { PropTypes } from "prop-types";
import { connect, useSelector } from "react-redux";
import Slider from "react-input-slider";

import {
  Container,
  Button,
  ListGroup,
  Modal,
  Alert,
} from "react-bootstrap";

import {
  getOfferHistory,
  makeOffer,
  withdrawOffer,
  setOffersLoading,
} from "../redux/actions/OfferActions";

import {
  getPurchase,
  changePurchase,
  loadBuyer,
  loadSeller,
} from "../redux/actions/PurchaseActions";
import ListItem from "./ListItem";

const Bargain = (props) => {

  let { match, getPurchase, loadBuyer, loadSeller } = props;
 


  const loggedInUser = useSelector((state) => state.auth.user);
  const purchase = useSelector((state) => state.purchase);
  const offer = useSelector((state) => state.offer);
  let offersArray = offer?.offers?.offerHistory;

  const [show, setShow] = useState(false);
  const [enterOffer, setEnterOffer] = useState({
    price: Math.floor(purchase?.purchase?.price * 0.6),
  });

  const [turn, setTurn] = useState(false);
  const [thisOfferHistory, setThisOfferHistory] = useState([]);
  const purchaseId = match.params.id;
  const history = useHistory();
  const [offerCount, setOfferCount] = useState(0);
  const [offerTurn, setOfferTurn] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const handleToggle = () => {
    setShow(!show);
  };

  useEffect(() => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
    loadBuyer(purchase?.purchase?.buyer);
    loadSeller(purchase?.purchase?.seller);
  }, [match.params]);

  useEffect(() => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
    // getPurchaseBuyer();
    // getPurchaseSeller();
    loadBuyer(purchase?.purchase?.buyer);
    loadSeller(purchase?.purchase?.seller);
    //history.push(`../bargain/${purchase.purchase._id}`)
  }, [offerCount]);

  useEffect(() => {
    checkStatus();
  }, [purchase?.purchase]);

  const packPurchase = () => {
    let back = {
      ...props.purchase,
    };
    back._id = purchase.purchase._id;
    back.creationDate = purchase.purchase.creationDate;
    back.buyer = purchase.purchase.buyer;
    back.seller = purchase.purchase.seller;
    back.garageId = purchase.purchase.garageId;
    back.method = purchase.purchase.method;
    back.price = offersArray[offersArray.length - 1];
    back.selectedItemList = purchase.purchase.selectedItemList;
    back.purchaseStatus = "DeliveryScheduling";

    return back;
  };

  const packOffer = () => {
    let back = {
      ...props.offer,
    };
    back.purchaseId = match.params.id;
    back.price = enterOffer.price;
    back.offerHistory = [...thisOfferHistory, enterOffer.price];

    return back;
  };


  const handleOnClick = (e) => {
    e.preventDefault();
    props.makeOffer(purchaseId, packOffer());
    props.getOfferHistory();
    handleToggle();
    setTurn(!turn);
    setOfferTurn(!offerTurn);
    setOfferCount(offerCount + 1);
    history.push(`../bargain/${purchase.purchase._id}`);
  };

  useEffect(() => {
    if (!props.offers) {
      props.getOfferHistory(purchaseId);
      props.loadBuyer(purchase?.purchase?.buyer);
      props.loadSeller(purchase?.purchase?.seller);
    }
  }, [offerCount]);

  const handleCancelClick = (e) => {
    e.preventDefault();
    props.withdrawOffer(purchaseId);
    history.push("/home");
  };

  const acceptOffer = (e) => {
    e.preventDefault();
    store.dispatch(changePurchase(packPurchase()));
    history.push(`../delivery/${purchase.purchase._id}`);
  };

  const checkStatus = () => {
    if (purchase?.purchase?.purchaseStatus == "DeliveryScheduling") {
      history.push(`../delivery/${purchase.purchase._id}`);
    }
  };

  const isBuyer = () => {
    if(props.buyer?._id == loggedInUser?._id)
      return true
    return false
  }

  const isSeller = () => {
    if(props.seller?._id == loggedInUser?._id)
      return true
    return false
  }

  // const acceptCondition = () => {
  //   if (offersArray && offersArray.length == 0) {
  //     return true
  //   }
  //   else if (isBuyer && offerTurn)
  //       return true
  //   else if (isSeller && !offerTurn)
  //       return true
  //   return false
  // }

  const xMax = (arr) => {
    if(arr === undefined)
      return 
    else if(arr.length<2)
      return purchase?.purchase?.price;
    else if (isBuyer())
      return arr[arr.length - 1]
    else
      return arr[arr.length - 2]
  }

  const xMin = (arr) => {
    if(arr === undefined)
      return
    else if(arr.length==0) {
      return Math.floor(purchase?.purchase?.price * 0.6);
    }
    else if (isSeller()) {
      return (arr[arr.length - 1]) 
    }
      
    else if(isBuyer()) {
      return ((arr[arr.length - 2])) 
    }
      
  }


  const renderedListItem = purchase.purchase?.selectedItemList.map((item) => {
    return (
      <ListItem
        name={item.name}
        info={item.info}
        tags={item.tags}
        price={item.price}
        garageId={item.garageId}
        username={item.username}
      />
    );
  });

  return (
    <Container>
      <Button
        className="mr-5"
        variant="success"
        size="lg"
        onClick={acceptOffer}
      >
        Accept Offer
      </Button>
      {turn ? (
        <Button
          className="mr-5"
          variant="primary"
          size="lg"
          onClick={handleToggle}
        >
          New Offer
        </Button>
      ) : (
        <Button
          className="mr-5"
          variant="dark"
          size="lg"
          onClick={handleToggle}
        >
          New Offer
        </Button>
      )}
      <Modal show={show} onHide={handleToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Please select your offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            ({enterOffer.price})
            {/* <Slider axis="x" x={state.x} onChange={setState} /> */}
            <Slider
              styles={{
                track: {
                  backgroundColor: "blue",
                },
                active: {
                  backgroundColor: "red",
                },
                thumb: {
                  width: 15,
                  height: 15,
                },
                disabled: {
                  opacity: 0.5,
                },
              }}
              axis="x"
              x={enterOffer.price}
              xmin={xMin(offersArray)}
              // xmax (offersArray?.length==0)? purchase?.purchase?.price : offersArray[offersArray.length - 1]
              xmax={xMax(offersArray)}
              onChange={({ x }) =>
                setEnterOffer((offer) => ({ ...offer, price: x }))
              }
              {...console.log(isBuyer())}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggle}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              if (
                window.confirm(
                  `Please confirm your offer for selected product(s): ${enterOffer.price}€`
                )
              )
                handleOnClick(e);
            }}
          >
            Make Offer
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        variant="danger"
        className="mt-3 mb-3"
        onClick={(e) => {
          if (
            window.confirm(`Are you sure you want to cancel bargain process?`)
          )
            handleCancelClick(e);
        }}
        size="lg"
      >
        Cancel Bargain
      </Button>
      <ListGroup>{renderedListItem}</ListGroup>
      <ListGroup>
        <TransitionGroup className="offers">
          {offer?.buyer === loggedInUser ? (
            <div className="d-flex w-100 justify-content-between mt-3">
              <Alert
                variant="info"
                style={{ "font-size": 20, "text-align": "center", width: 250 }}
                block
              >
                <strong>{props.seller?.username}</strong>
              </Alert>
              <Alert
                variant="danger"
                style={{ "font-size": 20, "text-align": "center", width: 250 }}
                block
              >
                <strong>{props.buyer?.username}</strong>
              </Alert>
            </div>
          ) : (
            <div className="d-flex justify-content-between mt-3">
              <Alert
                variant="danger"
                style={{ "font-size": 20, "text-align": "center", width: 250 }}
                block
              >
                <strong>{props.buyer?.username}</strong>
              </Alert>
              <Alert
                variant="info"
                style={{ "font-size": 20, "text-align": "center", width: 250 }}
                block
              >
                <strong>{props.seller?.username}</strong>
              </Alert>
            </div>
          )}
          {offer?.offers?.offerHistory?.map((price, index) => (
            <CSSTransition key={index} timeout={1000} classNames="fade">
              {index % 2 ? (
                <div className="d-inline-flex w-100 justify-content-end">
                  <Button
                    variant="success"
                    className="btn float-right"
                    style={{ width: 250 }}
                    block
                  >
                    {price}
                  </Button>
                </div>
              ) : (
                <div className="d-inline-flex w-100 justify-content-start">
                  <Button
                    variant="dark"
                    className="btn"
                    style={{ width: 250 }}
                    block
                  >
                    {price}
                  </Button>
                </div>
              )}
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

Bargain.propTypes = {
  getOfferHistory: PropTypes.func.isRequired,
  makeOffer: PropTypes.func.isRequired,
  withdrawOffer: PropTypes.func.isRequired,
  setOffersLoading: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
  loading: state.loading,
  buyer: state.offer.buyer,
  seller: state.offer.seller,
});

export default connect(mapStateToProps, {
  getOfferHistory,
  makeOffer,
  withdrawOffer,
  setOffersLoading,
  getPurchase,
  changePurchase,
  loadBuyer,
  loadSeller,
})(withRouter(Bargain));

