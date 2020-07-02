//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBBadge } from "mdbreact";

//> Components
import { ProjectTab, OverviewTab, TalksTab } from "../tabs";
import { connect } from "react-redux";
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

  componentDidUpdate() {
    console.log("UPDATE SOFTWARE TABS", this.state.activeTab);
  }

  render() {
    const { fetchedUser } = this.props;
    const { activeTab } = this.state;

    console.log(fetchedUser);

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
        pill: this.props.fetchedUser?.platformData?.profile?.repositories
          ? this.props.fetchedUser?.platformData?.profile?.repositories?.length
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
        pill: this.props.fetchedUser?.platformData.talks
          ? this.props.fetchedUser?.platformData.talks.length
          : "0",
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
        <div className="p-3">
          {activeTab === 0 && (
            <OverviewTab
              platformData={fetchedUser && fetchedUser.platformData}
            />
          )}
          {activeTab === 1 && (
            <ProjectTab
              repoList={
                fetchedUser && fetchedUser.platformData.profile.repositories
              }
            />
          )}
          {activeTab > 1 && activeTab < 5 && (
            <p className="text-muted">
              This feature is not available just yet.
            </p>
          )}
          {activeTab === 5 && <TalksTab {...this.props} />}
        </div>
      </div>
    );
  }
}
//#endregion

const mapStateToProps = (state) => ({
  fetchedUser: state.user.fetchedUser,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

//#region > Exports
//> Default Class
export default connect(mapStateToProps, mapDispatchToProps)(SoftwareTabs);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */