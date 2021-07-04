import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import GarageCreation from "./GarageCreation";
import Loading from "./Loading";
import {  getItem, changeItem, addItem } from "../redux/actions/ItemActions";

import ItemComponent from "./ItemCreation";

/**
 * For register new users
 * @param {props} props
 */
function ItemList(props) {
    const user = useSelector((state) => state.user);
    const selectedItem = useSelector((state) => state.selectedItem);
    const items = useSelector((state) => state.items);
   // state variable of this functional component


   // for saving an existing item
    const onSave = (item) => {
        props.dispatch(changeItem(item));
    };

    // for creating a new item
    const onCreate = (item) => {
        // trigger redux action add item
        props.dispatch(addItem(item));
        // navigate back to the item list
        props.history.push("/");
    };


    return(
        <div>
        {props.items.map(item => {return !item.item && !item.error && !props.newItem ? (
                <Loading />
            ) : item.error ? (
                <div>error</div>
            ) : item.item ? (
                <ItemComponent
                    item={item.item}
                    onSave={onSave}
                    isLoggedIn={!!user.user}
                    //isAdmin={!!user.user ? user.user.role === "admin" : false}
                />
            ) : props.newItem ? (
                <ItemComponent
                    new={true}
                    onCreate={onCreate}
                    isLoggedIn={!!user.user}
                    //isAdmin={!!user.user ? user.user.role === "admin" : false}
                />
            ) : null})
        }
        </div>
    );

}

export default connect()(withRouter(ItemList));