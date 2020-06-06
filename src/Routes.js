//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { Route, Switch } from "react-router-dom";

//> Components
import { HomePage, CompanyPage } from "./components/pages";
//#endregion

//#region > Components
class Routes extends React.Component {
  render() {
    const { globalState, globalFunctions } = this.props;

    return (
      <Switch>
        <Route
          exact
          path="/"
          component={(props) => (
            <HomePage
              globalFunctions={globalFunctions}
              globalState={globalState}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/redirect"
          render={() => {
            // Get name of window which was set by the parent to be the unique
            // request key
            const requestKey = window.name;

            // Update corresponding entry with the redirected url which should
            // contain either access token or failure reason in the query
            // parameter / hash
            localStorage.setItem(requestKey, window.location.href);
            window.close();
          }}
        />
        <Route
          exact
          path="/c/:name"
          component={(props) => (
            <CompanyPage
              globalFunctions={globalFunctions}
              globalState={globalState}
            />
          )}
        />
      </Switch>
    );
  }
}
//#endregion

//#region > Exports
export default Routes;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
