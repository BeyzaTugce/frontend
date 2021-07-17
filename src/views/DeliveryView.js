import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import DeliveryComponent from "../components/Delivery";
import { addPickUp } from "../redux/actions/PickUpActions";
import Header from "../components/Header";

/**
 * For register new users
 * @param {props} props
 */
function DeliveryView(props) {
  const user = useSelector((state) => state.user);

  const onCreate = (pickup) => {
    props.dispatch(addPickUp(pickup));
  };
  /* const onRemove = (pickup) => {
      props.dispatch(deletePickUp(pickup._id))
  }*/

  const onCancel = () => {
    props.history.push("/");
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
