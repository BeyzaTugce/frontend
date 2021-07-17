import React, {useEffect, useState} from "react";
import { connect, useSelector } from "react-redux";

import { withRouter } from "react-router-dom";
import Garage from "../components/Garage";
import { getGarage, getSeller, getItems } from "../redux/actions/GarageActions";

import { addPurchase } from "../redux/actions/PurchaseActions";
import Header from "../components/Header";
function GarageView(props) {
  
  let {match, getGarage, getSeller, getItems ,addPurchase} = props;
  const [purchaseId, setPurchaseId] = React.useState();
  
  const [returnPurchase, setReturnPurchase] = React.useState();
  const garage = useSelector((state) => state.garage);
  const user = useSelector((state) => state.auth);
  const purchase = useSelector((state) => state.purchase);


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
  }, [match.params]);



  const onCreatePurchase = (purchased) => {
   // setPurchaseId(addPurchase(purchase));
    //console.log("purchase"+addPurchase(purchase));
   
      addPurchase(purchased);
    
  // console.log("pruchaseID "+purchase.pur);
  };
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
            purchaseId= {purchase}
            //isLoggedIn={!!user.user}
        />
      </div>
  );


}

export default connect(null, { getGarage, getSeller, getItems, addPurchase })(withRouter(
    GarageView));
