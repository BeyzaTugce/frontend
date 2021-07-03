import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import GarageCreation from "../components/GarageCreation";
import Loading from "../components/Loading";
import {  getItem, changeItem, addItem } from "../redux/actions/ItemActions";


import ItemComponent from "../components/ItemComponent";




/**
 * For register new users
 * @param {props} props
 */
function ItemView(props) {
    const user = useSelector((state) => state.user);
    const selectedItem = useSelector((state) => state.selectedItem);
   // state variable of this functional component
   const [newItem, setNewItem] = React.useState(false);
   let { match, getItem } = props;
   useEffect(() => {
       // get id of movie from URL
       let itemId = match.params.id;

       // check if a new movie is created
       if (itemId === "new") {
           // procedd with an empty element
           setNewItem(true);
       } else {
           // trigger movie load from backend
           getItem(itemId);
       }
   }, [match.params]);


   // for saving an existing movie
const onSave = (item) => {
    props.dispatch(changeItem(item));
};

// for creating a new movie
const onCreate = (item) => {
    // trigger redux action add movie
    props.dispatch(addItem(item));
    // navigate back to the movie list
    props.history.push("/");
};



return !selectedItem.item && !selectedItem.error && !newItem ? (
    <Loading />
) : selectedItem.error ? (
    <div>error</div>
) : selectedItem.item ? (
    <ItemComponent
        item={selectedItem.item}
        onSave={onSave}
        isLoggedIn={!!user.user}
        //isAdmin={!!user.user ? user.user.role === "admin" : false}
    />
) : newItem ? (
    <ItemComponent
        new={true}
        onCreate={onCreate}
        isLoggedIn={!!user.user}
        //isAdmin={!!user.user ? user.user.role === "admin" : false}
    />
) : null;
}

export default connect()(withRouter(ItemView));