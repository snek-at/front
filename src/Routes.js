//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { Route, Switch } from "react-router-dom";

//> Components
import { HomePage } from "./components/pages";
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
