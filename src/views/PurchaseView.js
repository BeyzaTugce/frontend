import React, { useState, useEffect } from "react";
import {getPurchases} from "../redux/actions/PurchaseActions";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, FormLabel} from "react-bootstrap";
import {getPurchaseSeller, getPurchaseBuyer} from "../redux/actions/PurchaseActions";
import Header from "../components/Header";
import GarageItem from "../components/GarageItem";
import ListItem from "../components/ListItem";
import "../components/Buttons.css";
import PurchaseItem from "../components/PurchaseItem";

const PurchaseView = (props) => {

    // let {getPurchases} = props;

    const purchase = useSelector((state) => state.purchase);
    const user = useSelector((state) => state.auth.user);


    useEffect(() => {
        props.getPurchases();
    }, [] );

    //View the purchases for user in the seller role
    const onClickGetSeller = () => {
        purchase?.purchases?.purchases?.filter(p => p.seller == user._id).map( p => {
            switch(p.purchaseStatus){
                case "WaitForAcceptance":
                    props.history.push("../bargain/"+p._id)
                    break
                case "DeliveryScheduling":
                    props.history.push("../delivery/"+p._id)
                    break
                case "DeliveryScheduled":
                    props.history.push("../order/"+p._id)
                    break
                case "Payment":
                    props.history.push("../order/"+p._id)
                    break
                case "Order":
                    props.history.push("../order/"+p._id)
                    break
            }}
        );
    }

    //View the purchases for user in the buyer role
    const onClickGetBuyer = () => {
        purchase?.purchases?.purchases?.filter(p => p.buyer == user._id).map( p => {
            switch(p.purchaseStatus){
                case "WaitForAcceptance":
                    props.history.push("../bargain/"+p._id)
                    break
                case "DeliveryScheduling":
                    props.history.push("../delivery/"+p._id)
                    break
                case "DeliveryScheduled":
                    props.history.push("../delivery/"+p._id)
                    break
                case "Payment":
                    props.history.push("../payment/"+p._id)
                    break
                case "Order":
                    props.history.push("../order/"+p._id)
                    break
                case "Rating":
                    props.history.push("../rating/"+p._id)
                    break
            }}
        );
    }

        //View the purchases for user in the buyer role
        const onClickGoPurchaseSeller = (e) => {
            let purchaseId= e.target.value;
            purchase?.purchases?.purchases?.filter(p => p._id == purchaseId).map( p => {
                console.log("purchaseIdSeller"+purchaseId+"p_id"+ p._id);
                switch(p.purchaseStatus){
                    case "WaitForAcceptance":
                        props.history.push("../bargain/"+purchaseId)
                        break
                    case "DeliveryScheduling":
                        props.history.push("../delivery/"+purchaseId)
                        break
                    case "DeliveryScheduled":
                        props.history.push("../delivery/"+purchaseId)
                        break
                    case "Payment":
                        props.history.push("../payment/"+purchaseId)
                        break
                    case "Order":
                        props.history.push("../order/"+purchaseId)
                        break
                    case "Rating":
                        props.history.push("../rating/"+purchaseId)
                        break
                }}
            );
        }

            //View the purchases for user in the buyer role
    const onClickGoPurchaseBuyer = (e) => {
        let purchaseId= e.target.value;
        console.log("purchaseIdbuyer"+purchaseId);

        purchase?.purchases?.purchases?.filter(p =>  p._id == purchaseId).map( p => {
            switch(p.purchaseStatus){
                case "WaitForAcceptance":
                    props.history.push("../bargain/"+purchaseId)
                    break
                case "DeliveryScheduling":
                    props.history.push("../delivery/"+purchaseId)
                    break
                case "DeliveryScheduled":
                    props.history.push("../delivery/"+purchaseId)
                    break
                case "Payment":
                    props.history.push("../payment/"+purchaseId)
                    break
                case "Order":
                    props.history.push("../order/"+purchaseId)
                    break
                case "Rating":
                    props.history.push("../rating/"+purchaseId)
                    break
            }}
        );
    }

    return(
        <div>
            <Header/>
            <div
                className="jumbotron jumbotron-fluid bg-white"
                style={{ marginTop: -10}}
            >
                <h1 className="display-5 text-center">My Purchases</h1>
            </div>
            <div className="" style={{paddingInline: 100}}>
                <Button onClick={onClickGetSeller} className="btn-green" variant="light">
                    <div className="btn-text">Go To My Sales</div>
                </Button><br/><br/>
                <div>
                    {purchase?.purchases?.purchases?.filter(p => p.seller == user._id).map( p => p.selectedItemList.map( (item) => {
                        return (
                            <div>
                            <div>
                                <PurchaseItem
                                    name={item.name}
                                    info={item.info}
                                    tags={item.tags}
                                    price={item.price}
                                    garageId={item.garageId}
                                    username={"Me"}
                                    onClickGoPurchase={onClickGoPurchaseSeller}
                                    p_id={p._id}
                                    status={p.purchaseStatus}
                                />
                                <br/>
                            </div>
                        </div>
                            
                        )}))} <br/><br/>
                </div>
                <Button onClick={onClickGetBuyer} className="btn-green" variant="light">
                    <div className="btn-text">Go To My Orders</div>
                </Button><br/><br/>
                <div>
                    {purchase?.purchases?.purchases?.filter(p => p.buyer == user._id).map( p => p.selectedItemList.map( (item) => {
                        return (
                            <div>
                                 <div>
                                <PurchaseItem
                                    name={item.name}
                                    info={item.info}
                                    tags={item.tags}
                                    price={item.price}
                                    garageId={item.garageId}
                                    username={item.username}
                                    onClickGoPurchase={onClickGoPurchaseBuyer}
                                    p_id={p._id}
                                    status={p.purchaseStatus}
                                />
                                <br/>
                            </div>
                            </div>
                        )}))}
                </div>
            </div>
        </div>
    );


}

export default connect(null, { getPurchases, getPurchaseSeller, getPurchaseBuyer})(withRouter(
    PurchaseView));

