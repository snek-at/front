//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { BrowserRouter as Router } from "react-router-dom";

//> Components
/**
 * Footer: Global Footer
 * Navbar: Global navigation bar
 */
import { Footer, Navbar } from "./components/molecules";

//> Routes
import Routes from "./Routes";
//#endregion

//#region > Components
class App extends React.Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <Router>
        <div className="flyout">
          <Navbar
            globalState={this.state}
            globalFunctions={{
              logout: {},
              login: () => {},
            }}
          />
          <main>
            <Routes />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}
//#endregion

//#region > Exports
export default App;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
