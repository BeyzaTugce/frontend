import MainPageView from "./components/CategoryBar";

import GarageView from "./views/GarageView";
import GarageCreationView from "./views/GarageCreationView";
import SignUpView from "./views/SignUpView";
import UserLoginView from "./views/UserLoginView";
import DeliveryView from "./views/DeliveryView";
import AdminSignUpView from "./views/AdminSignUpView";
import ItemView from "./views/ItemView";
import BargainView from "./views/BargainView";
import VisitorView from "./views/VisitorView";
import OrderDetailsView from "./views/OrderDetailsView";
import Search from "./components/Search";

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
    path: "/garage",
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
  {
    path: "/yourgarage",
    component: VisitorView,
  },
  {
    path: "/order/:id",
    component: OrderDetailsView,
  },
  {
    path: "/search",
    component: Search,
  }
 /* {
    path: "/item",
    component: ItemView,
    exact: true,
  },*/
];

export default routes;
