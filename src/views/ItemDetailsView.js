import React from "react";
import Header from "../components/Header";
import ItemDetails from "../components/ItemDetails";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


function ItemDetailsView(props){

    return (
        <div>
            <Header/>
            <ItemDetails/>
        </div>
    );

}

export default connect()(withRouter(ItemDetailsView));
