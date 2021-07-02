import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";

import GarageCreationComponent from "../components/GarageCreation";
import {addGarage} from "../redux/actions/GarageActions";

/**
 * For register new users
 * @param {props} props
 */
function GarageCreationView(props) {
    const garage = useSelector((state) => state.garage);

    useEffect(() => {
        if (garage.garage) {
            this.props.history.push("/");
        }
    }, [garage, props.history]);

    const onCreate = (garage) => {
        this.props.dispatch(addGarage(garage))
    }

    const onCancel = () => {
        this.props.history.push("/");
    };

    const onSignUp = () => {
        this.props.history.push("/mygarage");
    };


    return (
        <GarageCreationComponent
        />
    );
}

export default connect()(withRouter(GarageCreationView));