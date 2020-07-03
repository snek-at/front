//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// React PropTypes
import PropTypes from "prop-types";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";

//> CSS
import "./overviewtab.scss";
//> Components
import {
  Calendar2D,
  Calendar3D,
  ContribRadar,
  Pinned,
  LatestActivity,
  ErrorBoundary,
} from "../../../atoms";
//#endregion

//#region > Constant Variables
/** @description Dummy data */
const pinned = [
  {
    category: {
      color: "green",
      title: "Test",
    },
    pinned: {
      views: 4,
      description: "This is the description",
    },
    link: "https://www.google.com",
  },
  {
    category: {
      color: "red",
      title: "Test",
    },
    pinned: {
      views: 11,
      description: "This is the description 2",
    },
    link: "https://www.google.com",
  },
];
//#endregion

//#region > Components
/** @class This component implements the overview tab */
class OverviewTab extends React.Component {
  state = {
    selectedYear: undefined,
  };

  selectDay = (day, wkey, dkey) => {
    this.setState({
      activity: {
        day,
        wkey,
        dkey,
      },
    });
  };

  render() {
    const { platformData } = this.props;

    return (
      <>
        {/* <ErrorBoundary hidden="true"> */}
        <ErrorBoundary>
          {platformData && (
            <MDBRow className="text-center text-md-left mb-4">
              {platformData.statistic.languages.map((language, i) => {
                if (i < 6) {
                  return (
                    <MDBCol md="4" key={i}>
                      <span className="mb-2 text-muted">
                        <MDBIcon
                          icon="square"
                          className="pr-2"
                          style={{ color: language.color }}
                        />
                        {language.name} <small>{language.share}%</small>
                      </span>
                    </MDBCol>
                  );
                }
              })}
            </MDBRow>
          )}
          {true && (
            <>
              <MDBRow className="m-0 p-0">
                <MDBCol md="6 text-left">
                  <p className="lead">Pinned</p>
                </MDBCol>
                <MDBCol md="6 text-right">
                  <span className="clickable text-muted">Customize</span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="pinned">
                {pinned.map((item, i) => {
                  return <Pinned {...item} key={i} />;
                })}
              </MDBRow>
            </>
          )}
          {platformData &&
            (platformData.user.settings.show3DDiagram ||
              platformData.user.settings.show2DDiagram) && (
              <div className="text-right year-select">
                {platformData.statistic.years.map((year, i) => {
                  return (
                    <MDBBtn
                      color="white"
                      key={i}
                      size="md"
                      className={
                        year.year === this.state.selectedYear
                          ? "selected"
                          : undefined
                      }
                      onClick={() => this.setState({ selectedYear: year.year })}
                    >
                      {year.year}
                    </MDBBtn>
                  );
                })}
                <MDBBtn
                  color="white"
                  size="md"
                  className={
                    this.state.selectedYear === undefined
                      ? "selected"
                      : undefined
                  }
                  onClick={() => this.setState({ selectedYear: undefined })}
                >
                  Current
                </MDBBtn>
              </div>
            )}
          {platformData && platformData.user.settings.show3DDiagram && (
            <Calendar3D
              platformData={platformData}
              year={this.state.selectedYear}
            />
          )}
          {platformData && platformData.user.settings.show2DDiagram && (
            <Calendar2D
              platformData={platformData}
              year={this.state.selectedYear}
              selectDay={this.selectDay}
            />
          )}
          <MDBRow className="mt-4">
            <MDBCol md="7">
              <p className="lead">Contribution Types</p>
              {platformData && !platformData.user.settings.showContribDiagram && (
                <div className="mt-5">
                  <ContribRadar
                    statistic={platformData.statistic}
                    year={this.state.selectedYear}
                  />
                </div>
              )}
            </MDBCol>
            <MDBCol md="5">
              <p className="lead">
                Activity
                <MDBIcon
                  icon="angle-double-up"
                  className="green-text ml-2"
                  size="md"
                />
              </p>
              <p className="text-muted mb-0">Weekly overview</p>
              <LatestActivity
                statistic={platformData.statistic}
                year={this.state.selectedYear}
                activity={this.state.activity}
              />
            </MDBCol>
          </MDBRow>
        </ErrorBoundary>
      </>
    );
  }
}
//#endregion

//#region > PropTypes
OverviewTab.propTypes = {
  platformData: PropTypes.object.isRequired,
};
//#endregion

//#region > Exports
//> Default Class
export default OverviewTab;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
