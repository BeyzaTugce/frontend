import MainPageView from "./components/CategoryBar"
import GarageView from "./views/Garage";
import GarageCreationView from "./views/GarageCreationView";
import SignUpView from "./views/SignUpView";
import LoginView from "./views/LoginView";
import DeliveryView from "./views/Delivery";
import AdminSignUpView from "./views/AdminSignUpView";


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
        path: "/login",
        component: LoginView,
    },
    {
        path: "/signup",
        component: SignUpView,
    },
    {
        path: "/delivery",
        component: DeliveryView,
    },

    {
        path: "/adminsignup",
        component: AdminSignUpView,
    },
];

export default routes;