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
  MDBListGroup,
  MDBListGroupItem,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Components
import { AIContribCalendar } from "../../../../atoms";
//#endregion

//#region > Components
/** @class Custom input */
class UserModal extends React.Component {
  state = { user: undefined };

  componentDidMount = () => {
    this.setState({
      user: this.props.user,
    });
  };

  componentDidUpdate = () => {
    if (
      (this.props.user && !this.state.user) ||
      (this.state.user && this.state.user.username !== this.props.handle)
    ) {
      this.setState({
        user: this.props.user,
      });
    }
  };

  render() {
    const { user } = this.state;

    return (
      <MDBModal isOpen={true} toggle={this.props.toggle} size="lg">
        <MDBModalBody>
          {user ? (
            <div>
              <MDBRow>
                <MDBCol lg="4">
                  <p className="lead font-weight-bold">User info</p>
                  <MDBCard className="border">
                    <MDBCardBody>
                      <p className="lead font-weight-bold mb-1">{user.name}</p>
                      <p className="text-muted small">
                        <span>{user.username}</span>
                      </p>
                    </MDBCardBody>
                  </MDBCard>
                  <p className="lead font-weight-bold mt-4">Code statistics</p>
                  <MDBCard className="border">
                    <MDBCardBody>
                      {user.codelanguages && user.codelanguages.length > 0 ? (
                        <div>
                          {user.codelanguages.map((language, i) => {
                            return (
                              <small
                                className={
                                  user.codelanguages.length === i + 1
                                    ? "text-left text-muted d-block py-1"
                                    : "text-left text-muted d-block py-1 border-bottom"
                                }
                                key={i}
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <MDBIcon
                                      icon="square"
                                      className="pr-1"
                                      style={{
                                        color: language.color,
                                      }}
                                    />
                                    <span>{language.name}</span>
                                  </div>
                                  <span className="small text-right">
                                    <span className="d-block">
                                      {language.insertions}
                                      <MDBIcon
                                        icon="plus"
                                        size="sm"
                                        className="text-success pl-1"
                                      />
                                    </span>
                                    <span className="d-block">
                                      {language.deletions}
                                      <MDBIcon
                                        icon="minus"
                                        size="sm"
                                        className="text-danger pl-1"
                                      />
                                    </span>
                                  </span>
                                </div>
                              </small>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center p-3">
                          <span className="d-block small text-muted">
                            No information yet.
                          </span>
                        </div>
                      )}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                  <p className="lead font-weight-bold">Contributions</p>
                  <MDBCard className="border">
                    <MDBCardBody>
                      <div className="text-right">
                        {user.mergedContributionFeed &&
                          user.mergedContributionFeed.years.map((year, y) => {
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
                        {user.mergedContributionFeed &&
                          user.mergedContributionFeed.years.length > 0 && (
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
                      {user.mergedContributionFeed &&
                      user.mergedContributionFeed.years.length > 0 ? (
                        <AIContribCalendar
                          platformData={user.mergedContributionFeed}
                          year={this.state.selectedYearIndex}
                        />
                      ) : (
                        <div className="text-center p-3">
                          <span className="d-block small text-muted">
                            No statistics yet.
                          </span>
                        </div>
                      )}
                    </MDBCardBody>
                  </MDBCard>
                  <div className="activity">
                    <p className="lead font-weight-bold">Activity</p>
                    <MDBCard className="border">
                      {user.contributionFeed &&
                      user.contributionFeed.length > 0 ? (
                        <MDBListGroup>
                          {user.contributionFeed.map((contrib, i) => {
                            return (
                              <MDBListGroupItem>
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
                            No activities yet.
                          </span>
                        </div>
                      )}
                    </MDBCard>
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : (
            <div>
              <p>No user</p>
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
export default UserModal;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
