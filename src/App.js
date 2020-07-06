//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React, { useEffect } from "react";
// DOM bindings for React Router
import { withRouter } from "react-router-dom";
//> Redux
import { useDispatch } from "react-redux";

//> Actions
import { loginAction } from "./store/actions/authActions";
//> Components
/**
 * Footer: Global Footer
 * Navbar: Global navigation bar
 */
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
export default withRouter(App);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
