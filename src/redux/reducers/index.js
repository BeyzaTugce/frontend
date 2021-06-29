import { combineReducers } from "redux";
import user from "./userReducer";
import admin from "./adminReducer";

export default combineReducers({
    user,
    admin,
});
