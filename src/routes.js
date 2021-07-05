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
    exact: true,
  },
  {
    path: "/garage/:id",
    component: GarageView,
    exact: true,
  },
  {
    path: "/mygarage",
    component: GarageCreationView,
    exact: true,
  },
  {
    path: "/signup",
    component: SignUpView,
    exact: true,
  },
  {
    path: "/login",
    component: UserLoginView,
    exact: true,
  },
  {
    path: "/delivery",
    component: DeliveryView,
    exact: true,
  },

  {
    path: "/adminsignup",
    component: AdminSignUpView,
    exact: true,
  },

  {
    path: "/bargain",
    component: BargainView,
    exact: true,
  },
 /* {
    path: "/item",
    component: ItemView,
    exact: true,
  },*/
];

export default routes;
