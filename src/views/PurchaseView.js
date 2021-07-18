import React, { useState, useEffect } from "react";
import {getPurchases} from "../redux/actions/PurchaseActions";
import {loadBuyer, loadSeller} from "../redux/actions/OfferActions";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button} from "react-bootstrap";
import {getSeller, getBuyer} from "../redux/actions/UserActions";


const PurchaseView = (props) => {

    let {match, getPurchases, getSeller, getBuyer} = props;

    const purchase = useSelector((state) => state.purchase);
    const user = useSelector((state) => state.auth.user);


    let userId = match.params;

    useEffect(() => {
        getPurchases();
    }, [] );

    //getPurchases();

    const onMyPurchases = () => {
       getPurchases();
       purchase.purchases.purchases.filter(p => p.seller == user._id).map( p => getBuyer(p.buyer));
       purchase.purchases.purchases.filter(p => p.buyer == user._id).map( p => getSeller(p.buyer));

       console.log("seller"+user.seller);
       console.log("buyer"+user.buyer);

        console.log("purchases:"+JSON.stringify((purchase.purchases)));
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
                getSeller(p.seller);
                getBuyer(p.buyer);

                return (
                    <div>
                        <Button>{user.firstname} - {user.seller} - {user.buyer}</Button>
                    </div>
                );
            })}
        </div>
    );


}

export default connect(null, { getPurchases, loadSeller, loadBuyer, getBuyer, getSeller})(withRouter(
    PurchaseView));