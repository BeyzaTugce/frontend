import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import "./Bargain.css";
import { PropTypes } from "prop-types";
import { connect, useSelector } from "react-redux";
import Slider from "react-input-slider";
import {
  getOfferHistory,
  makeOffer,
  withdrawOffer,
} from "../redux/actions/OfferActions";
import { withRouter } from "react-router-dom";
import OfferModal from "./Offer";

const Bargain = (props) => {
    const [show, setShow] = useState(false);
    const [offer, setOffer] = useState({ price: 10 });
    const handleToggle = () => {setShow(!show)};
    const [turn, setTurn] = useState(false);
    const history = useHistory();

    const handleOnClick = e => {
      e.preventDefault();
      const newOffer = {price: offer.price};
      console.log(newOffer);
      // Add item via addItem action
      props.makeOffer(newOffer);
      // Close modal
      handleToggle();
      setTurn(!turn);
    };

    const handleCancelClick = e => {
        props.withdrawOffer();
        history.push('/garage');
    }
    const { offers } = props.offer;
    return (
      <Container>
            {turn ? (
            <Button variant="success" onClick={handleToggle}>
                New Offer
            </Button>
            ) : (
            <Button variant="dark" onClick={handleToggle}>
                New Offer
            </Button>
            )}
        {/* <Button variant="primary" onClick={handleToggle}>
            New Offer
        </Button> */}
        <Modal show={show} onHide={handleToggle}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                ({offer.price})
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
                x={offer.price}
                xmin={20}
                onChange={({ x }) => setOffer(offer => ({ ...offer, price: x }))}
                />
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleToggle}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleOnClick}>
                Make Offer
            </Button>
            </Modal.Footer>
        </Modal>
        <Button
          variant="danger"
          className="mt-3 mb-3"
          onClick={handleCancelClick}
        >
          Cancel Bargaining
        </Button>
        <ListGroup>
          <TransitionGroup className="offers">
            {offers.map(({ id, price }) => (
              <CSSTransition key={id} timeout={1000} classNames="fade">
                {turn ? (
                  <Button variant="success" size="lg" block>
                    {price}
                  </Button>
                ) : (
                  <Button variant="dark" size="lg" block>
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
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
});

// this.props.withdrawOffer, this.props.getOfferHistory, ...
export default connect(mapStateToProps, {
  getOfferHistory,
  makeOffer,
  withdrawOffer,
})(withRouter(Bargain));

// export default Offer;
//export default connect()(withRouter(Bargain));