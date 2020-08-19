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
import { getPageByHandle } from "../../../../store/actions/pageActions";
//> Components
import {
  PageOverview,
  PageProjects,
  PageUsers,
  PageImprint,
} from "../../organisms/tabs/enterprise";
//> CSS
import "./.scss";
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
    activeItem: localStorage.getItem(this.props.handle + "-tab")
      ? parseInt(localStorage.getItem(this.props.handle + "-tab"))
      : 0,
  };

  componentDidMount = () => {
    // Retrieve Page
    this.props.getPageByHandle(this.props.handle);
  };

  componentDidUpdate = () => {
    // Check if there are no current pipelines set
    if (this.props.page && !this.state.page) {
      this.setState({
        page: this.props.page,
      });
    }

    if (JSON.stringify(this.props.page) !== JSON.stringify(this.state.page)) {
      this.setState({
        page: this.props.page,
      });
    }
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
      this.setState(
        {
          activeItem: tab,
        },
        () => localStorage.setItem(this.props.handle + "-tab", tab)
      );
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
    const { page } = this.state;

    console.log("PAGE", page);

    return (
      <MDBContainer id="company">
        {page ? (
          <MDBRow>
            <MDBCol lg="12">
              <MDBCard>
                <MDBCardBody>
                  <div className="d-flex justify-content-space-between">
                    <div>
                      <p className="lead mb-1">
                        <strong>You decide what you share.</strong>
                      </p>
                      <p className="text-muted small mb-2">
                        Security is one of our highest priorities. No
                        information you do not explicitly share, will leave your
                        network.
                      </p>
                    </div>
                    <div>
                      {/*<MDBBtn color="indigo" outline>
                        <MDBIcon icon="eye" />
                        View as public
                      </MDBBtn>*/}
                      <MDBBtn
                        color="indigo"
                        onClick={() => this.props.navigateTo("connectors")}
                      >
                        <MDBIcon icon="key" />
                        Edit
                      </MDBBtn>
                    </div>
                  </div>
                  <div className="position-relative">
                    <div className="mt-2">
                      <p className="mb-0">Restrictions</p>
                    </div>
                    <MDBRow>
                      <MDBCol
                        lg="3"
                        className={
                          page.restrictionLevel !== 1 ? "disabled" : undefined
                        }
                      >
                        <MDBProgress
                          value={100}
                          color="danger"
                          className="my-2"
                        />
                        <p className="mb-0">Heavy</p>
                        <p className="text-muted small mb-0">
                          No information published.
                        </p>
                      </MDBCol>
                      <MDBCol
                        lg="3"
                        className={
                          page.restrictionLevel !== 2 ? "disabled" : undefined
                        }
                      >
                        <MDBProgress
                          value={100}
                          color="warning"
                          className="my-2"
                        />
                        <p className="mb-0">Moderate</p>
                        <p className="text-muted small mb-0">
                          Little information published.
                        </p>
                      </MDBCol>
                      <MDBCol
                        lg="3"
                        className={
                          page.restrictionLevel !== 3 ? "disabled" : undefined
                        }
                      >
                        <MDBProgress
                          value={100}
                          color="info"
                          className="my-2"
                        />
                        <p className="mb-0">Light</p>
                        <p className="text-muted small mb-0">
                          All non-confidential information published.
                        </p>
                      </MDBCol>
                      <MDBCol
                        lg="3"
                        className={
                          page.restrictionLevel !== 4 ? "disabled" : undefined
                        }
                      >
                        <MDBProgress
                          value={100}
                          color="success"
                          className="my-2"
                        />
                        <p className="mb-0">Open</p>
                        <p className="text-muted small mb-0">
                          All information published.
                        </p>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
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
                            {page.company.name}
                          </p>
                          <p className="text-muted mb-3">
                            {page.company.description}
                          </p>
                        </div>
                        <div className="d-flex">
                          <MDBBtn
                            color="green"
                            size="md"
                            onClick={() => this.setState({ reAuth: true })}
                          >
                            Publish
                          </MDBBtn>
                        </div>
                      </div>
                      <div>
                        {page.company.isRecruiting && (
                          <MDBBadge color="indigo">
                            <MDBIcon icon="users" />
                            Recruiting
                          </MDBBadge>
                        )}
                        {page.company.employees >= 1 &&
                          page.company.employees < 5 && (
                            <MDBBadge color="primary">1-5 Employees</MDBBadge>
                          )}
                        {page.company.employees >= 5 &&
                          page.company.employees < 20 && (
                            <MDBBadge color="primary">5-20 Employees</MDBBadge>
                          )}
                        {page.company.employees >= 20 &&
                          page.company.employees < 100 && (
                            <MDBBadge color="primary">
                              20-100 Employees
                            </MDBBadge>
                          )}
                        {page.company.employees >= 100 && (
                          <MDBBadge color="primary">100+ Employees</MDBBadge>
                        )}
                        {page.company.isOpenSource && (
                          <a
                            href={page.company.openSourceUrl}
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
                      feed={page.company?.enterpriseContributionFeed}
                      mergedFeed={
                        page.company?.mergedEnterpriseContributionFeed
                      }
                    />
                  </MDBTabPane>
                )}
                {this.state.activeItem === 1 && (
                  <MDBTabPane tabId={1} role="tabpanel">
                    <PageProjects
                      filter={this.state.globalFilter}
                      navigateTo={this.props.navigateTo}
                    />
                  </MDBTabPane>
                )}
                {this.state.activeItem === 2 && (
                  <MDBTabPane tabId={2} role="tabpanel">
                    <PageUsers
                      filter={this.state.globalFilter}
                      navigateTo={this.props.navigateTo}
                    />
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
          <div className="flex-center">
            <MDBSpinner />
          </div>
        )}
        {this.state.reAuth && (
          <MDBModal isOpen={true} toggle={this.toggleModal} size="sm">
            <MDBModalBody>
              <p>To continue, type an administrator password.</p>
              {this.state.reAuthError && (
                <MDBAlert color="danger">
                  The password you have entered is wrong.
                </MDBAlert>
              )}
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <MDBBtn
                color="elegant"
                size="md"
                onClick={async () => {
                  const result = await this.props.authenticate(
                    this.state.password
                  );

                  if (result) {
                    this.setState({ reAuth: false }, () =>
                      this.props.publishPage(page.company.connectorHandle)
                    );
                  } else {
                    this.setState({ reAuthError: true });
                  }
                }}
              >
                Authenticate
              </MDBBtn>
            </MDBModalBody>
          </MDBModal>
        )}
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  page: state.pages.page,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPageByHandle: (handle) => dispatch(getPageByHandle(handle)),
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
