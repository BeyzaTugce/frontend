import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from './redux/store';
import Header from "./components/Header";
import { loadUser } from "./redux/actions/AuthActions";
import routes from "./routes";
import { Provider } from "react-redux";
//import {applyMiddleware, createStore, compose} from "redux";
//import thunk from "redux-thunk";
//import {Provider, useDispatch} from 'react-redux'

const App = () => {
  //const dispact = useDispatch();
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  // set document title
  useEffect(() => {
    document.title = "MyGarage";
  }, []);

  // create store for redux
  //const store = createStore(reducers, compose(applyMiddleware(thunk)));

  // theme for app
  //const [theme, setTheme] = React.useState(AppTheme.LIGHT);

  // toggle theme
  /*const toggleTheme = () => {
    setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
  };*/

  return (
    <Provider store={store}>
      <Router>
        <div className="wrapper">
          <React.Fragment>
            <Header />
            <Switch>
              {routes.map((route, i) => (
                <Route key={i} {...route} />
              ))}
            </Switch>
          </React.Fragment>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
