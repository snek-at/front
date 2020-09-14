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
import {
  AIGallery,
  AISongGallery,
  AIVideoGallery,
  PhotoMap,
} from "../../../organisms/sections/media";
import { MovableBoundary } from "../../../molecules";
import { updateSettings } from "../../../../store/actions/personActions";
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
    toggleEdit: false,
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

  handleEditClick = (movablePool) => {
    if (this.state.edit) {
      this.props.saveSettings({ movablePool: JSON.stringify(movablePool) });
    }

    this.setState({ edit: !this.state.edit });
  };

  render() {
    const { fetchedPerson, sameOrigin } = this.props;

    // // Create empty pool if there isn't already one
    // if (!fetchedUser.platformData.user.movablePool) {
    //   fetchedUser.platformData.user.movablePool = {};
    // }

    const {
      currentStatistic,
      yearsStatistic,
      languages,
    } = fetchedPerson.person;

    const {
      displayProgrammingLanguages,
      display2dCalendar,
      display3dCalendar,
      displayContributionTypes,
      displayWeekActivity,
      displayImageGallery,
      displayVideoGallery,
      displayMusicGallery,
      displayMap,
    } = fetchedPerson;
    let platformData = "";

    return (
      <>
        {/* <ErrorBoundary hidden="true"> */}
        <ErrorBoundary>
          {sameOrigin && (
            <div className="text-right">
              {this.state.toggleEdit && (
                <MDBBtn
                  color={this.state.edit ? "success" : "green"}
                  size="md"
                  onClick={() =>
                    this.handleEditClick(fetchedPerson.movablePool)
                  }
                >
                  {this.state.edit ? (
                    <span>
                      <MDBIcon icon="check-circle" />
                      Save
                    </span>
                  ) : (
                    <span>
                      <MDBIcon icon="arrows-alt" />
                      Move items
                    </span>
                  )}
                </MDBBtn>
              )}
              <MDBBtn
                color={this.state.toggleEdit ? "elegant" : "elegant"}
                size="md"
                onClick={() =>
                  this.setState({ toggleEdit: !this.state.toggleEdit })
                }
                disabled={this.state.edit}
              >
                {this.state.toggleEdit ? <span>Done</span> : <span>Edit</span>}
              </MDBBtn>
            </div>
          )}
          <MovableBoundary
            pool={fetchedPerson.movablePool}
            uid="overview"
            edit={this.state.edit}
            items={[
              <>
                {languages && displayProgrammingLanguages && (
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
                          {year.year}
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
                {display3dCalendar && currentStatistic && yearsStatistic && (
                  <Calendar3D
                    currentStatistic={currentStatistic}
                    yearsStatistic={yearsStatistic}
                    year={this.state.selectedYearIndex}
                  />
                )}
              </>,
              <>
                {displayImageGallery && (
                  <AIGallery
                    images={fetchedPerson.metaLinks.filter(
                      (link) =>
                        link.linkType === "PHOTO" ||
                        link.linkType === "INSTAGRAM"
                    )}
                    sameOrigin={sameOrigin && this.state.toggleEdit}
                  />
                )}
              </>,
              <>
                {displayImageGallery && (
                  <AIVideoGallery
                    videos={fetchedPerson.metaLinks.filter(
                      (link) => link.linkType === "YOUTUBE"
                    )}
                    sameOrigin={sameOrigin && this.state.toggleEdit}
                  />
                )}
              </>,
              <>
                {displayImageGallery && (
                  <AISongGallery
                    songs={fetchedPerson.metaLinks.filter(
                      (link) => link.linkType === "SOUNDCLOUD"
                    )}
                    sameOrigin={sameOrigin && this.state.toggleEdit}
                  />
                )}
              </>,
              <>{displayMap && <PhotoMap />}</>,
              <>
                {display2dCalendar && currentStatistic && yearsStatistic && (
                  <Calendar2D
                    currentStatistic={currentStatistic}
                    yearsStatistic={yearsStatistic}
                    year={this.state.selectedYearIndex}
                    selectDay={this.selectDay}
                  />
                )}
              </>,
              <div className="interchange-charts">
                <MovableBoundary
                  pool={fetchedPerson.movablePool}
                  uid="contribtype"
                  edit={this.state.edit}
                  items={[
                    <>
                      {true &&
                        currentStatistic &&
                        yearsStatistic &&
                        displayContributionTypes && (
                          <div className="mt-5">
                            <p className="lead">Contribution Types</p>
                            <ContribRadar
                              currentStatistic={currentStatistic}
                              yearsStatistic={yearsStatistic}
                              year={this.state.selectedYearIndex}
                            />
                          </div>
                        )}
                    </>,
                    <>
                      {currentStatistic &&
                        yearsStatistic &&
                        displayWeekActivity && (
                          <div>
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
                              currentStatistic={currentStatistic}
                              yearsStatistic={yearsStatistic}
                              year={this.state.selectedYearIndex}
                              activity={this.state.activity}
                            />
                          </div>
                        )}
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
    saveSettings: (nextSettings) => dispatch(updateSettings(nextSettings)),
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
