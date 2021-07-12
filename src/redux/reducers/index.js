import { combineReducers } from "redux";
import user from "./userReducer";
import admin from "./adminReducer";
import garage from "./garageReducer";
import items from "./itemReducer";
import offer from "./offerReducer";
import pickup from "./pickupReducer";
import order from "./orderReducer";
import auth from "./authReducer";

export default combineReducers({
  user,
  admin,
  garage,
  items,
  offer,
  order,
  pickup,
  auth
});
