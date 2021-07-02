import { combineReducers } from "redux";
import user from "./userReducer";
import admin from "./adminReducer";
import garage from "./garageReducer";

export default combineReducers({
    user,
    admin,
    garage,
});
