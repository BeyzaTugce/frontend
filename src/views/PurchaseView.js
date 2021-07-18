import React, { useState, useEffect } from "react";
import {getPurchases} from "../redux/actions/PurchaseActions";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button} from "react-bootstrap";
import {loadSeller, loadBuyer} from "../redux/actions/PurchaseActions";

const PurchaseView = (props) => {

    let {match, getPurchases, loadSeller, loadBuyer} = props;

    const purchase = useSelector((state) => state.purchase);
    const user = useSelector((state) => state.auth.user);


    useEffect(() => {
        getPurchases();
    }, [] );

    //getPurchases();

    const onMyPurchases = () => {
       getPurchases();
       purchase.purchases.purchases.filter(p => p.seller == user._id).map( p => loadBuyer(p.buyer));
       purchase.purchases.purchases.filter(p => p.buyer == user._id).map( p => loadSeller(p.buyer));

       loadBuyer(user._id);
       console.log("seller"+props.seller);
       console.log("buyer"+props.buyer);

        //console.log("purchases:"+JSON.stringify((purchase.purchases)));
        //console.log("buyer:"+JSON.stringify(purchase.purchases.purchases.filter(p => p.buyer == user._id)));
        //purchase.purchases.purchases.filter(p => p.buyer == user._id).map( p => {history.push("/bargain/"+p._id)});

        if (!purchase.purchases.purchases.filter(p => p.buyer == user._id)) {
        }
        else {

        }
    };

    return(
        <div>
            {onMyPurchases}
            {purchase.purchases.purchases.filter(p => p.buyer == user._id || p.seller == user._id).map( p => {
                return (
                    <div>
                        <Button>{user.firstname} - {props.seller} - {props.buyer}</Button>
                    </div>
                );
            })}
        </div>
    );


}

export default connect(null, { getPurchases, loadBuyer, loadSeller})(withRouter(
    PurchaseView));