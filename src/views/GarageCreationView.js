import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {connect, useSelector} from "react-redux";

import GarageCreationComponent from "../components/GarageCreation";
import {addGarage, changeGarage, deleteGarage} from "../redux/actions/GarageActions";
import {addItem, deleteItem} from "../redux/actions/ItemActions";

/**
 * For register new users
 * @param {props} props
 */
function GarageCreationView(props) {
    //const garages = useSelector((state) => state.garages);
    const items = useSelector((state) => state.items);

    /*useEffect(() => {
        if (items.garages) {
            props.history.push("/");
        }
    }, [items, props.history]);*/


    const onCreate = (garage) => {
        props.dispatch(addGarage(garage))
    }

    const onRemove = (garage) => {
        props.dispatch(deleteGarage(garage._id))
    }

    const onChange = (newGarage) => {
        props.dispatch(changeGarage(newGarage));
    }

    const onCancel = () => {
        props.history.push("/");
    };

    /*const onAddItem = (item) => {
        props.dispatch(addItem(item));
    }

    const onRemoveItem = (item) => {
        props.dispatch(deleteItem(item));
    }*/

    return (
        <GarageCreationComponent
            items = {items}
        />
    );
}

export default connect()(withRouter(GarageCreationView));