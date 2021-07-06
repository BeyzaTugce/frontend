import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider, useDispatch } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./redux/reducers";

import { BrowserRouter as Router } from "react-router-dom";

const middleware = [thunk];

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleware),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
