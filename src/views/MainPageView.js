import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";


function MainPageView(props) {

    return (
        <div>
            <Header/>
        </div>
    );
}



export default connect()(withRouter(MainPageView));
