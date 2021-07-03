import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import GarageComponent from "../components/Garage";
import { getUser, getGarage } from "../redux/actions";

function GarageView(props) {
    let {matchGarage, getGarage} = props;
    let {matchUser, getUser} = props;

    const garage = useSelector((state) => state.garage);
    const user = useSelector((state) => state.user);


    useEffect(() => {
        // get id of movie from URL
        let userId = matchUser.params.id;
        getUser(userId);
        let garageId = matchGarage.params.id;
        getGarage(garageId);
    }, [matchUser.params, matchGarage.params]);

    return user.error ? (
        <div>error</div>
    ) : garage.error ? (
        <div>error</div>
    ) : user.user && garage.garage ? (
        <GarageComponent
            garage={garage.garage}
            user={user.user}
            isLoggedIn={!!user.user}
            isAdmin={!!user.user ? user.user.role === "admin" : false}
        />
    ) : null;
}

export default connect(null, { getUser, getGarage })(
    GarageView
);
