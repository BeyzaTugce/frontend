import React, { useState, useEffect } from "react";
import {getPurchases} from "../redux/actions/PurchaseActions";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, FormLabel} from "react-bootstrap";
import {getPurchaseSeller, getPurchaseBuyer} from "../redux/actions/PurchaseActions";
import Header from "../components/Header";
import GarageItem from "../components/GarageItem";

const PurchaseView = (props) => {

    let {match, getPurchases, getPurchaseSeller, getPurchaseBuyer} = props;

    const purchase = useSelector((state) => state.purchase);
    const user = useSelector((state) => state.auth.user);
    const garage = useSelector((state) => state.garage);


    useEffect(() => {
        getPurchases();
    }, [] );

    //getPurchases();

    const onClickGetSeller = () => {
        getPurchases();

        //TODO:purchase.seller state ine yazıyor ama anlık data çekilemiyor state den
        //purchase.purchases.purchases.filter(p => p.seller == user._id).map( p => getPurchaseSeller(p.seller));
        purchase.purchases.purchases.filter(p => p.seller == user._id).map( p => props.history.push("../bargain/"+p._id));
    }

    const onClickGetBuyer = () => {
        getPurchases();

        //TODO:purchase.buyer state ine yazıyor ama anlık data çekilemiyor state den
        //purchase.purchases.purchases.filter(p => p.buyer == user._id).map( p => getPurchaseBuyer(p.buyer));
        purchase.purchases.purchases.filter(p => p.buyer == user._id).map( p => props.history.push("../bargain/"+p._id));
    }


    return(
        <div>
            <Header/>
            <h1 className="myGarage text-center">My Purchases</h1>
            <div className="d-block justify-content-center" style={{margin: 100}}>
                <Button onClick={onClickGetSeller}>Go To My Sales</Button><br/><br/>
                {purchase?.purchases?.purchases?.filter(p => p.seller == user._id).map( p => p.selectedItemList.map( (item) => {
                    return (
                    <GarageItem
                    name={item.name}
                    info={item.info}
                    tags={item.tags}
                    price={item.price}
                    button1Name={"Buy"}
                    button2Name={"Bargain"}
                    condition={true}
                    userView={true}
                    />
                    )}))} <br/><br/>
                <Button onClick={onClickGetBuyer}>Go To My Orders</Button><br/><br/>
                {purchase?.purchases?.purchases?.filter(p => p.buyer == user._id).map( p => p.selectedItemList.map( (item) => {
                    return (
                        <GarageItem
                            name={item.name}
                            info={item.info}
                            tags={item.tags}
                            price={item.price}
                            button1Name={"Buy"}
                            button2Name={"Bargain"}
                            condition={true}
                            userView={true}
                        />
                    )}))}
            </div>

        </div>
    );


}

export default connect(null, { getPurchases, getPurchaseSeller, getPurchaseBuyer})(withRouter(
    PurchaseView));

