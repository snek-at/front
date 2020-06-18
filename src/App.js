//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter } from "react-router-dom";
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
// Starts the page on top when reloaded or redirected
import { ScrollToTop } from "./components/atoms";
//> Routes
import Routes from "./Routes";
//> Actions
import {
  ferry,
  login,
  logout,
  fetchGitLabServers,
  appendSourceObjects,
  getAllPageUrls,
  getData,
  saveSettings,
  register,
  readCache,
  updateCache,
  writeCache,
  getAllTalks,
  getTalk,
  uploadTalk,
  deleteTalk,
} from "./actions";
//#endregion

//#region > Components
/**
 * @class Root component which loads all other components
 */
class App extends React.Component {
  state = {
    loggedUser: undefined,
    fetchedUser: undefined,
    loading: true,
    caching: false,
  };

  globalFunctions = {
    // Authentication Actions
    login: async (username, password) =>
      this.handleLoginSession({ username, password: sha256(password) }),
    logout: async () => this.handleLogout(),
    // General Actions
    fetchGitLabServers: async () => ferry(fetchGitLabServers()),
    appendSourceObjects: async (sourceList) =>
      ferry(appendSourceObjects(sourceList)),
    users: async () => ferry(getAllPageUrls()),
    saveSettings: async (nextSettings) => this.handleSaveSettings(nextSettings),
    // User Actions
    updateCache: async (fetchedUser) => this.handleCacheRenewal(fetchedUser),
    writeCache: async (platformData) => ferry(writeCache(platformData)),
    registerUser: async (registrationData) =>
      this.handleRegistration(registrationData),
    fetchCacheData: async (username) => this.handleProfileFetching(username),
    // Talk Actions
    deleteTalk: async (talk) => this.handleTalkDeletion(talk),
    uploadTalk: async (file, talkInfo) => this.handleTalkUpload(file, talkInfo),
    getTalk: (uid, username) => ferry(getTalk(uid, username)),
    // Controlling Actions
    refetchRequired: (username) => this.refetchRequired(username),
    usernameMatchesFetchedUsername: (username) =>
      this.usernameMatchesFetchedUsername(username),
  };

  componentDidMount = () => {
    // Start a session as anonymous user
    this.handleLoginSession();
  };

  /**
   * Handle login session.
   *
   * @param user A user to login with
   * @description Handles states for login
   */
  handleLoginSession = async (user) => {
    return ferry(login(user)).then((loggedUser) => {
      if (loggedUser) {
        this.setState(
          {
            loggedUser,
            loading: false,
          },
          () => console.log(this.state)
        );
        console.log(this.state);
      } else {
        if (this.state.loggedUser !== null) {
          this.setState({
            loggedUser: null,
            loading: false,
          });
        }
      }
    });
  };

  /**
   * Handle logout.
   *
   * @description Handles states for logout
   */
  handleLogout = () => {
    this.setState(
      {
        loggedUser: undefined,
        fetchedUser: undefined,
        loading: false,
        caching: false,
      },
      () => ferry(logout()).then(() => this.handleLoginSession())
    );
  };

  /**
   * Handle registration
   *
   * @param registrationData Data to register a user
   * @description Handles states for registration
   */
  handleRegistration = (registrationData) => {
    ferry(register(registrationData)).then((res) => {
      this.globalFunctions.login(res.username, res.password).then(() => {
        this.globalFunctions.writeCache(registrationData.platform_data);
        this.setState({ caching: true, loading: false });
      });
    });
  };

  /**
   * Handle cache renewal.
   *
   * @param fetchedUser A fetched user object
   * @description Handles states for cache renewal
   */
  handleCacheRenewal = async (fetchedUser) => {
    console.log("Cache update test", fetchedUser);
    if (
      !this.state.caching &&
      this.state.loggedUser?.username ===
        fetchedUser?.platformData.profile?.username
    ) {
      // Renew cache
      const fetchedUser = await ferry(updateCache(fetchedUser));

      this.setState({
        fetchedUser,
        caching: true,
      });
    }
  };

  /**
   * Handle profile fetching.
   *
   * @param username A username to read the cache from
   * @description Handles states for profile fetching
   */
  handleProfileFetching = async (username) => {
    const fetchedUser = await ferry(readCache(username));

    // Update visible data
    this.setState({
      fetchedUser: fetchedUser ? fetchedUser : false,
      loading: false,
    });
  };

  /**
   * Handle talk upload.
   *
   * @param file A file to be uploaded
   * @param talkInfo Additional information to add to the talk
   * @description Handles states for talk uploading
   */
  handleTalkUpload = async (file, talkInfo) => {
    ferry(uploadTalk(file, talkInfo), {
      currentCache: this.state.fetchedUser.platformData,
    }).then((platformData) => {
      this.setState({
        fetchedUser: {
          ...this.state.fetchedUser,
          platformData,
        },
      });
    });
  };

  /**
   * Handle talk deletion.
   *
   * @param talk A talk that should be deleted
   * @description Handles states for talk deleting
   */
  handleTalkDeletion = async (talk) => {
    ferry(deleteTalk(talk), {
      currentCache: this.state.fetchedUser.platformData,
    }).then((platformData) => {
      this.setState({
        fetchedUser: {
          ...this.state.fetchedUser,
          platformData,
        },
      });
    });
  };

  /**
   * Handle save settings.
   *
   * @param nextSettings A settings object that should be applied
   * @description Handles states for saving settings
   */
  handleSaveSettings = async (nextSettings) => {
    ferry(saveSettings(nextSettings), {
      currentCache: this.state.fetchedUser.platformData,
    }).then((platformData) => {
      this.setState({
        fetchedUser: {
          ...this.state.fetchedUser,
          platformData,
        },
      });
    });
  };

  //#region > Refetch Checking
  /**
   * Check for refetch for a specific username.
   *
   * @param {string} username The username associated with a profile page
   * @returns {boolean} True if a refetch is required otherwise False
   */
  refetchRequired = (username) => {
    const loading = this.state.loading;
    const fetchedUser = this.state.fetchedUser;

    if (!loading) {
      if (!fetchedUser && fetchedUser !== false) {
        return true;
      } else if (
        fetchedUser &&
        !this.usernameMatchesFetchedUsername(username)
      ) {
        return true;
      }
      return false;
    }
  };

  /**
   * Check if the provided username matches with the current fetched user.
   *
   * @param {string} username The username associated with a profile page
   * @returns {boolean} True if the usernames matches otherwise False
   */
  usernameMatchesFetchedUsername = (username) => {
    return username === this.state.fetchedUser?.platformData?.profile?.username;
  };
  //#endregion

  render() {
    return (
      <ScrollToTop>
        <div className="flyout">
          {!this.state.caching &&
            this.state.fetchedUser &&
            this.state.loggedUser?.username ===
              this.state.fetchedUser.platformData.profile?.username && (
              <MDBProgress material preloader className="caching-loader" />
            )}
          <Navbar
            globalState={this.state}
            globalFunctions={this.globalFunctions}
          />
          <main>
            <Routes
              globalState={this.state}
              globalFunctions={this.globalFunctions}
            />
          </main>
          <Footer />
        </div>
      </ScrollToTop>
    );
  }
}
//#endregion

//#region > Exports
//> Default Class
export default withRouter(App);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
