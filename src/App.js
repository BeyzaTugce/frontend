import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import reducers from "./redux/reducers";
import routes from "./routes";
import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import {Provider, useDispatch} from 'react-redux'

const App = () => {

  //const dispact = useDispatch();

  // set document title
  useEffect(() => {
    document.title = "MyGarage";
  }, []);

  // create store for redux
  const store = createStore(reducers, compose(applyMiddleware(thunk)));

  // theme for app
  //const [theme, setTheme] = React.useState(AppTheme.LIGHT);

  // toggle theme
  /*const toggleTheme = () => {
    setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
  };*/

  return (
      <Router>
        <div className="wrapper">
          <Provider store={store}>
            <React.Fragment>
              <Header/>
              <Switch>
                {routes.map((route, i) => (
                    <Route key={i} {...route} />
                ))}
              </Switch>
            </React.Fragment>
          </Provider>
        </div>
      </Router>
  );

}

export default App;
