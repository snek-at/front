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
import { writeCacheAction } from "../../../../store/actions/userActions";
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
    selectedYear: undefined,
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

  handleEditClick = (platformData) => {
    if (this.state.edit) {
      this.props.writeCache(platformData);
    }

    this.setState({ edit: !this.state.edit });
  };

  render() {
    const { fetchedUser, sameOrigin } = this.props;
    const platformData = fetchedUser.platformData;

    // Create empty pool if there isn't already one
    if (!fetchedUser.platformData.user.movablePool) {
      fetchedUser.platformData.user.movablePool = {};
    }

    const movablePool = fetchedUser.platformData.user.movablePool;

    return (
      <>
        {/* <ErrorBoundary hidden="true"> */}
        <ErrorBoundary>
          {sameOrigin && (
            <div className="text-right">
              <MDBBtn
                color={this.state.edit ? "success" : "green"}
                size="md"
                onClick={() => this.handleEditClick(platformData)}
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
                {platformData && (
                  <MDBRow className="text-center text-md-left mb-4">
                    {platformData.statistic.languages.map((language, i) => {
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
                            onClick={() =>
                              this.setState({ selectedYear: year.year })
                            }
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
                        onClick={() =>
                          this.setState({ selectedYear: undefined })
                        }
                      >
                        Current
                      </MDBBtn>
                    </div>
                  )}
              </>,
              <>
                {platformData && platformData.user.settings.show3DDiagram && (
                  <Calendar3D
                    platformData={platformData}
                    year={this.state.selectedYear}
                  />
                )}
              </>,
              <>
                {platformData && platformData.user.settings.show2DDiagram && (
                  <Calendar2D
                    platformData={platformData}
                    year={this.state.selectedYear}
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
                              year={this.state.selectedYear}
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
                        year={this.state.selectedYear}
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

//#region > PropTypes
OverviewTab.propTypes = {
  platformData: PropTypes.object.isRequired,
};
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  fetchedUser: state.user.fetchedUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    writeCache: (platformData) => dispatch(writeCacheAction(platformData)),
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
