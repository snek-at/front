//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React, { useEffect } from "react";
// DOM bindings for React Router
import { withRouter } from "react-router-dom";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { useDispatch } from "react-redux";
// Allows to manually display a LoadingBar
import LoadingBarContainer from "react-redux-loading-bar";

//> Actions
// Functions to send data from the application to the store
import { loginAction } from "./store/actions/authActions";
//> Components
import { Footer, Navbar } from "./components/molecules";
// Starts the page on top when reloaded or redirected
import { ScrollToTop } from "./components/atoms";
//> Routes
import Routes from "./Routes";
//#endregion

//#region > Components
/**
 * @class Root component which loads all other components
 */
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginAction());
  }, []);

  return (
    <>
      <header className="loading">
        <LoadingBarContainer className="loading" maxProgress={35} />
      </header>
      <ScrollToTop>
        <div className="flyout">
          <Navbar />
          <main>
            <Routes />
          </main>
          <Footer />
        </div>
      </ScrollToTop>
    </>
  );
}
//#endregion

//#region > Exports
//> Default Component
/**
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default withRouter(App);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
