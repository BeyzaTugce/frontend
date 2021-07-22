import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import DeliveryComponent from "../components/Delivery";
import { addPickUp } from "../redux/actions/PickUpActions";
import Header from "../components/Header";

/**
 * For register new users
 * @param {props} props
 */
function DeliveryView(props) {

  const onCreate = (pickup) => {
    props.dispatch(addPickUp(pickup));
  };

  const onCancel = () => {
    props.history.push("/home");
  };

  return (
      <div>
        <Header/>
        <DeliveryComponent
            onCreate={onCreate}
            // onRemove = {onRemove}
            onCancel={onCancel}
        />
      </div>
  );
}

export default connect()(withRouter(DeliveryView));
