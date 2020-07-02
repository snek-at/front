//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { BrowserRouter as Router } from "react-router-dom";
// This serves as an entry point to the DOM and server renderers for React
import ReactDOM from "react-dom";
//> Redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
// Thunk
import thunk from "redux-thunk";
//> Intel
import { Intel } from "snek-intel";

//> Font Awesome
// Font Awesome is an awesome icon library
import "@fortawesome/fontawesome-free/css/all.min.css";
//> Bootstrap
import "bootstrap-css-only/css/bootstrap.min.css";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import "mdbreact/dist/css/mdb.css";

//> CSS
// Root SCSS file
import "./index.scss";
//> Components
// Root component
import App from "./App";
//> Root Reducer
import rootReducer from "./store/reducers";
//> Service Worker
import registerServiceWorker from "./registerServiceWorker";
import { loadingBarMiddleware } from "react-redux-loading-bar";
//#endregion

const INTEL = new Intel();

//#TODO
// Must be moved to INTEL in future?
const getIntel = () => {
  return INTEL;
};

const composeEnhancers =
  typeof window === "object" &&
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    loadingBarMiddleware(),
    thunk.withExtraArgument({
      getIntel, // Intel
    })
  )
  // other store enhancers if any
);

const STORE = createStore(rootReducer /* preloadedState, */, enhancer);

// Render the root component to <div id="root"></div>
ReactDOM.render(
  <Provider store={STORE}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
