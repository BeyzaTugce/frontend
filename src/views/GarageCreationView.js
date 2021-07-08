import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import GarageCreationComponent from "../components/GarageCreation";
import {
  addGarage,
  changeGarage,
  deleteGarage,
} from "../redux/actions/GarageActions";
import PropTypes from "prop-types";
import GarageCreation from "../components/GarageCreation";

/**
 * For register new users
 * @param {props} props
 */
function GarageCreationView(props) {
  const garage = useSelector((state) => state.garage);
  const items = useSelector((state) => state.items);
  //const selectedItem = useSelector((state) => state.item);

  // state variable of this functional component
  const [newItem, setNewItem] = React.useState(false);

  useEffect(() => {
    if (garage.garage) {
      props.history.push("/");
    }
  }, [garage, props.history]);

  const onCreate = (garage) => {
    props.dispatch(addGarage(garage));
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


  /*
    const onRemoveItem = (item) => {
        props.dispatch(deleteItem(item));
    }*/

  return (
      <GarageCreationComponent
        newItem={newItem}
        garage={garage.garage}
        onCreate={onCreate}
    />
  );
}


GarageCreationView.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  garage: PropTypes.object,
  newItem: PropTypes.object,
};

export default connect()(withRouter(GarageCreationView));
