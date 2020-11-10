//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { Route, Switch } from "react-router-dom";

//> Components
import {
  HomePage,
  PersonPage,
  CompanyPage,
  TalkPage,
  SettingsPage,
} from "./components/pages";
//#endregion

//#region > Components
/** @class Route component which includes all routes to specified components */
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={(props) => <HomePage {...props} />} />
        <Route
          exact
          path="/u/:username"
          component={(props) => <PersonPage {...props} />}
        />
        <Route
          exact
          path="/c/:name"
          component={(props) => <CompanyPage {...props} />}
        />
        <Route
          exact
          path="/t/:uid"
          component={(props) => <TalkPage {...props} />}
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
        <Route
          exact
          path="/settings"
          component={(props) => <SettingsPage {...props} />}
        />
        <Route
          exact
          path="/path/explorer"
          render={function () {
            return (
              <div>
                Here is a flag for you {process.env.FLAG_PATH_EXPLORER}. Keep on
                searching and find them all.
              </div>
            );
          }}
        />
        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}
//#endregion

//#region > Exports
//> Default Component
export default Routes;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
