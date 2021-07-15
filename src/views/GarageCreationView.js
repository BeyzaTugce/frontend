import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import GarageCreationComponent from "../components/GarageCreation";
import {
  addGarage,
  changeGarage,
  deleteGarage, getGarages,
} from "../redux/actions/GarageActions";
import PropTypes from "prop-types";
import GarageCreation from "../components/GarageCreation";
import store from "../redux/store";

/**
 * For register new users
 * @param {props} props
 */
function GarageCreationView(props) {
  const garage = useSelector((state) => state.garage);
  const [newItem, setNewItem] = React.useState(false);
  const [garageCreated, setGarageCreated] = React.useState(false);
  const [allGarages, setAllGarages] = React.useState([]);



  useEffect(() => {
    if (garage.garage) {
      props.history.push("/");
    }
  }, [props.history]);

  useEffect(() => {
    store.dispatch(getGarages());
    setAllGarages(garage.garages);
    console.log(JSON.stringify(allGarages));
  }, [garage.garages] );


  const onCreate = (newGarage) => {
    props.dispatch(addGarage(newGarage));
    setGarageCreated(true);
    console.log("garage view?:"+garageCreated);
    //props.history.push("/"+garage.id);
  };

  //console.log("garage view?:"+garage.garage.id);

  const onRemove = (garage) => {
    props.dispatch(deleteGarage(garage.id));
  };

  const onChange = (newGarage) => {
    props.dispatch(changeGarage(newGarage));
  };

  const onCancel = () => {
    props.history.push("/");
  };




  /*
    const onRemoveItem = (item) => {
        props.dispatch(deleteItem(item));
    }*/

  return (
      <GarageCreationComponent
        newItem={newItem}
        garage={garage.garage}
        onCreate={onCreate}
        garageCreated={garageCreated}
      />
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
