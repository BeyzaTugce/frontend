import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Garage from "../components/Garage";
import { getGarage } from "../redux/actions";

function GarageView(props) {
  let {match, getGarage} = props;

  const garage = useSelector((state) => state.garage);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    let garageId = match.params.id;
    getGarage(garageId);
  }, [match.params]);

  return garage.error ? (
      <div>error</div>
  ) : garage.garage ? (
      <Garage
          garage={garage.garage}
          //isLoggedIn={!!user.user}
      />
  ) : null;
}

export default connect(null, { getGarage })(
    GarageView
);
