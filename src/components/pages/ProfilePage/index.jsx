//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter } from "react-router-dom";

//> Components
import { SoftwareEngineer } from "../../organisms/profiles";
//> CSS
import "./profile.scss";
//#endregion

//#region > Components
class ProfilePage extends React.Component {
  state = {};

  saveSettings = (state) => {
    this.props.saveSettings(state);
  };

  componentDidMount = () => {
    const { match, globalState, globalFunctions } = this.props;
    const username = match?.params?.username;

    if (username) {
      if (
        !globalState.loading &&
        !globalState.fetchedUser &&
        globalState.fetchedUser !== false
      ) {
        globalFunctions.fetchCacheData(username);
      }
    }

    // Call update cache
    if (globalState.fetchedUser && globalState.loggedUser) {
      globalFunctions.updateCache(globalState.fetchedUser);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { globalState, globalFunctions } = this.props;

    //#TSID
    //console.log("UPDATED", nextProps);
  };

  render() {
    const { globalState, globalFunctions } = this.props;

    if (
      globalState.loading ||
      (!globalState.loading && !globalState.fetchedUser)
    ) {
      return (
        <div className="text-center my-5 py-5">
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else if (!globalState.loading && globalState.fetchedUser === false) {
      return <p>Error. User can not be fetched.</p>;
    } else if (!globalState.loading && globalState.fetchedUser) {
      //#TSID
      //console.dir(globalState.fetchedUser);

      return (
        <div id="profile">
          <SoftwareEngineer
            globalState={globalState}
            globalFunctions={globalFunctions}
          />
        </div>
      );
    } else {
      return <p>Usecase not mapped</p>;
    }
  }
}
//#endregion

//#region > Exports
export default withRouter(ProfilePage);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
