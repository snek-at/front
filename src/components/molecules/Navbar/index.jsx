//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { Link, withRouter, NavLink } from "react-router-dom";
// Runtime type checking for React props and similar objects
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
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBSmoothScroll,
  MDBBtn,
  MDBIcon,
} from "mdbreact";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Actions
// Functions to send data from the application to the store
import { logoutAction } from "../../../store/actions/userActions";
//> SearchBar
import { SearchBar } from "../../atoms";
//> Images
import SNEKLogo from "../../../assets/navigation/logo.png";
//> Style sheet
import "./navbar.scss";
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
    const avatarUrl = loggedUser?.person?.avatarImage?.src;

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
              {loggedUser.anonymous === false ? (
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
              {loggedUser.anonymous === false ? (
                <>
                  <Link to={"/u/" + loggedUser.username}>
                    <MDBBtn color="white">
                      <MDBIcon far icon="user-circle" />
                      Profile
                    </MDBBtn>
                  </Link>
                  <div className="spacer" />
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <img
                          src={avatarUrl}
                          className="z-depth-0"
                          alt={loggedUser.username}
                        />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <Link to="/settings" className="dropdown-item">
                          Settings
                        </Link>
                        <Link
                          to=""
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
                      <MDBBtn color="green" outline size="md">
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
Navbar.propTypes = {
  location: PropTypes.object,
};
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  loggedUser: { ...state.user.user },
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
