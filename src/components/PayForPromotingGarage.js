import { PayPalButton } from "react-paypal-button-v2";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

import store from "../redux/store";
import {Button, Container, Modal} from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import {getGarage, changeGarage} from "../redux/actions/GarageActions";
import Slider from "react-input-slider";

const PayForPromotingGarage = (props) => {

    const garage = useSelector((state) => state.garage);
    const [isPromoted, setIsPromoted] = useState(false);
    const [show, setShow] = useState(false);

    const history = useHistory();

    let {match, getGarage, changeGarage} = props;
    let garageId = match.params.id;

    useEffect(() => {
        getGarage(garageId);
    }, [match.params]);

    const handleToggle = () => {
        setShow(!show);
        setIsPromoted(true);
        changeGarage(packGarage());
    };

    const packGarage = () => {
        let back = {
            ...props.garage,
        };
        back._id = garage.garage._id;
        back.user = garage.garage.user;
        back.discount = garage.garage.discount;
        back.bargain = garage.garage.bargain;
        back.pickup = garage.garage.pickup;
        back.shipment = garage.garage.shipment;
        back.isPromoted = isPromoted;

        return back;
    };

    const handleOnClick = (e) => {
        e.preventDefault();
        changeGarage(packGarage());
        handleToggle();
        history.push(`../garage/${garage?.garage?._id}`);
    };

    return (
        <div className="Payment text-center" style={{marginTop:50}}>
            <PayPalButton
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value: "0.01",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    // Capture the funds from the transaction
                    return actions.order.capture().then(function (details) {
                        // Show a success message to your buyer
                        alert(
                            "Transaction completed by " + details.payer.name.given_name
                        );

                        // OPTIONAL: Call your server to save the transaction
                        return fetch("/paypal-transaction-complete", {
                            method: "post",
                            body: JSON.stringify({
                                orderID: data.orderID,
                            }),
                        });
                    });
                }}
            />
            <div className="buttons d-flex align-items-center justify-content-center">
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
                    onClick={handleToggle}
                >
                    Promote
                </Button>
            </div>
            <Modal show={show} onHide={handleToggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you would like to promote your garage ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
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
                                    `Please confirm your payment`
                                )
                            )
                                handleOnClick(e);
                        }}
                    >
                        Confirm Payment
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
    getGarage,
    changeGarage,
})(withRouter(PayForPromotingGarage));
