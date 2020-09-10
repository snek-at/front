//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBBadge } from "mdbreact";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Components
import { ProjectTab, OverviewTab, TalksTab } from "../../../tabs";
//> Style sheet
import "./tabs.scss";
//#endregion

//#region > Components
/** @class A component which contains all tabs for software engineer profile */
class SoftwareTabs extends React.Component {
  state = {
    activeTab: 0,
  };

  setActiveTab = (activeTab) => {
    this.setState({
      activeTab,
    });
  };

  isSameOrigin = () => {
    const { fetchedPerson, loggedUser } = this.props;

    return fetchedPerson.slug === loggedUser?.person?.slug;
  };

  render() {
    const { fetchedPerson } = this.props;
    const { activeTab } = this.state;
    const tabItems = [
      {
        title: "Overview",
        visible: true,
        pill: false,
        notification: false,
      },
      {
        title: "Projects",
        visible: true,
        pill: fetchedPerson?.person?.repositories
          ? fetchedPerson?.person?.repositories.length
          : "0",
        notification: false,
      },
      {
        title: "Education",
        visible: true,
        notification: false,
      },
      {
        title: "Posts",
        visible: true,
        pill: "0",
        notification: false,
      },
      {
        title: "Papers",
        visible: true,
        pill: "0",
        notification: false,
      },
      {
        title: "Talks",
        visible: true,
        notification: false,
        pill: fetchedPerson?.talks ? fetchedPerson?.talks.length : "0",
        notification: false,
      },
    ];

    return (
      <div className="profile-content">
        <ul className="nav nav-tabs">
          {tabItems.map((item, i) => {
            return (
              <li className="nav-item" key={i}>
                <span
                  className={activeTab === i ? "nav-link active" : "nav-link"}
                  onClick={() => this.setActiveTab(i)}
                >
                  {item.title}
                  <MDBBadge color="primary">{item.pill}</MDBBadge>
                </span>
              </li>
            );
          })}
        </ul>
        <div className="p-3 content">
          {activeTab === 0 && (
            // <OverviewTab
            //   platformData={fetchedUser && fetchedUser.platformData}
            //   sameOrigin={this.isSameOrigin()}
            // />
            <h1></h1>
          )}
          {activeTab === 1 && (
            <ProjectTab
              repoList={
                fetchedPerson?.person.repositories
                  ? fetchedPerson.person.repositories
                  : []
              }
            />
          )}
          {activeTab > 1 && activeTab < 5 && (
            <p className="text-muted">
              This feature is not available just yet.
            </p>
          )}
          {activeTab === 5 && (
            <TalksTab
              talkList={fetchedPerson?.talks ? fetchedPerson.talks : []}
            />
          )}
        </div>
      </div>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  loggedUser: state.user.user,
  fetchedPerson: state.person.fetchedPerson,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(SoftwareTabs);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */