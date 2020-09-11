//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBAvatar,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBSpinner,
  MDBBtn,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";
// Fake data generator
import faker from "faker";

//> Components
import { UserModal } from "../../../../molecules/modals/enterprise";
import { AIBarChart, AILineChart } from "../../../../atoms";
//> CSS
import "./pageusers.scss";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays page overview of the page section */
class PageUsers extends React.Component {
  state = { users: null, modal: false, chartType: "line" };

  componentDidMount = () => {
    this.setState({
      users: this.props.users,
    });
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.users && !this.state.users) {
      this.setState({
        users: this.props.users,
      });
    }

    if (this.props.filter !== prevProps.filter) {
      this.filter(this.props.filter);
    }
  };

  unifyString = (str) => {
    if (str) {
      return str.toLowerCase().trim();
    } else {
      return "";
    }
  };

  filter = (value) => {
    // Retrieve all pipelines
    const { users } = this.props;
    // Unify value
    const val = this.unifyString(value);

    // Searches for search value in title, domain and org
    let results = users.filter((user) => {
      if (
        this.unifyString(user.name).includes(val) ||
        this.unifyString(user.username).includes(val)
      ) {
        return user;
      }
    });

    this.setState({ users: results });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      handle: undefined,
    });
  };

  render() {
    const { users } = this.state;

    return (
      <div id="pageusers">
        <div className="d-flex justify-content-between">
          <div className="mt-3">
            <p className="lead font-weight-bold mb-0">User Overview</p>
            <p className="text-muted small">
              <MDBIcon icon="question-circle" className="mr-2" />
              All enterprise users.
            </p>
          </div>
          <div>
            <MDBBtn
              color={this.state.chartType === "line" ? "green" : "elegant"}
              size="sm"
              onClick={() => this.setState({ chartType: "line" })}
            >
              Commits
            </MDBBtn>
            <MDBBtn
              color={this.state.chartType === "bar" ? "green" : "elegant"}
              size="sm"
              onClick={() => this.setState({ chartType: "bar" })}
            >
              Lines
            </MDBBtn>
          </div>
        </div>
        <MDBListGroup>
          {users ? (
            users.map((user, p) => {
              const seed = parseInt(user.hash ? user.hash : user.username, 36);

              faker.seed(seed);
              user.anonym = true;

              if (user.anonym) {
                if (!user.hash) {
                  user.hash = user.username;
                }

                user.username = faker.internet.userName();

                user.avatar = faker.internet.avatar();
                user.name = faker.name.findName();
              }

              return (
                <>
                  {user ? (
                    <MDBListGroupItem
                      className="d-flex justify-content-between align-items-center clickable"
                      onClick={() =>
                        this.setState({
                          modal: true,
                          handle: user.username,
                          user,
                        })
                      }
                      key={p}
                    >
                      <div className="d-flex align-items-center">
                        <MDBAvatar className="white mr-2">
                          <img
                            src={
                              user.avatar
                                ? user.avatar
                                : "https://octodex.github.com/images/nyantocat.gif"
                            }
                            alt={user.name}
                            className="rounded-circle img-fluid"
                          />
                        </MDBAvatar>
                        <div className="d-inline">
                          <p className="mb-0">
                            <small>
                              <span class="badge badge-success">Anonym</span>
                            </small>
                            {user.name}
                          </p>
                          <p className="small text-muted mb-0">
                            {user.username}
                          </p>
                        </div>
                      </div>
                      <div className="canvas-container">
                        {this.state.chartType === "line" ? (
                          <AILineChart
                            data={user.mergedContributionFeed}
                            key={"project-chart-" + p}
                          />
                        ) : (
                          <AIBarChart
                            data={user.mergedCodetransition}
                            key={"project-chart-bar-" + p}
                          />
                        )}
                      </div>
                    </MDBListGroupItem>
                  ) : null}
                </>
              );
            })
          ) : (
            <div className="flex-center">
              <MDBSpinner />
            </div>
          )}
        </MDBListGroup>
        {this.state.modal && this.props.users && this.state.handle && (
          <UserModal
            toggle={this.toggle}
            users={this.props.users}
            user={this.state.user}
            handle={this.state.handle}
          />
        )}
      </div>
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
export default PageUsers;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
