import React, {useEffect, useState} from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Garage from "../components/Garage";
import {getGarage, getSeller, getItems, deleteGarage, changeGarage} from "../redux/actions/GarageActions";

import { addPurchase } from "../redux/actions/PurchaseActions";
import Header from "../components/Header";
function GarageView(props) {
  
  let {match, getGarage, getSeller, getItems ,addPurchase, changeGarage, deleteGarage} = props;
  const history = useHistory();
  const garage = useSelector((state) => state.garage);
  const user = useSelector((state) => state.auth);
  const purchase = useSelector((state) => state.purchase);
  let itemsReached = false;
  let sellerReached = false;
  let garageReached = false;
  let garageId = match.params.id;

  useEffect(() => {
    let garageId = match.params.id;
    getGarage(garageId);
  }, [match.params, garageReached === false]);

  useEffect(() => {
    if (garage.garage !== undefined && garage.garage !== null) {
      garageReached = true;
    }
  }, [garage.garage, garageReached === false]);

  useEffect(() => {
    let garageId = match.params.id;
    getSeller(garageId);
  }, [match.params, sellerReached === false]);

  useEffect(() => {
    if (garage.seller !== undefined && garage.seller !== null) {
      sellerReached = true;
    }
  }, [garage.seller, sellerReached === false]);

  useEffect(() => {
    let garageId = match.params.id;
    getItems(garageId);
  }, [match.params, itemsReached === false]);

  useEffect(() => {
    if (garage.garageItems !== undefined && garage.garageItems !== null) {
      itemsReached = true;
    }
  }, [garage.garageItems, itemsReached === false]);

  useEffect(() => {
    console.log("second use effect " + itemsReached);
    if (garage.garageItems !== undefined && garage.garageItems !== null && garage.garageItems.items.length === 0) {
      onRemoveGarage(garageId);
    }
  }, [garage.garageItems, itemsReached, match]);





  const onCreatePurchase = (purchased) => {
      addPurchase(purchased);
  };
  const onChangeGarage = (garage) => {
    changeGarage(garage);
  };

  const onRemoveGarage = (garageId) => {
    deleteGarage(garageId);
    history.push(`../home`);
  }

  return (
      <div>
        <Header/>
        <Garage
            garage={garage.garage}
            user={user.user}
            seller= {garage.seller}
            items={garage.garageItems}
            onCreatePurchase = {onCreatePurchase}
            onChangeGarage = {onChangeGarage}
            onRemoveGarage={onRemoveGarage}
            garageId={garageId}
        />
      </div>
  );


}

export default connect(null, { getGarage, getSeller, getItems, addPurchase, deleteGarage, changeGarage})(withRouter(
    GarageView));
