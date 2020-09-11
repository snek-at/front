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
    // Retrieve Page
    // this.props.getGeneral("schettn");
    const { match } = this.props;
    const enterpriseName = match?.params?.name;

    if (enterpriseName) {
      this.props.getGeneral(enterpriseName);
    }
  };

  componentDidUpdate = () => {
    // Check if there are no current pipelines set
    // if (this.props.page && !this.state.page) {
    //   this.setState({/
    //     page: this.props.page.data,
    //   });
    // }
    /*if (JSON.stringify(this.props.page) !== JSON.stringify(this.state.page)) {
      this.setState({
        page: this.props.page.data,
      });
    }*/
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
    const { general, users, projects } = this.props;

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
                        src="https://www.htl-villach.at/typo3conf/ext/htl_villach/Resources/Public/Images/htl_logo_box.svg"
                        alt="Company logo"
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
                        {/* {general.company.isRecruiting && (
                          <MDBBadge color="indigo">
                            <MDBIcon icon="users" />
                            Recruiting
                          </MDBBadge>
                        )}
                        {enterprise.company.employees >= 1 &&
                          enterprise.company.employees < 5 && (
                            <MDBBadge color="primary">1-5 Employees</MDBBadge>
                          )}
                        {enterprise.company.employees >= 5 &&
                          enterprise.company.employees < 20 && (
                            <MDBBadge color="primary">5-20 Employees</MDBBadge>
                          )}
                        {enterprise.company.employees >= 20 &&
                          enterprise.company.employees < 100 && (
                            <MDBBadge color="primary">
                              20-100 Employees
                            </MDBBadge>
                          )}
                        {enterprise.company.employees >= 100 && (
                          <MDBBadge color="primary">100+ Employees</MDBBadge>
                        )}
                        {enterprise.company.isOpenSource && (
                          <a
                            href={enterprise.company.openSourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MDBBadge color="elegant-color">
                              <MDBIcon fab icon="github" />
                              Open source
                            </MDBBadge>
                          </a>
                        )} */}
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
                      feed={general.enterpriseContributionFeed}
                      mergedFeed={general.mergedEnterpriseContributionFeed}
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
                    <PageImprint />
                  </MDBTabPane>
                )}
              </MDBTabContent>
            </MDBCol>
          </MDBRow>
        ) : (
          <div className="text-center my-5 py-5">
            <div className="spinner-grow text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    getGeneral: (handle) => dispatch(getGeneral(handle)),
    // getProjects: (handle) => dispatch(getProjects(handle)),
    // getUsers: (handle) => dispatch(getUsers(handle)),
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
