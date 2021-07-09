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
  const user = useSelector((state) => state.user);
  //const selectedItem = useSelector((state) => state.item);

  // state variable of this functional component
  const [newItem, setNewItem] = React.useState(false);

 // document.write(user.user.district);

  useEffect(() => {
    if (garage.garage) {
      props.history.push("/");
    }
  }, [garage, props.history]);


  
  // creating a object with all relevant data to update or create a changed garage
  
  const onCreate = (garage) => {
    props.dispatch(addGarage(garage));
  };

  const onClickDisplayMyGarage = (id) => {
    props.history.push("/"+id);
  }

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

  console.log(garage.garage);

  return (
      <GarageCreationComponent
        newItem={newItem}
        garage={garage.garage}
        onCreate={onCreate}
        onClickDisplayMyGarage={onClickDisplayMyGarage}
    />
  );
}


GarageCreationView.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  garage: PropTypes.object,
  newItem: PropTypes.object,
  onClickDisplayMyGarage: PropTypes.func.isRequired,
};

export default connect()(withRouter(GarageCreationView));
