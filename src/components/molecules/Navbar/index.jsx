//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
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

//> Images
import SNEKLogo from "../../../assets/navigation/logo.png";
//> CSS
import "./navbar.scss";
//#endregion

//#region > Components
/**
 * @class The navbar for all pages. Contains a login button and a profile menu
 *        depending on whether you are logged in or not.
 */
class Navbar extends React.Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { globalState, globalFunctions, location } = this.props;

    return (
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
                <a href={"/u/" + globalState.loggedUser?.username}>
                  <MDBNavbarBrand className="flex-center">
                    <img
                      src={SNEKLogo}
                      alt="SNEK Logo"
                      className="img-fluid mr-2"
                    />
                    <span className="font-weight-bold">SNEK</span>
                  </MDBNavbarBrand>
                </a>
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
              <MDBNavItem>{/* SEARCH */}</MDBNavItem>
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
                      color="green"
                      size="md"
                      onClick={globalFunctions.login}
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
export default withRouter(Navbar);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
