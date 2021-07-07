import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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

const Bargain = (props) => {
    const [show, setShow] = useState(false);
    const [enterOffer, setEnterOffer] = useState({ price: 10 });
    const handleToggle = () => {setShow(!show)};
    const [turn, setTurn] = useState(false);
    const [offerHistory, setOfferHistory] = useState([]);
    const { paramsId } = useParams();
    // useEffect((e) => {
    //     props.getOfferHistory(paramsId);
    //   }, []);
    //props.getOfferHistory(paramsId);
    const history = useHistory();
    const { offers } = props.offer;
    //const { offerHistoryv2 } = props.offer.offerHistory;

    const handleOnClick = e => {
      e.preventDefault();
      setOfferHistory(offerHistory => [...offerHistory, enterOffer.price]);
      const newOffer = {
          price: enterOffer.price,
          offerHistory: [...offerHistory, enterOffer.price],
          sellerUserName: "aaa",
          buyerUserName: "bbb"
        };
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

    // useEffect(() => {
    //     let {id} = props.match.params;
    //     props.getOfferHistory(id);
        // const newOffer = {
        //     price: offer.price,
        //     offerHistory: [...offerHistory, offer.price],
        //     sellerUserName: "aaa",
        //     buyerUserName: "bbb"
        //   };
        // props.makeOffer(newOffer);
    // }) 
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
                xmin={offerHistory && offerHistory[offerHistory.length-1]}
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
            {offers.map(({id, price}) => (
              <CSSTransition key={id} timeout={1000} classNames="fade">
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