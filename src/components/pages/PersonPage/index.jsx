//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter } from "react-router-dom";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Actions
// Functions to send data from the application to the store
import {
  getPerson,
  processProfiles,
} from "../../../store/actions/personActions";
import { getPerson as getUserPerson } from "../../../store/actions/userActions";
//> Components
import { PersonInfoCard, PersonTabs } from "../../organisms";
import { ConnectModal } from "../../molecules/modals";
//> Style sheet
import "./person.scss";
//#endregion

//#region > Components
/**
 * @todo Add description
 */
class PersonPage extends React.Component {
  state = {
    cachingDone: false,
    showConnectModal: true,
  };

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

  componentDidUpdate = async () => {
    const { fetchedPerson, loggedUser, profilesProcessed } = this.props;

    if (
      !this.state.cachingDone &&
      fetchedPerson &&
      loggedUser?.person &&
      fetchedPerson.slug === loggedUser.person.slug &&
      !profilesProcessed
    ) {
      await this.props.processProfiles();

      if (this._isMounted) {
        this.setState({ cachingDone: true }, () =>
          this.props.getPerson(loggedUser.person.slug.split("-")[1])
        );
      }
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps = (nextProps) => {
    //#TSID10
    //console.log("PROFILE PAGE NEXT PROPS", nextProps);
  };

  render() {
    const { fetchedPerson, match, loggedUser } = this.props;
    const username = match?.params?.username;

    if (fetchedPerson?.slug.split("-")[1] === username) {
      return (
        <div id="profile">
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol lg="3">
                <PersonInfoCard />
              </MDBCol>
              <MDBCol lg="9">
                <PersonTabs />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          {fetchedPerson &&
            fetchedPerson.profiles.length === 0 &&
            fetchedPerson.slug === loggedUser?.person?.slug &&
            this.state.showConnectModal &&
            (!localStorage.getItem("connect_modal") ||
              (localStorage.getItem("connect_modal") &&
                JSON.parse(localStorage.getItem("connect_modal")).includes(
                  username
                ))) && (
              <ConnectModal
                isModal
                refetch={this.props.toggle}
                toggle={() =>
                  this.setState({ showConnectModal: false }, () =>
                    localStorage.setItem(
                      "connect_modal",
                      JSON.stringify(
                        localStorage.setItem("connect_modal", true)
                          ? JSON.parse(
                              localStorage.setItem("connect_modal", true)
                            ).push(username)
                          : [username]
                      )
                    )
                  )
                }
              />
            )}
        </div>
      );
    } else {
      return (
        <div className="text-center my-5 py-5">
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  loggedUser: state.user.user,
  fetchedPerson: state.person.fetchedPerson,
  profilesProcessed: state.person.profilesProcessed,
});

const mapDispatchToProps = (dispatch) => {
  return {
    processProfiles: () => dispatch(processProfiles()),
    getUserPerson: (personName) => dispatch(getUserPerson(personName)),
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
  connect(mapStateToProps, mapDispatchToProps)(PersonPage)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
