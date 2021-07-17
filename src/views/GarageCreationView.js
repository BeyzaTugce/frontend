import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import GarageCreationComponent from "../components/GarageCreation";
import {
  addGarage,
  changeGarage,
  deleteGarage, getGarages
} from "../redux/actions/GarageActions";
import PropTypes from "prop-types";
import Header from "../components/Header";

/**
 * For register new users
 * @param {props} props
 */
function GarageCreationView(props) {
  const garage = useSelector((state) => state.garage);
  const user = useSelector((state) => state.auth.user);

  const [newItem, setNewItem] = React.useState(false);
  const [garageCreated, setGarageCreated] = React.useState(false);


  useEffect(() => {
    if (garage.garage) {
      props.history.push("/");
    }
  }, [props.history]);


  const onCreate = (newGarage) => {
    props.dispatch(addGarage(newGarage));
    setGarageCreated(true);
    console.log("garageCreated:"+garageCreated);
  };

  const onRemove = (garage) => {
    props.dispatch(deleteGarage(garage.id));
  };

  const onChange = (newGarage) => {
    props.dispatch(changeGarage(newGarage));
  };

  const onCancel = () => {
    props.history.push("/");
  };

  return (
      <div>
        <Header/>
        <GarageCreationComponent
            newItem={newItem}
            garage={garage.garage}
            onCreate={onCreate}
            garageCreated={garageCreated}
        />
      </div>
  );
}


GarageCreationView.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  garage: PropTypes.object,
  newItem: PropTypes.object,
  garageCreated: PropTypes.bool,
};

export default connect()(withRouter(GarageCreationView));
