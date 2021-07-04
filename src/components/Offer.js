import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';
import "./Offer.css";
import { PropTypes } from "prop-types";
import {connect, useSelector} from "react-redux";
import { getOfferHistory, makeOffer, withdrawOffer } from "../redux/actions/OfferActions";
import { withRouter } from "react-router-dom";

class Offer extends Component {
    
    componentDidMount() {
        this.props.getOfferHistory();
        this.props.makeOffer();
    }
    
    render() {
        var turn = false;
        const { offers } = this.props.offer;
        return (
            <Container>
                <Button
                    variant="dark"
                    style={{marginBottom: '2rem'}}
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
                : "Seller New Offer"} </Button>
                
                {(turn = !turn)}
                <ListGroup>
                    <TransitionGroup className="offers">
                        {offers.map(({ id, price}) => (
                            <CSSTransition key={id} timeout={1000} classNames="fade">
                                {(turn)
                                    ? <Button variant="success" size="lg" block>{price}</Button>
                                    : <Button variant="dark" size="lg" block>{price}</Button>
                                }
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

Offer.propTypes = { 
    getOfferHistory: PropTypes.func.isRequired,
    makeOffer: PropTypes.func.isRequired,
    offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    offer: state.offer
});

export default connect(mapStateToProps, { getOfferHistory, makeOffer })(withRouter(Offer));

//export default Offer;