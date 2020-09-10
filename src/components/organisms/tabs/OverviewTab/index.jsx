//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Runtime type checking for React props and similar objects
import PropTypes from "prop-types";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Actions
// Functions to send data from the application to the store
// import { writeCacheAction } from "../../../../store/actions/userActions";
//> Style sheet
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
import { MovableBoundary } from "../../../molecules";
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
    selectedYearIndex: undefined,
    edit: false,
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

  // handleEditClick = (platformData) => {
  //   if (this.state.edit) {
  //     this.props.writeCache(platformData);
  //   }

  //   this.setState({ edit: !this.state.edit });
  // };

  render() {
    const { fetchedPerson, sameOrigin } = this.props;

    // // Create empty pool if there isn't already one
    // if (!fetchedUser.platformData.user.movablePool) {
    //   fetchedUser.platformData.user.movablePool = {};
    // }

    const movablePool = {};
    const {
      currentStatistic,
      yearsStatistic,
      languages,
    } = fetchedPerson.person;

    const {
      displayProgrammingLanguages,
      display2dCalendar,
      display3dCalendar,
    } = fetchedPerson;

    console.log(display2dCalendar, display3dCalendar);

    let platformData = "";

    return (
      <>
        {/* <ErrorBoundary hidden="true"> */}
        <ErrorBoundary>
          {sameOrigin && (
            <div className="text-right">
              <MDBBtn
                color={this.state.edit ? "success" : "green"}
                size="md"
                // onClick={() => this.handleEditClick(platformData)}
              >
                {this.state.edit ? (
                  <span>
                    <MDBIcon icon="check-circle" />
                    Save items
                  </span>
                ) : (
                  <span>Move items</span>
                )}
              </MDBBtn>
            </div>
          )}
          <MovableBoundary
            pool={movablePool}
            uid="overview"
            edit={this.state.edit}
            items={[
              <>
                {languages && (
                  <MDBRow className="text-center text-md-left mb-4">
                    {languages?.map((language, i) => {
                      if (i < 6) {
                        return (
                          <MDBCol md="4" key={i}>
                            <span className="mb-2 text-muted">
                              <MDBIcon
                                icon="circle"
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
              </>,
              <>
                {false && (
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
              </>,
              <>
                {(display3dCalendar || display3dCalendar) && (
                  <div className="text-right year-select">
                    {yearsStatistic.map((year, i) => {
                      return (
                        <MDBBtn
                          color="white"
                          key={i}
                          size="md"
                          className={
                            i === this.state.selectedYearIndex
                              ? "selected"
                              : undefined
                          }
                          onClick={() =>
                            this.setState({ selectedYearIndex: i })
                          }
                        >
                          {this.state.selectedYearIndex}
                        </MDBBtn>
                      );
                    })}
                    <MDBBtn
                      color="white"
                      size="md"
                      className={
                        this.state.selectedYearIndex === undefined
                          ? "selected"
                          : undefined
                      }
                      onClick={() =>
                        this.setState({ selectedYearIndex: undefined })
                      }
                    >
                      Current
                    </MDBBtn>
                  </div>
                )}
              </>,
              <>
                {display3dCalendar && (
                  <Calendar3D
                    currentStatistic={currentStatistic}
                    yearsStatistic={yearsStatistic}
                    year={this.state.selectedYearIndex}
                  />
                )}
              </>,
              <>
                {display2dCalendar &
                (
                  <Calendar2D
                    platformData={platformData}
                    year={this.state.selectedYearIndex}
                    selectDay={this.selectDay}
                  />
                )}
              </>,
              <div className="interchange-charts">
                <MovableBoundary
                  pool={movablePool}
                  uid="contribtype"
                  edit={this.state.edit}
                  items={[
                    <>
                      <p className="lead">Contribution Types</p>
                      {platformData &&
                        !platformData.user.settings.showContribDiagram && (
                          <div className="mt-5">
                            <ContribRadar
                              statistic={platformData.statistic}
                              year={this.state.selectedYearIndex}
                            />
                          </div>
                        )}
                    </>,
                    <>
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
                        year={this.state.selectedYearIndex}
                        activity={this.state.activity}
                      />
                    </>,
                  ]}
                  movementAxis="x"
                />
              </div>,
            ]}
            movementAxis="y"
          />
        </ErrorBoundary>
      </>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  fetchedPerson: state.person.fetchedPerson,
});

const mapDispatchToProps = (dispatch) => {
  return {
    writeCache: (platformData) => dispatch(platformData),
  };
};
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(OverviewTab);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
