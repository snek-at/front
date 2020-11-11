//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Redux
// Allows React components to read data, update data and dispatch actions
// from/to a Redux store.
import { connect } from "react-redux";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBBadge,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBBtn,
  MDBProgress,
  MDBTooltip,
  MDBTabContent,
  MDBTabPane,
  MDBNav,
  MDBNavLink,
  MDBNavItem,
  MDBSpinner,
  MDBModal,
  MDBModalBody,
  MDBAlert,
} from "mdbreact";

//> Actions
// Functions to send data from the application to the store
import {
  getGeneral,
  getProjects,
  getUsers,
} from "../../../store/actions/enterpriseActions";
//> Components
import {
  PageOverview,
  PageProjects,
  PageUsers,
  PageImprint,
} from "../../organisms/tabs/enterprise";
//> CSS
import "./company.scss";

//> Images
// Too be added
//#endregion

//#region > Config
const TAB_ITEMS = [
  {
    name: "Overview",
    icon: "play-circle",
  },
  {
    name: "Projects",
    icon: "dot-circle",
  },
  {
    name: "Users",
    icon: "user-circle",
  },
  {
    name: "Imprint",
    icon: "info-circle",
  },
];
//#endregion

//#region > Components
/** @class This component displays pipelines */
class Page extends React.Component {
  state = {
    activeItem: 0,
  };

  componentDidMount = () => {
    const enterpriseName = this.getUrl();

    if (enterpriseName) {
      this.setState(
        {
          enterpriseName,
        },
        () => this.props.getGeneral(enterpriseName)
      );
    }
  };

  componentDidUpdate = (prevProps) => {
    const enterpriseName = this.getUrl();

    if (prevProps.general !== this.props.general && !this.props.error) {
      this.props.getProjects(enterpriseName);
      this.props.getUsers(enterpriseName);
    }
  };

  // Get enterprise name from URL
  getUrl = () => {
    const { match } = this.props;
    const enterpriseName = match?.params?.name;

    return enterpriseName ? enterpriseName : false;
  };

  // Toogle reauth
  toggleModal = () => {
    this.setState({
      reAuth: false,
    });
  };

