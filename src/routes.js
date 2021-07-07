import MainPageView from "./components/CategoryBar";

import GarageView from "./views/GarageView";
import GarageCreationView from "./views/GarageCreationView";
import SignUpView from "./views/SignUpView";
import UserLoginView from "./views/UserLoginView";
import DeliveryView from "./views/DeliveryView";
import AdminSignUpView from "./views/AdminSignUpView";
import ItemView from "./views/ItemView";
import BargainView from "./views/BargainView";

// routes within the movie database example app
// used for routing

const routes = [
  {
    path: "/Header",
    component: MainPageView,

  },
  {
    path: "/garage/:id",
    component: GarageView,

  },
  {
    path: "/mygarage",
    component: GarageCreationView,

  },
  {
    path: "/signup",
    component: SignUpView,

  },
  {
    path: "/login",
    component: UserLoginView,

  },
  {
    path: "/delivery",
    component: DeliveryView,

  },

  {
    path: "/adminsignup",
    component: AdminSignUpView,
    
  },

  {
    path: "/bargain/:id",
    component: BargainView,
  
  },
 /* {
    path: "/item",
    component: ItemView,
    exact: true,
  },*/
];

export default routes;
