import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';
import "./Offer.css";

class Offer extends Component {
    state = {
        offers: [
            //{buyerUserName: "a", sellerUserName: "b", price: 55, bargainOffer: [45, 55]},
        ],
        turn: false
    }
    // const [offers, setOffers] = React.useState([{"price": 55}]);
    // const onClick = () => {
    //     setOffers( offer => [...offers, { offer }]);
    // }
    render() {
        const { offers } = this.state;
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
                                    ...state.offers, { 
                                    id: uuid(), 
                                    buyerUserName: "e", 
                                    sellerUserName: "f", 
                                    price: offer, 
                                    bargainOffer: [25, 35]}]
                            }))
                        }
                    }}
                >{(this.state.turn)
                ? "Buyer New Offer"
                : "Seller New Offer"} </Button>
                
                {(this.state.turn = !this.state.turn)}
                <ListGroup>
                    <TransitionGroup className="offers">
                        {offers.map(({ id, price}) => (
                            <CSSTransition key={id} timeout={1000} classNames="fade">
                                {(this.state.turn)
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

export default Offer;