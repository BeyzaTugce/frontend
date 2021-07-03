import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import GarageComponent from "../components/Garage";

function GarageView(props) {
    let {matchGarage, getGarage} = props;
    let {matchUser, getUser} = props

    const garage = useSelector((state) => state.garage);
    const user = useSelector((state) => state.user);


    useEffect(() => {
        // get id of movie from URL
        let userId = matchUser.params.id;
        getUser(userId);
    }, [matchUser.params]);

    return user.error ? (
        <div>error</div>
    ) : user.user ? (
        <GarageComponent
            user={user.user}
            isLoggedIn={!!user.user}
            isAdmin={!!user.user ? user.user.role === "admin" : false}
        />
    ) : null;
}

export default connect(null, { getUser })(
    GarageView
);
