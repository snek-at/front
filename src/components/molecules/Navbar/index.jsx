//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React, { lazy, Suspense } from "react";
// DOM bindings for React Router
import { Link, withRouter, NavLink } from "react-router-dom";
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
import { connect } from "react-redux";
import { logoutAction } from "../../../store/actions/authActions";
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
    const { location, loggedUser } = this.props;
    console.log(this.props);
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
              {!loggedUser.anonymous ? (
                <Link to={"/u/" + loggedUser?.username}>
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
                <SearchBar />
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              {!loggedUser.anonymous ? (
                <>
                  <div className="spacer" />
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <img
                          src={loggedUser.avatarUrl}
                          className="z-depth-0"
                          alt={loggedUser.username}
                        />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <Link
                          to={"/u/" + loggedUser.username}
                          className="dropdown-item"
                        >
                          My profile
                        </Link>
                        <Link to="/settings" className="dropdown-item">
                          Settings
                        </Link>
                        <Link
                          to="/"
                          onClick={this.props.logout}
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
                    <Link
                      to={{
                        pathname: "/",
                        state: {
                          actionCard: 1,
                        },
                      }}
                    >
                      <MDBBtn color="green" size="md">
                        Sign In
                      </MDBBtn>
                    </Link>
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
// is it required to write down all stuff in map...toProps??
Navbar.propTypes = {
  location: PropTypes.object,
};
//#endregion

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

//#region > Exports
//> Default Class
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
