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
import { AIContribCalendar, AILanguageChart } from "../../../../atoms";
//#endregion

//#region > Components
/** @class Custom input */
class UserModal extends React.Component {
  state = { user: undefined };

  componentDidMount = () => {
    this.props.getUserByHandle(this.props.handle);
  };

  componentWillUnmount = () => {
    this.props.clearSelection();
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

    console.log("USER", user);

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
                        <p>{user.username}</p>
                      </p>
                    </MDBCardBody>
                  </MDBCard>
                  <p className="lead font-weight-bold mt-4">Code statistics</p>
                  <MDBCard className="border">
                    <MDBCardBody>
                      <AILanguageChart
                        languages={[
                          {
                            color: "rgb(241, 224, 90)",
                            share: 40,
                          },
                          {
                            color: "rgb(299, 150, 90)",
                            share: 60,
                          },
                        ]}
                      />
                      <div className="px-1">
                        <hr />
                        {[
                          {
                            color: "rgb(241, 224, 90)",
                            share: 40,
                            name: "JavaScript",
                          },
                          {
                            color: "rgb(299, 150, 90)",
                            share: 60,
                            name: "FooScript",
                          },
                        ].map((language, i) => {
                          return (
                            <small
                              className="text-left text-muted d-block"
                              key={i}
                            >
                              <div className="d-flex justify-content-between">
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
                                <span className="text-muted small">
                                  {language.share}%
                                </span>
                              </div>
                            </small>
                          );
                        })}
                      </div>
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
                      </div>
                      <AIContribCalendar
                        platformData={user.mergedContributionFeed}
                        year={this.state.selectedYearIndex}
                      />
                    </MDBCardBody>
                  </MDBCard>
                  <div className="activity">
                    <p className="lead font-weight-bold">Activity</p>
                    <MDBCard className="border">
                      <MDBListGroup>
                        {user.contributionFeed &&
                          user.contributionFeed.map((contrib, i) => {
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
