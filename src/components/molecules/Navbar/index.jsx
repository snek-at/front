//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React, { lazy, Suspense } from "react";
// DOM bindings for React Router
import { Link, withRouter } from "react-router-dom";
// React PropTypes
import PropTypes from "prop-types";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBSmoothScroll,
  MDBBtn,
} from "mdbreact";

//> Searchbar
import { SearchBar } from "../../atoms";
//> Images
import SNEKLogo from "../../../assets/navigation/logo.png";
//> CSS
import "./navbar.scss";
//> Components
const Settings = lazy(() => import("../modals/SettingsModal"));
//#endregion

//#region > Components
/**
 * @class The navbar for all pages. Contains a login button, a profile menu
 *        depending on whether you are logged in or not and a search field,
 *        to find other users.
 */
class Navbar extends React.Component {
  state = {
    isOpen: false,
    showSettings: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleSettingsClose = () => {
    if (this.state.showSettings) {
      this.setState({
        showSettings: false,
      });
    }
  };

  render() {
    const { globalState, globalFunctions, location } = this.props;

    return (
      <>
        <MDBNavbar color="light" light expand="md">
          <MDBContainer>
            {location.pathname === "/" ? (
              <MDBSmoothScroll to="home" className="d-inline">
                <MDBNavbarBrand className="flex-center">
                  <img
                    src={SNEKLogo}
                    alt="SNEK Logo"
                    className="img-fluid mr-2"
                  />
                  <span className="font-weight-bold">SNEK</span>
                </MDBNavbarBrand>
              </MDBSmoothScroll>
            ) : (
              <>
                {!globalState.loading && globalState.loggedUser ? (
                  <Link to={"/u/" + globalState.loggedUser?.username}>
                    <MDBNavbarBrand className="flex-center">
                      <img
                        src={SNEKLogo}
                        alt="SNEK Logo"
                        className="img-fluid mr-2"
                      />
                      <span className="font-weight-bold">SNEK</span>
                    </MDBNavbarBrand>
                  </Link>
                ) : (
                  <Link to="/">
                    <MDBNavbarBrand className="flex-center">
                      <img
                        src={SNEKLogo}
                        alt="SNEK Logo"
                        className="img-fluid mr-2"
                      />
                      <span className="font-weight-bold">SNEK</span>
                    </MDBNavbarBrand>
                  </Link>
                )}
              </>
            )}
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                  <SearchBar
                    globalState={globalState}
                    globalFunctions={globalFunctions}
                  />
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                {!globalState.loading && globalState.loggedUser ? (
                  <>
                    <div className="spacer" />
                    <MDBNavItem>
                      <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                          <img
                            src={globalState.loggedUser.avatarUrl}
                            className="z-depth-0"
                            alt={globalState.loggedUser.username}
                          />
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default">
                          <MDBDropdownItem
                            href={"/u/" + globalState.loggedUser.username}
                          >
                            My profile
                          </MDBDropdownItem>
                          <MDBDropdownItem
                            onClick={() =>
                              this.setState({ showSettings: true })
                            }
                          >
                            Settings
                          </MDBDropdownItem>
                          <Link
                            to="/"
                            onClick={globalFunctions.logout}
                            className="dropdown-item"
                          >
                            Sign Out
                          </Link>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </MDBNavItem>
                  </>
                ) : (
                  <>
                    {location.pathname !== "/" && (
                      <MDBBtn
                        href="/"
                        color="green"
                        size="md"
                        onClick={() => {
                          localStorage.setItem("actionCard", 1);
                        }}
                      >
                        Sign In
                      </MDBBtn>
                    )}
                  </>
                )}
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        {this.state.showSettings && (
          <Suspense fallback={<div>Loading...</div>}>
            <Settings
              {...this.props}
              closeModal={this.handleSettingsClose}
              saveSettings={globalFunctions.saveSettings}
            />
          </Suspense>
        )}
      </>
    );
  }
}
//#endregion

//#region > PropTypes
Navbar.propTypes = {
  globalState: PropTypes.object,
  globalFunctions: PropTypes.object,
  location: PropTypes.object,
};
//#endregion

//#region > Exports
//> Default Class
export default withRouter(Navbar);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
