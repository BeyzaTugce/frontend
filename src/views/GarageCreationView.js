import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {connect, useSelector} from "react-redux";

import GarageCreationComponent from "../components/GarageCreation";
import {addGarage, changeGarage, deleteGarage} from "../redux/actions/GarageActions";
import {getItem} from "../redux/actions";

/**
 * For register new users
 * @param {props} props
 */
function GarageCreationView(props) {
    //const garages = useSelector((state) => state.garages);
    const user = useSelector((state) => state.user);
    const items = useSelector((state) => state.items);
    //const selectedItem = useSelector((state) => state.item);


    // state variable of this functional component
    const [newItem, setNewItem] = React.useState(false);

    useEffect(() => {
        // get id of item from URL
        let itemId = props.match.params.id;

        // check if a new item is created
        if (itemId === "new") {
            // proceed with an empty element
            setNewItem(true);
        } else {
            // trigger item load from backend
            props.dispatch(getItem(itemId));
        }
    }, [props.match.params]);

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
            newItem = {newItem}
        />
    )
}

export default connect()(withRouter(GarageCreationView));