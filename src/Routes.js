//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { Route, Switch } from "react-router-dom";

//> Components
import {
  HomePage,
  ProfilePage,
  CompanyPage,
  TalkPage,
} from "./components/pages";
//#endregion

//#region > Components
/** @class Route component which includes all routes to specified components */
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
          path="/u/:username"
          component={(props) => (
            <ProfilePage
              globalFunctions={globalFunctions}
              globalState={globalState}
            />
          )}
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
        <Route
          exact
          path="/t/:username/:uid"
          component={(props) => (
            <TalkPage
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
            // Close the window after GitHub redirect
            this.componentDidMount = () => {
              window.close();
            };
          }}
        />
        {/* Some debugging routes */}
        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
        <Route
          exact
          path="/first"
          render={function () {
            return <h1>First Layer</h1>;
          }}
        />
        <Route
          exact
          path="/first/second"
          render={function () {
            return <h1>Second Layer</h1>;
          }}
        />
        <Route
          path="/first/second/third"
          render={function () {
            return <h1>Third Layer</h1>;
          }}
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
 * Copyright © 2019-2020 Simon Prast
 */
