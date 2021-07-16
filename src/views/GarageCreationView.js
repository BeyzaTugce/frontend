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

/**
 * For register new users
 * @param {props} props
 */
function GarageCreationView(props) {
  const garage = useSelector((state) => state.garage);
  const user = useSelector((state) => state.auth.user);

  const [newItem, setNewItem] = React.useState(false);
  const [garageCreated, setGarageCreated] = React.useState(false);
  const [allGarages, setAllGarages] = React.useState([]);
  const [id, setId] = React.useState(null);

  let createdGarage = null;

  /*useEffect(() => {
    props.dispatch(getGarages());
    //setGarageCreated(true);
    console.log("IN USE EFFECT"+garage.garages);
    setAllGarages(garage.garages);
  }, [garageCreated] );*/

  //console.log("onCreate in view garage:"+garage.garages.garages);
  //console.log("onCreate in view garage:"+JSON.stringify(allGarages.garages.filter(g => g.user == user._id)));
  //garage.garages.garages.filter(g => g.user == user._id).map( g => {setId(g._id)});
  //console.log("garage view?:"+garageCreated);

  //console.log("onCreate in view:"+id);


  useEffect(() => {
    if (garage.garage) {
      props.history.push("/");
    }
  }, [props.history]);


  const onCreate = (newGarage) => {
    props.dispatch(addGarage(newGarage));
    //props.dispatch(getGarages());
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
      <GarageCreationComponent
        newItem={newItem}
        garage={garage.garage}
        garages={garage.garages}
        onCreate={onCreate}
        garageCreated={garageCreated}
        //newId={id}
      />
  );
}


GarageCreationView.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  garage: PropTypes.object,
  newItem: PropTypes.object,
  garageCreated: PropTypes.bool,
  createdGarage: PropTypes.object,
  newId: PropTypes.string,
  garages: PropTypes.object,
  getgarages: PropTypes.func.isRequired,

};

export default connect()(withRouter(GarageCreationView));
