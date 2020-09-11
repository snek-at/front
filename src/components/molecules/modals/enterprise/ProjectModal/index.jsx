//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBModal,
  MDBModalBody,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Components
import { AILineChart } from "../../../../atoms";
//#endregion

//#region > Components
/** @class Custom input */
class ProjectModal extends React.Component {
  state = { project: undefined };

  componentDidMount = () => {
    this.setState({
      project: this.props.project,
    });
  };

  componentDidUpdate = () => {
    if (
      (this.props.project && !this.state.project) ||
      (this.state.project && this.state.project.id !== this.props.id)
    ) {
      this.setState({
        project: this.props.project,
      });
    }
  };

  render() {
    const { project } = this.state;

    return (
      <MDBModal isOpen={true} toggle={this.props.toggle} size="lg">
        <MDBModalBody>
          {project ? (
            <div>
              <MDBRow>
                <MDBCol lg="4">
                  <p className="lead font-weight-bold">Project info</p>
                  <MDBCard className="border">
                    <MDBCardBody>
                      <p className="mb-1">{project.title}</p>
                      <p className="small text-muted">{project.description}</p>
                      <p className="mb-0">Owner</p>
                      <p className="small text-muted">{project.ownerName}</p>
                      {project.url && (
                        <MDBBtn
                          color="elegant"
                          href={project.url}
                          target="_blank"
                          className="ml-0"
                          size="md"
                        >
                          View repository
                        </MDBBtn>
                      )}
                    </MDBCardBody>
                  </MDBCard>
                  <p className="lead font-weight-bold mt-3">Contributors</p>
                  <div className="activity">
                    <MDBCard className="border">
                      {project.contributors &&
                      project.contributors.length > 0 ? (
                        <MDBListGroup>
                          {project.contributors.map((contributor, i) => {
                            return (
                              <MDBListGroupItem key={"project-contrib-" + i}>
                                <p className="mb-0">{contributor.name}</p>
                                <p className="mb-0 small text-muted">
                                  {contributor.username}
                                </p>
                                <p className="blue-text small">
                                  {(
                                    (100 / project.contributionFeed.length) *
                                    contributor.contributionFeed.length
                                  ).toFixed(2)}{" "}
                                  %
                                </p>
                              </MDBListGroupItem>
                            );
                          })}
                        </MDBListGroup>
                      ) : (
                        <div className="text-center p-3">
                          <span className="d-block small text-muted">
                            No contributors yet.
                          </span>
                        </div>
                      )}
                    </MDBCard>
                  </div>
                </MDBCol>
                <MDBCol lg="8" className="activity">
                  <p className="lead font-weight-bold">Activity</p>
                  <div className="text-right">
                    {this.props.chart && this.props.chart.years.length > 0 ? (
                      <>
                        {this.props.chart.years.map((year, y) => {
                          return (
                            <p
                              className={
                                this.state.selectedYearIndex === y
                                  ? "blue-text clickable mx-2 d-inline-block"
                                  : "text-muted clickable mx-2 d-inline-block"
                              }
                              onClick={() =>
                                this.setState({ selectedYearIndex: y })
                              }
                            >
                              {moment(year.endDate).format("YYYY")}
                            </p>
                          );
                        })}
                      </>
                    ) : (
                      <div className="text-center p-3">
                        <span className="d-block small text-muted">
                          No statistics yet.
                        </span>
                      </div>
                    )}
                    {this.props.chart && this.props.chart.years.length > 0 && (
                      <p
                        className={
                          this.state.selectedYearIndex === undefined
                            ? "blue-text clickable mx-2 d-inline-block"
                            : "text-muted clickable mx-2 d-inline-block"
                        }
                        onClick={() =>
                          this.setState({ selectedYearIndex: undefined })
                        }
                      >
                        Current
                      </p>
                    )}
                  </div>
                  {this.props.chart && this.props.chart.years.length > 0 && (
                    <div className="canvas-container-modal">
                      <AILineChart
                        data={this.props.chart}
                        year={this.state.selectedYearIndex}
                        key="overview-chart"
                      />
                    </div>
                  )}
                  <p className="lead font-weight-bold mt-3">History</p>
                  <MDBCard className="border">
                    <MDBCardBody>
                      {project.contributionFeed &&
                      project.contributionFeed.length > 0 ? (
                        <MDBListGroup>
                          {project.contributionFeed.map((contrib, i) => {
                            return (
                              <MDBListGroupItem key={"project-contrib-" + i}>
                                <p className="mb-0">{contrib.message}</p>
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <p className="text-muted small mb-0">
                                      {contrib.type}
                                    </p>
                                  </div>
                                  <p className="text-muted small mb-0">
                                    {moment(contrib.datetime).format(
                                      "DD.MM.YYYY h:mm a"
                                    )}
                                  </p>
                                </div>
                              </MDBListGroupItem>
                            );
                          })}
                        </MDBListGroup>
                      ) : (
                        <div className="text-center p-3">
                          <span className="d-block small text-muted">
                            No history yet.
                          </span>
                        </div>
                      )}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>
          ) : (
            <div>
              <p>No project</p>
            </div>
          )}
        </MDBModalBody>
      </MDBModal>
    );
  }
}
//#endregion

//#region > Exports
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default ProjectModal;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
