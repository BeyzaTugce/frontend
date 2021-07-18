import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, Button, ListGroup, ListGroupItem, Modal, Alert } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Bargain.css";
import { PropTypes } from "prop-types";
import { connect, useSelector } from "react-redux";
import Slider from "react-input-slider";
import {
  getOfferHistory,
  makeOffer,
  withdrawOffer,
  setOffersLoading,
  // loadBuyer, 
  // loadSeller
} from "../redux/actions/OfferActions";
import { withRouter } from "react-router-dom";
import store from '../redux/store';
import { getPurchase, changePurchase, loadBuyer, loadSeller } from "../redux/actions/PurchaseActions";
import GarageItem from "./GarageItem";

const Bargain = (props) => {
  const loggedInUser = useSelector((state) => state.auth.user);
  const purchase = useSelector((state) => state.purchase);
  let {match, getPurchase, loadBuyer, loadSeller} = props;
    const [show, setShow] = useState(false);
    const [enterOffer, setEnterOffer] = useState({ price: Math.floor(purchase?.purchase?.price * 0.6) });
    const [seller, setSeller] = React.useState();
    const [buyer, setBuyer] = React.useState();
    const handleToggle = () => {setShow(!show)};
    const [turn, setTurn] = useState(false);
    const [thisOfferHistory, setThisOfferHistory] = useState([]);
    const purchaseId = match.params.id;
    const history = useHistory();
    const { offers } = props.offer;
    
    let offersArray = offers?.offerHistory;

    //let purchaseId = props.match.params.id;
    getPurchase(purchaseId);
    console.log(purchase.purchase);


    useEffect(() => {

        props.getOfferHistory(purchaseId);
        props.loadBuyer(purchase?.purchase?.buyer);
        props.loadSeller(purchase?.purchase?.seller);
        // document.write(seller.firstname);
    }, [match.params]);

    //const { loading } = props.loading;

    // useEffect(() => {
    //   //console.log(offersArray);
    //   props.getOfferHistory(paramsId);
      
    //   //lastOffer = offers.offerHistory[offers.offerHistory.length - 1];
    // }, [props.loading]);


    const handleOnClick = e => {
      e.preventDefault();
      //setThisOfferHistory(thisOfferHistory => [...thisOfferHistory, enterOffer.price]);
      const newOffer = {
          //id: uuid(),
          purchaseId: match.params.id,
          price: enterOffer.price,
          offerHistory: [...thisOfferHistory, enterOffer.price],
        };
      // Add item via addItem action
      props.makeOffer(purchaseId, newOffer);
      //setThisOfferHistory(...thisOfferHistory, enterOffer.price)
      // Close modal
      handleToggle();
      setTurn(!turn);
      props.getOfferHistory(purchaseId);
      loadBuyer(purchase?.purchase?.buyer);
      loadSeller(purchase?.purchase?.seller);
    };


    useEffect(() => {
      let purchaseId = props.match.params.id;
      getPurchase(purchaseId);
      props.getOfferHistory(purchaseId);
      loadBuyer(purchase?.purchase?.buyer);
      loadSeller(purchase?.purchase?.seller);

     // document.write(seller.firstname);
    }, []);
    //console.log(purchase.purchase.seller);
    // loadBuyer("60edb706c917c34e50150ae0");
    // loadSeller("60f043471af3a3e352a4abf4");
    const handleCancelClick = e => {
      e.preventDefault();
      props.withdrawOffer(purchaseId);
      history.push('/home');
    }

    const acceptOffer = (e) => {
      e.preventDefault();
      store.dispatch(changePurchase(packPurchase()));
      history.push(`../delivery/${purchase.purchase._id}`)
    }

    const packPurchase = () => {
      let back = {
        ...props.purchase,
      };
      back._id =purchase.purchase._id;
      back.creationDate = purchase.purchase.creationDate;
      back.buyer = purchase.purchase.buyer;
      back.seller = purchase.purchase.seller;
      back.garageId = purchase.purchase.garageId;
      back.method = purchase.purchase.method;
      back.price = offersArray[offersArray.length-1];
      back.selectedItemList = purchase.purchase.selectedItemList;
      back.purchaseStatus= "DeliveryScheduling";
  
      return back;
    };

    const renderedListItem = purchase.purchase?.selectedItemList.map((item) => {
      return (
          <GarageItem
              name={item.name}
              info={item.info}
              tags={item.tags}
              price={item.price}
          />
      );
    });

    return (
      <Container>
            <Button className="mr-5" variant="success" size="lg" onClick={acceptOffer}>
                Accept Offer
            </Button>
            {turn ? (
            <Button className="mr-5" variant="primary" size="lg" onClick={handleToggle}>
                New Offer
            </Button>
            ) : (
            <Button className="mr-5" variant="dark" size="lg" onClick={handleToggle}>
                New Offer
            </Button>
            )}
        {/* <Button variant="primary" onClick={handleToggle}>
            New Offer
        </Button> */}
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
                xmin={(offersArray && (offersArray[offersArray.length-1]+1)) || Math.floor(purchase?.purchase?.price * 0.6)}
                xmax={purchase?.purchase?.price}
                onChange={({ x }) => setEnterOffer(offer => ({ ...offer, price: x }))}
                />
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleToggle}>
                Cancel
            </Button>
            <Button variant="primary" 
            onClick={(e) => { if (window.confirm(`Please confirm your offer for selected product(s): ${enterOffer.price}€`)) handleOnClick(e) } }>
                    Make Offer
            </Button>
            </Modal.Footer>
        </Modal>
        <Button
          variant="danger"
          className="mt-3 mb-3"
          onClick={(e) => { if (window.confirm(`Are you sure you want to cancel bargain process?`)) handleCancelClick(e) } }
          size="lg"
        >
          Cancel Bargain
        </Button>
        <ListGroup>{renderedListItem}</ListGroup>       
        <ListGroup>
          <TransitionGroup className="offers">
            {offers?.buyer == loggedInUser ? (
            <div className="d-flex w-100 justify-content-between mt-3">
                <Alert variant="info" style={{"font-size":20, "text-align":"center", width:250}} block>
                  <strong>{props.buyer?.username}</strong>
                </Alert>
                <Alert variant="danger" style={{"font-size":20, "text-align":"center", width:250}} block>
                  <strong>{props.seller?.username}</strong>
                </Alert>
            </div>
            ) : (
            <div className="d-flex justify-content-between mt-3">
                <Alert variant="danger" style={{"font-size":20,"text-align":"center", width:250}} block>
                  <strong>{props.seller?.username}</strong>
                </Alert>
                <Alert variant="info" style={{"font-size":20, "text-align":"center", width:250}} block>
                  <strong>{props.buyer?.username}</strong>
                </Alert>
            </div>
            )}
            {offers?.offerHistory?.map((price, index) => (
              <CSSTransition key={index} timeout={1000} classNames="fade">
                {(index%2) ? (
                    <div className="d-inline-flex w-100 justify-content-end">
                      
                        <Button variant="success" className="btn float-right" style={{width:250}} block>
                            {price}
                        </Button>
                    </div>
                ) : (
                    <div className="d-inline-flex w-100 justify-content-start">
                        <Button variant="dark" className="btn" style={{width:250}} block>
                            {price}
                        </Button>
                    </div>
                )}
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
};


Bargain.propTypes = {
  getOfferHistory: PropTypes.func.isRequired,
  makeOffer: PropTypes.func.isRequired,
  withdrawOffer: PropTypes.func.isRequired,
  setOffersLoading: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  offer: state.offer,
  loading: state.loading,
  buyer: state.offer.buyer,
  seller: state.offer.seller
});

// this.props.withdrawOffer, this.props.getOfferHistory, ...
export default connect(mapStateToProps, {
  getOfferHistory,
  makeOffer,
  withdrawOffer,
  setOffersLoading,
  getPurchase,
  changePurchase,
  loadBuyer,
  loadSeller

})(withRouter(Bargain));




// export default Offer;
//export default connect()(withRouter(Bargain));