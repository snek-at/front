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
          component={(props) => <ProfilePage />}
        />
        <Route exact path="/c/:name" component={(props) => <CompanyPage />} />
        <Route
          exact
          path="/t/:username/:uid"
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
