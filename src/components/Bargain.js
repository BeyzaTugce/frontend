import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import "./Bargain.css";
import { PropTypes } from "prop-types";
import { connect, useSelector } from "react-redux";
import {
  getOfferHistory,
  makeOffer,
  withdrawOffer,
} from "../redux/actions/OfferActions";
import { withRouter } from "react-router-dom";
import OfferModal from "./Offer";

class Bargain extends Component {
  componentDidMount() {
    this.props.getOfferHistory();
    //this.props.makeOffer();
  }

  onCancelClick = (id) => {
    this.props.withdrawOffer(id);
  };

  render() {
    var turn = false;
    const { offers } = this.props.offer;
    return (
      <Container>
        <OfferModal />
        {/* <Button
                    variant="dark"
                    size="lg"
                    className="mt-3 mb-3"
                    onClick={() => {
                        const offer = prompt('Enter Offer');
                        if(offer) {
                            this.setState(state => ({
                                offers: [
                                    ...offers, { 
                                    id: uuid(), 
                                    buyerUserName: "e", 
                                    sellerUserName: "f", 
                                    price: offer, 
                                    bargainOffer: [25, 35]}]
                            }))
                        }
                    }}
                >{(turn)
                ? "Buyer New Offer"
                : "Seller New Offer"} 
                </Button> */}
        <Button
          variant="danger"
          className="mt-3 mb-3"
          //onClick={this.onCancelClick(this.offer.price)}
        >
          Cancel Bargaining
        </Button>
        {(turn = !turn)}
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
    );
  }
}

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

//export default Offer;
