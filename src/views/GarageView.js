import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";

import GarageCreationComponent from "../components/GarageCreation";
import {addGarage, changeGarage, deleteGarage} from "../redux/actions/GarageActions";
import {addItem, deleteItem} from "../redux/actions/ItemActions";

function GarageView(props) {
    //TODO: After dealing with the Garage.js come here to connect them
    //const garages = useSelector((state) => state.garages);
    //const items = useSelector((state) => state.items);

    /*useEffect(() => {
        if (garages.garages) {
            props.history.push("/");
        }
    }, [garages, props.history]);


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

    const onAddItem = (item) => {
        props.dispatch(addItem(item));
    }

    const onRemoveItem = (item) => {
        props.dispatch(deleteItem(item));
    }

    return (
        <GarageCreationComponent
            items = {items}

        />
    );
    */
}

export default connect()(withRouter(GarageView));