//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter } from "react-router-dom";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Actions
// Functions to send data from the application to the store
import { getPerson } from "../../../store/actions/personActions";
//> Components
import { SoftwareEngineer } from "../../organisms/profiles";
//> Style sheet
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
    this._isMounted = true;
    const { match } = this.props;
    const username = match?.params?.username;

    if (username) {
      this.props.getPerson(username);
    }
  };

  componentDidUpdate() {}

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps = (nextProps) => {
    //#TSID10
    //console.log("PROFILE PAGE NEXT PROPS", nextProps);
  };

  render() {
    const { fetchedUser } = this.props;

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
  loggedUser: state.user.user,
  fetchedPerson: state.person.fetchedPerson,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPerson: (personName) => dispatch(getPerson(personName)),
  };
};
//#endregion

//#region > Exports
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
