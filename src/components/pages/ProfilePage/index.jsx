//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter } from "react-router-dom";
//> Redux
import { connect } from "react-redux";

//> Actions
import {
  readCacheAction,
  updateCacheAction,
  saveSettingsActions,
} from "../../../store/actions/userActions";
//> Components
import { SoftwareEngineer } from "../../organisms/profiles";
//> CSS
import "./profile.scss";

//#endregion

//#region > Components
/**
 * @class This component adds the Profile page and distinguishes
 *        between software and media technology accounts and
 *        loads the components accordingly.
 */
class ProfilePage extends React.Component {
  state = {};

  saveSettings = (state) => {
    this.props.saveSettings(state);
  };

  /**
   * Check for refetch for a specific username.
   *
   * @param {string} username The username associated with a profile page
   * @returns {boolean} True if a refetch is required otherwise False
   */
  refetchRequired = (username) => {
    const fetchedUser = this.props.fetchedUser;

    if (!fetchedUser) {
      return true;
    } else if (fetchedUser && !this.usernameMatchesFetchedUsername(username)) {
      return true;
    }
    return false;
  };

  /**
   * Check if the provided username matches with the current fetched user.
   *
   * @param {string} username The username associated with a profile page
   * @returns {boolean} True if the usernames matches otherwise False
   */
  usernameMatchesFetchedUsername = (username) => {
    return username === this.props.fetchedUser?.username;
  };

  componentDidMount = () => {
    this._isMounted = true;

    const { match, loggedUser, fetchedUser } = this.props;
    const username = match?.params?.username;

    console.log("BAR USERNAME", username);
    console.log("REFETCH REQUIRED", this.refetchRequired(username));
    console.log("LOGGED", loggedUser);
    console.log("FETCHED", fetchedUser);
    console.log(
      "USERNAME MATCHES FETCHED USERNAME",
      this.usernameMatchesFetchedUsername(username)
    );
    if (username) {
      if (this.refetchRequired(username)) {
        this.props.readCache(username);
      }
      console.log(
        !loggedUser.anonymous && loggedUser.username === fetchedUser?.username
      );
    }
  };

  componentDidUpdate() {
    const { loggedUser, fetchedUser } = this.props;

    if (!this.props.cachingDone) {
      if (
        !loggedUser.anonymous &&
        loggedUser.username === fetchedUser?.username
      ) {
        console.log("UPDATE CACHE");
        this.props.updateCache(fetchedUser).then(() => {
          console.log("UPDATEd");
          if (this._isMounted) {
            this.props.readCache(loggedUser.username);

            console.log("CACHING DONE", this.props.fetchedUser);
          } else {
            console.log("CACHING DONE BUT NOT MOUNTED");
          }
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps = (nextProps) => {
    //#TSID10
    //console.log("PROFILE PAGE NEXT PROPS", nextProps);
  };

  render() {
    const { fetchedUser } = this.props;
    console.log(fetchedUser);
    if (!fetchedUser) {
      return (
        <div className="text-center my-5 py-5">
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else if (fetchedUser) {
      //#TSID11
      //console.dir("PROFILE PAGE RENDER SUCCESS", this.props.fetchedUser);

      return (
        <div id="profile">
          <SoftwareEngineer />
        </div>
      );
    } else {
      return <p>Usecase not mapped</p>;
    }
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
  fetchedUser: state.user.fetchedUser,
  cachingDone: state.user.cachingDone,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveSettings: (nextSettings) => dispatch(saveSettingsActions(nextSettings)),
    readCache: (username) => dispatch(readCacheAction(username)),
    updateCache: (fetchedUser) => dispatch(updateCacheAction(fetchedUser)),
  };
};
//#endregion

//#region > Exports
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
