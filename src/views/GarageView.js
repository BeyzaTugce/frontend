import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Garage from "../components/Garage";
import { getGarage, getSeller } from "../redux/actions/GarageActions";

function GarageView(props) {
  let {match, getGarage, getSeller} = props;

  const garage = useSelector((state) => state.garage);
  const seller = useSelector((state) => state.seller);

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

  return (

    <Garage
    garage={garage.garage}
    seller= {garage.seller}
    //isLoggedIn={!!user.user}
/>
  );


}

export default connect(null, { getGarage, getSeller })(
    GarageView
);
