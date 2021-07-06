import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Garage from "../components/Garage";
import { getGarage, getSeller } from "../redux/actions/GarageActions";

function GarageView(props) {
  let {match, getGarage, getSeller} = props;

  const garage = useSelector((state) => state.garage);
  const seller = useSelector((state) => state.user);

  useEffect(() => {
    let garageId = match.params.id;
    getGarage(garageId);
    getSeller(garageId);
   // document.write(props.seller.firstname);
  }, [match.params]);

  return garage.error ? (
      <div>error</div>
  ) : garage.garage ? (
      <Garage
          garage={garage.garage}
          seller= {seller}
          //isLoggedIn={!!user.user}
      />
  ) : null;
}

export default connect(null, { getGarage, getSeller })(
    GarageView
);
