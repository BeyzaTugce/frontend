import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, ButtonGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";



const TrackPurchase = (props) => {

    return (
        <div className="list-inline justify-content-end">
            <ButtonGroup vertical={true} style={{marginLeft: 1100, marginTop: 100, width: 150}}>
                <Button style={{backgroundColor: "#6A8E66"}} >1.Bargain</Button>
                <Button style={{backgroundColor: "#6A8E66"}}>2.Delivery</Button>
                <Button style={{backgroundColor: "#6A8E66"}}>3.Payment</Button>
                <Button style={{backgroundColor: "#6A8E66"}}>4.Details</Button>
            </ButtonGroup>
        </div>
    );

}

export default connect()(withRouter(TrackPurchase));
