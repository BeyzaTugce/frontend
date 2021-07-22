import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from './redux/store';
import { loadUser } from "./redux/actions/AuthActions";
import routes from "./routes";
import { Provider } from "react-redux";


const App = () => {

  useEffect(() => {
    document.title = "MyGarage";
    store.dispatch(loadUser());
  }, []);


  return (
    <Provider store={store}>
      <div className="wrapper">
        <Router>
          <React.Fragment>
            <Switch>
              {routes.map((route, i) => (
                <Route key={i} {...route} />
              ))}
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