  // Toggle the visible tab
  toggle = (e, tab) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
  };

  getGrowth = (growth) => {
    switch (growth) {
      case -2:
        return (
          <MDBIcon icon="angle-double-down" className="red-text clickable" />
        );
      case -1:
        return <MDBIcon icon="angle-down" className="red-text clickable" />;
      case 1:
        return <MDBIcon icon="angle-up" className="green-text clickable" />;
      case 2:
        return (
          <MDBIcon icon="angle-double-up" className="green-text clickable" />
        );
      default:
        return null;
    }
  };

  render() {
    const { error, general, users, projects } = this.props;

    // console.log("PAGE", page);

    // Enterprise data
    // const enterprise = page && page.enterprise;

    return (
      <MDBContainer id="company">
        {general ? (
          <MDBRow>
            <MDBCol lg="12">
              <MDBCard>
                <MDBCardBody>
                  <MDBRow className="d-flex align-items-center">
                    <MDBCol lg="2">
                      <img
                        src={
                          general?.avatarImage?.src
                            ? general.avatarImage.src
                            : ""
                        }
                        alt="No logo"
                        className="img-fluid"
                      />
                    </MDBCol>
                    <MDBCol lg="10">
                      <div className="d-flex justify-content-space-between">
                        <div>
                          <p className="lead font-weight-bold mb-1">
                            {general.name}
                          </p>
                          <p className="text-muted mb-3">
                            {general.description}
                          </p>
                        </div>
                      </div>
                      <div>
                        {general.recruitingUrl && (
                          <a
                            href={general.recruitingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MDBBadge color="indigo">
                              <MDBIcon icon="users" />
                              Recruiting
                            </MDBBadge>
                          </a>
                        )}
                        {general.employeeCount >= 1 &&
                          general.employeeCount < 5 && (
                            <MDBBadge color="primary">1-5 Employees</MDBBadge>
                          )}
                        {general.employeeCount >= 5 &&
                          general.employeeCount < 20 && (
                            <MDBBadge color="primary">5-20 Employees</MDBBadge>
                          )}
                        {general.employeeCount >= 20 &&
                          general.employeeCount < 100 && (
                            <MDBBadge color="primary">
                              20-100 Employees
                            </MDBBadge>
                          )}
                        {general.employeeCount >= 100 && (
                          <MDBBadge color="primary">100+ Employees</MDBBadge>
                        )}
                        {general.opensourceUrl && (
                          <a
                            href={general.opensourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MDBBadge color="elegant-color">
                              <MDBIcon fab icon="github" />
                              Open source
                            </MDBBadge>
                          </a>
                        )}
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="12">
              <MDBNav tabs className="d-flex justify-content-between">
                <div className="d-flex">
                  {TAB_ITEMS.map((tab, t) => {
                    return (
                      <MDBNavItem key={t}>
                        <MDBNavLink
                          link
                          to="#"
                          active={this.state.activeItem === t}
                          onClick={(e) => this.toggle(e, t)}
                          role="tab"
                        >
                          <MDBIcon icon={tab.icon} />
                          {tab.name}
                        </MDBNavLink>
                      </MDBNavItem>
                    );
                  })}
                </div>
                <div>
                  {(this.state.activeItem === 0 ||
                    this.state.activeItem === 1 ||
                    this.state.activeItem === 2) && (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      onChange={(e) =>
                        this.setState({ globalFilter: e.target.value })
                      }
                    />
                  )}
                </div>
              </MDBNav>
              <MDBTabContent
                className="card"
                activeItem={this.state.activeItem}
              >
                {this.state.activeItem === 0 && (
                  <MDBTabPane tabId={0} role="tabpanel">
                    <PageOverview
                      filter={this.state.globalFilter}
                      mergedFeed={
                        general.mergedEnterpriseCodetransitionStatistic
                      }
                      codestats={general.enterpriseCodelanguageStatistic}
                    />
                  </MDBTabPane>
                )}
                {this.state.activeItem === 1 && (
                  <MDBTabPane tabId={1} role="tabpanel">
                    {projects ? (
                      <PageProjects
                        filter={this.state.globalFilter}
                        navigateTo={this.props.navigateTo}
                        projects={projects}
                      />
                    ) : (
                      <h1>Loading</h1>
                    )}
                  </MDBTabPane>
                )}
                {this.state.activeItem === 2 && (
                  <MDBTabPane tabId={2} role="tabpanel">
                    {users ? (
                      <PageUsers
                        filter={this.state.globalFilter}
                        navigateTo={this.props.navigateTo}
                        users={users}
                      />
                    ) : (
                      <h1>Loading</h1>
                    )}
                  </MDBTabPane>
                )}
                {this.state.activeItem === 3 && (
                  <MDBTabPane tabId={3} role="tabpanel">
                    <PageImprint page={general} />
                  </MDBTabPane>
                )}
              </MDBTabContent>
            </MDBCol>
          </MDBRow>
        ) : (
          <>
            {error ? (
              <div className="text-center">
                <MDBIcon
                  icon="times-circle"
                  size="3x"
                  className="text-danger"
                />
                <span className="d-block mt-3 lead">{error.message}</span>
              </div>
            ) : (
              <div className="text-center my-5 py-5">
                <div className="spinner-grow text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </>
        )}
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  general: state.enterprise.page.general,
  projects: state.enterprise.page.projects,
  users: state.enterprise.page.users,
  error: state.enterprise.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getGeneral: (handle) => dispatch(getGeneral(handle)),
    getProjects: (handle) => dispatch(getProjects(handle)),
    getUsers: (handle) => dispatch(getUsers(handle)),
  };
};
//#endregion

//#region > Exports
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Page);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
