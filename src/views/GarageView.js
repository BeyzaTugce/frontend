import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Garage from "../components/Garage";
import { getGarage, getSeller, getItems } from "../redux/actions/GarageActions";

function GarageView(props) {
  let {match, getGarage, getSeller, getItems} = props;

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


  return (
    <Garage
      garage={garage.garage}
      user={user.user}
      seller= {garage.seller}
      items={garage.items}
      //isLoggedIn={!!user.user}
    />
  );


}

export default connect(null, { getGarage, getSeller, getItems })(
    GarageView
);
