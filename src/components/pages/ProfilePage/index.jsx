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

  componentDidMount = () => {
    const { match, globalState, globalFunctions } = this.props;
    const username = match?.params?.username;

    if (username) {
      if (globalFunctions.refetchRequired(username)) {
        globalFunctions.fetchCacheData(username);
      }

      if (
        globalState.loggedUser &&
        globalFunctions.usernameMatchesFetchedUsername(username)
      ) {
        globalFunctions.updateCache(globalState?.fetchedUser);
      }
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { globalState, globalFunctions } = this.props;

    //#TSID10
    //console.log("PROFILE PAGE NEXT PROPS", nextProps);
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
      //#TSID11
      //console.dir("PROFILE PAGE RENDER SUCCESS", globalState.fetchedUser);

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
//> Default Class
export default withRouter(ProfilePage);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
