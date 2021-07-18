import React, { useState, useEffect } from "react";
import {getPurchases} from "../redux/actions/PurchaseActions";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, FormLabel} from "react-bootstrap";
import {getPurchaseSeller, getPurchaseBuyer} from "../redux/actions/PurchaseActions";
import {getSeller} from "../redux/actions/GarageActions";
import Header from "../components/Header";

const PurchaseView = (props) => {

    let {match, getPurchases, getPurchaseSeller, getPurchaseBuyer, getSeller} = props;

    const purchase = useSelector((state) => state.purchase);
    const user = useSelector((state) => state.auth.user);
    const garage = useSelector((state) => state.garage);


    useEffect(() => {
        getPurchases();
    }, [] );

    //getPurchases();


    const onClickGetSeller = () => {
        getPurchases();

        console.log("MY PURCHASES:"+JSON.stringify(purchase?.purchases?.purchases));

        console.log("MY SELLER BUYER:"+JSON.stringify(purchase?.purchases?.purchases?.filter(p => p.seller == user._id)));

        purchase.purchases.purchases.filter(p => p.seller == user._id).map( p => props.history.push("../bargain/"+p._id));

        console.log("sellerrr:"+JSON.stringify(purchase.seller));

    }

    const onClickGetBuyer = () => {
        getPurchases();

        console.log("MY PURCHASES:"+JSON.stringify(purchase?.purchases?.purchases));

        console.log("MY SELLER BUYER:"+JSON.stringify(purchase?.purchases?.purchases?.filter(p => p.buyer == user._id)));

        purchase.purchases.purchases.filter(p => p.buyer == user._id).map( p => props.history.push("../bargain/"+p._id));

        console.log("buyerrr:"+JSON.stringify(purchase.buyer));

    }

    //console.log("sellerrr:"+JSON.stringify(purchase.seller));


    return(
        <div>
            <Header/>
            <h1 className="myGarage text-center">My Purchases</h1>
            <div className="d-block justify-content-center" style={{margin: 100}}>
                <FormLabel>I am the Seller</FormLabel><br/>
                <Button onClick={onClickGetSeller}>Go To My Sales</Button><br/><br/>
                <FormLabel>I am the Buyer</FormLabel><br/>
                <Button onClick={onClickGetBuyer}>Go To My Orders</Button>
            </div>

        </div>
    );


}

export default connect(null, { getPurchases, getPurchaseSeller, getPurchaseBuyer, getSeller})(withRouter(
    PurchaseView));

