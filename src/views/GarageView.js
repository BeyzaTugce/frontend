import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import { withRouter } from "react-router-dom";
import Garage from "../components/Garage";
import { getGarage, getSeller, getItems } from "../redux/actions/GarageActions";

import { addPurchase } from "../redux/actions/PurchaseActions";
function GarageView(props) {
  
  let {match, getGarage, getSeller, getItems ,addPurchase} = props;

  const garage = useSelector((state) => state.garage);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    let garageId = match.params.id;
    getGarage(garageId);
    //getSeller(garageId);
  }, [match.params]);
  
  useEffect(() => {
    let garageId = match.params.id;
    getSeller(garageId);
    //document.write(seller.seller.firstname);
  }, [match.params]);

  useEffect(() => {
    let garageId = match.params.id;
    getItems(garageId);
    //document.write(seller.seller.firstname);
  }, [match.params]);

  
  const onCreatePurchase = (purchase) => {
    addPurchase(purchase);
  };
  return (
    <Garage
      garage={garage.garage}
      user={user.user}
      seller= {garage.seller}
      items={garage.items}
      onCreatePurchase = {onCreatePurchase}
      //isLoggedIn={!!user.user}
    />
  );


}

export default connect(null, { getGarage, getSeller, getItems, addPurchase })(withRouter(
    GarageView));
