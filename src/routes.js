import MainPageView from "./components/CategoryBar"
import GarageView from "./views/Garage";
import GarageCreationView from "./views/GarageCreation";
import SignUpView from "./views/Signup";
import LoginView from "./views/Login";
import DeliveryView from "./views/Delivery";


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
];

export default routes;