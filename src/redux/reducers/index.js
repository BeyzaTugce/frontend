import { combineReducers } from "redux";
import user from "./userReducer";
import admin from "./adminReducer";
import garage from "./garageReducer";
import offer from "./offerReducer";

export default combineReducers({
    user,
    admin,
    garage,
    offer
});
