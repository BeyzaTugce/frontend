import React from "react";
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Delivery from './components/Delivery/Delivery';
import Garage from "./views/Garage";
import CategoryBar from "./components/Header/CategoryBar";
import GarageCreation from "./components/GarageCreation/GarageCreation";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Switch>
          <Route exact path="/">
            <CategoryBar />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/garage">
            <Garage />
          </Route>
          <Route path="/garagecreation">
            <GarageCreation />
          </Route>
          <Route path="/delivery">
            <Delivery />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
