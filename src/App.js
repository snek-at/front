//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { BrowserRouter as Router } from "react-router-dom";
//> Additional
// SHA Hashing algorithm
import sha256 from "js-sha256";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBProgress } from "mdbreact";

//> Components
/**
 * Footer: Global Footer
 * Navbar: Global navigation bar
 */
import { Footer, Navbar } from "./components/molecules";
//> Routes
import Routes from "./Routes";
//> Intel
import { Intel } from "snek-intel";
//#endregion

//#region > Components
class App extends React.Component {
  state = {
    loggedUser: undefined,
    fetchedUser: undefined,
    loading: true,
  };

  componentDidMount = () => {
    // Create new intel instance
    this.intel = new Intel();
    // Create new session link for easy access
    this.session = this.intel.snekclient.session;
    // Begin session
    this.begin();
  };

  //> Authentication methods
  /**
   * Begin Session
   * @description Start a new session based on authentication history.
   *              New site access will lead to a anonymous login.
   */
  begin = async (user) => {
    console.log("BEGIN INIT", user);
    const whoami = await this.session.begin(user ? user : undefined);
    console.log(whoami);
    // Check if whoami is not empty
    if (whoami?.username || whoami?.whoami?.username) {
      const username = whoami?.username
        ? whoami?.username
        : whoami?.whoami?.username;

      // Check if whoami user is not anonymous user
      if (username !== process.env.REACT_APP_ANONYMOUS_USER) {
        // Get loggedUser object
        const loggedUser = {
          username,
          avatarUrl:
            "https://avatars2.githubusercontent.com/u/21159914?u=afab4659183999f1adc85089bb713aefbf085b94",
        };

        // Real user is logged in
        this.handleLogin(loggedUser);

        return true;
      } else {
        this.handleLogin(null);

        return false;
      }
    } else {
      this.handleLogin(false);

      return false;
    }
  };

  /**
   * Authenticate
   * @description Logs in user
   */
  login = async (username, password) => {
    console.log(username, password);
    return this.begin({
      username,
      password: sha256(password),
    })
      .then()
      .catch((err) => {
        console.error("LOGIN", err);
        return false;
      });
  };

  /**
   * Handle login
   * @description Handles states for login
   */
  handleLogin = (loggedUser) => {
    console.log("HANDLE LOGIN", loggedUser);
    if (loggedUser) {
      this.setState({
        loggedUser,
        loading: false,
      });
    } else {
      if (this.state.loggedUser !== null) {
        this.setState({
          loggedUser: null,
          loading: false,
        });
      }
    }
  };

  /**
   * Logout user
   * @description Handles the logging out of active users
   */
  logout = () => {
    this.setState(
      {
        loggedUser: undefined,
        fetchedUser: undefined,
        loading: false,
        caching: false,
      },
      () => this.session.end().then(() => this.begin())
    );
  };

  render() {
    return (
      <Router>
        <div className="flyout">
          {!this.state.caching &&
            this.state.fetchedUser &&
            this.state.loggedUser?.username ===
              this.state.fetchedUser.platformData.user?.username && (
              <MDBProgress material preloader className="caching-loader" />
            )}
          <Navbar
            globalState={this.state}
            globalFunctions={{
              logout: this.logout,
            }}
          />
          <main>
            <Routes
              globalState={this.state}
              globalFunctions={{
                login: this.login,
              }}
            />
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
