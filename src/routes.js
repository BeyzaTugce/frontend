//import MainPageView from "./components/CategoryBar";
import MainPageView from "./views/MainPageView";
import GarageView from "./views/GarageView";
import GarageCreationView from "./views/GarageCreationView";
import SignUpView from "./views/SignUpView";
import UserLoginView from "./views/UserLoginView";
import DeliveryView from "./views/DeliveryView";
import AdminSignUpView from "./views/AdminSignUpView";
import BargainView from "./views/BargainView";
import VisitorView from "./views/VisitorView";
import OrderDetailsView from "./views/OrderDetailsView";
import Search from "./components/Search";
import Payment from "./components/Payment";
import RatingPage from "./components/RatingPage";
import ImageView from "./components/Image";
import SearchView from "./views/SearchView";
import PurchaseView from "./views/PurchaseView";
import ItemDetailsView from "./views/ItemDetailsView";
// routes within the movie database example app
// used for routing

const routes = [
  {
    path: "/home",
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
    path: "/delivery/:id",
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
    component: SearchView,
  },
  {
    path: "/payment/:id",
    component: Payment,
  },
  {
    path: "/mypurchase",
    component: PurchaseView,
  },
  {
    path: "/image",
    component: ImageView,
  },
  {
    path: "/item/:id",
    component: ItemDetailsView,
  },
  {
    path: "/rating/:id",
    component: RatingPage,
  },
];

export default routes;
