import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
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
} from "../redux/actions/OfferActions";
import { withRouter } from "react-router-dom";

const Bargain = (props) => {
    const [show, setShow] = useState(false);
    const [enterOffer, setEnterOffer] = useState({ price: 10 });
    const handleToggle = () => {setShow(!show)};
    const [turn, setTurn] = useState(false);
    const [thisOfferHistory, setThisOfferHistory] = useState([]);
    const paramsId = props.match.params.id
    const history = useHistory();
    const { offers } = props.offer;
    let offersArray = offers.offerHistory;
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
          price: enterOffer.price,
          offerHistory: [...thisOfferHistory, enterOffer.price],
          sellerUserName: "aaa",
          buyerUserName: "bbb"
        };
      // Add item via addItem action
      props.makeOffer(paramsId, newOffer);
      //setThisOfferHistory(...thisOfferHistory, enterOffer.price)
      // Close modal
      handleToggle();
      setTurn(!turn);
    };

    const handleCancelClick = e => {
      e.preventDefault();
      props.withdrawOffer(paramsId);
      history.push('/garage');
    }

    return (
      <Container>
            <Button className="mr-5" variant="success" size="lg">
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
                xmin={offersArray && (offersArray[offersArray.length-1]+1)}
                xmax={100}
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
        <ListGroup>
          <TransitionGroup className="offers">
            {offers.offerHistory && offers.offerHistory.map((price, index) => (
              <CSSTransition key={index} timeout={1000} classNames="fade">
                {turn ? (
                  <Button variant="success" className="btn btn-warning btn-circle btn-xl mt-4 mb-3" block>
                    {price}
                  </Button>
                ) : (
                  <Button variant="dark" className="btn btn-warning btn-circle btn-xl mt-4 mb-3" block>
                    {price}
                  </Button>
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
  loading: state.loading
});

// this.props.withdrawOffer, this.props.getOfferHistory, ...
export default connect(mapStateToProps, {
  getOfferHistory,
  makeOffer,
  withdrawOffer,
  setOffersLoading,
})(withRouter(Bargain));

// export default Offer;
//export default connect()(withRouter(Bargain));