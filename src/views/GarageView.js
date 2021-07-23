import React, {useEffect, useState} from "react";
import { connect, useSelector } from "react-redux";

import { withRouter } from "react-router-dom";
import Garage from "../components/Garage";
import {getGarage, getSeller, getItems, deleteGarage, changeGarage} from "../redux/actions/GarageActions";

import { addPurchase } from "../redux/actions/PurchaseActions";
import Header from "../components/Header";
function GarageView(props) {
  
  let {match, getGarage, getSeller, getItems ,addPurchase, changeGarage} = props;

  const garage = useSelector((state) => state.garage);
  const user = useSelector((state) => state.auth);
  const purchase = useSelector((state) => state.purchase);

  let garageId = match.params.id;

  useEffect(() => {
    getGarage(garageId);
  }, [match.params]);
  
  useEffect(() => {
    getSeller(garageId);
  }, [match.params]);

  useEffect(() => {
    getItems(garageId);
  }, [match.params]);



  const onCreatePurchase = (purchased) => {
      addPurchase(purchased);
  };
  const onChangeGarage = (garage) => {
    changeGarage(garage);
  };

  const onRemoveGarage = () => {
    deleteGarage(garageId);
  }

  return (
      <div>
        <Header/>
        <Garage
            garage={garage.garage}
            user={user.user}
            seller= {garage.seller}
            items={garage.items}
            purchase= {purchase.purchase}
            onCreatePurchase = {onCreatePurchase}
            onChangeGarage = {onChangeGarage}
            onRemoveGarage={onRemoveGarage}
            purchaseId= {purchase}
            garageId={garageId}
        />
      </div>
  );


}

export default connect(null, { getGarage, getSeller, getItems, addPurchase, deleteGarage, changeGarage})(withRouter(
    GarageView));
