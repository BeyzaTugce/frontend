import MainPageView from "./components/CategoryBar"
import GarageView from "./components/Garage";
import GarageCreationView from "./views/GarageCreationView";
import SignUpView from "./views/SignUpView";
import UserLoginView from "./views/UserLoginView";
import DeliveryView from "./views/DeliveryView";
import AdminSignUpView from "./views/AdminSignUpView";
import ItemView from "./views/ItemView";
import UserView from "./views/UserView";
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
        path: "/garage",
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
        path: "/item",
        component: ItemView,
        exact: true,
    },

    {
        path: "/user",
        component: UserView,
        exact: true,
    },

    {
        path: "/bargain",
        component: BargainView,
        exact: true,
    },
];

export default routes;