//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Runtime type checking for React props and similar objects
import PropTypes from "prop-types";
//> Additional
// Text animations
import TextLoop from "react-text-loop";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBSelect,
  MDBProgress,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
  MDBListGroup,
  MDBListGroupItem,
} from "mdbreact";
//> OAuth
import GitHubOAuth from "reactjs-oauth";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Actions
// Functions to send data from the application to the store
// import { registerAction } from "../../../../store/actions/userActions";
// import { fetchGitLabServersAction } from "../../../../store/actions/generalActions";
// import { loginAction } from "../../../../store/actions/authActions";
//#endregion

//#region > Components
/**
 * @class A registration form component. Contains all fields required for
 *        registration including OAuth and a selectable list of GitLab servers.
 */
class RegisterForm extends React.Component {
  state = {
    loading: false,
    firstname: "",
    lastname: "",
    email: "",
    password1: "",
    password2: "",
    promoCode: true,
  };

  testForError = (id) => {
    if (this.state.errors) {
      let rtn = this.state.errors.map((error, i) => {
        if (!Array.isArray(id)) {
          if (error.code === id) {
            return true;
          } else {
            return false;
          }
        } else {
          let innerRtn = id.map((item, ikey) => {
            if (error.code === item) {
              return true;
            } else {
              return false;
            }
          });
          if (innerRtn.includes(true)) {
            return true;
          } else {
            return false;
          }
        }
      });

      if (rtn.includes(true)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  handleChange = (e, id) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => this.removeError(id)
    );
  };

  handleChangeManual = (name, value, id) => {
    this.setState(
      {
        [name]: value,
      },
      () => this.removeError(id)
    );
  };

  removeError = (id) => {
    // Preset errors to local variable
    let errors = this.state.errors;

    if (errors) {
      if (!Array.isArray(id)) {
        errors = errors.filter(function (obj) {
          return obj.code !== id;
        });
      } else {
        id.map((item) => {
          errors = errors.filter(function (obj) {
            return obj.code !== item;
          });
        });
      }

      this.setState({
        errors,
      });
    }
  };

  render() {
    const { goTo } = this.props;

    return (
      <>
        <form className="text-left">
          <span className="text-muted small">Username</span>
          <input
            type="text"
            className={
              this.testForError(5)
                ? "form-control error mb-2"
                : "form-control mb-2"
            }
            name="username"
            onChange={(e) => this.handleChange(e, 5)}
            value={this.state.username}
          />
          <MDBRow className="mb-2">
            <MDBCol md="6">
              <span className="text-muted small">Firstname</span>
              <input
                type="text"
                className={
                  this.testForError(3) ? "form-control error" : "form-control"
                }
                name="firstname"
                onChange={(e) => this.handleChange(e, 3)}
                value={this.state.firstname}
              />
            </MDBCol>
            <MDBCol md="6">
              <span className="text-muted small">Lastname</span>
              <input
                type="text"
                className={
                  this.testForError(4) ? "form-control error" : "form-control"
                }
                name="lastname"
                onChange={(e) => this.handleChange(e, 4)}
                value={this.state.lastname}
              />
            </MDBCol>
          </MDBRow>
          <span className="text-muted small">E-Mail</span>
          <input
            type="email"
            className={
              this.testForError(5)
                ? "form-control mb-2 error"
                : "form-control mb-2"
            }
            name="email"
            onChange={(e) => this.handleChange(e, 5)}
            value={this.state.email}
          />
          <MDBRow>
            <MDBCol md="6">
              <span className="text-muted small">Password</span>
              <input
                type="password"
                className={
                  this.testForError([7, 1])
                    ? "form-control error"
                    : "form-control"
                }
                name="password1"
                onChange={(e) => this.handleChange(e, [7, 1])}
                value={this.state.password1}
              />
            </MDBCol>
            <MDBCol md="6">
              <span className="text-muted small">Confirm password</span>
              <input
                type="password"
                className={
                  this.testForError([8, 1])
                    ? "form-control error"
                    : "form-control"
                }
                name="password2"
                onChange={(e) => this.handleChange(e, [8, 1])}
                value={this.state.password2}
              />
            </MDBCol>
          </MDBRow>
        </form>
        <div className="text-left mt-2">
          <small
            className="blue-text clickable text-md"
            onClick={() => this.setState({ promoCode: !this.state.promoCode })}
          >
            {!this.state.promoCode
              ? "I have a promo code"
              : "I don't have a promo code"}
          </small>
        </div>
        {this.state.promoCode && (
          <input
            value={this.state.code}
            className={
              this.testForError([9, 1])
                ? "form-control mb-3 error"
                : "form-control mb-3"
            }
            spellCheck="false"
            autoComplete="autocomplete_off_874548537585743884357"
            onChange={this.handleCodeChange}
            type="text"
            id="materialFormRegisterConfirmEx40"
            name="code"
            placeholder="XXXX-XXXX-XXXX"
            label="Promotional code"
          />
        )}
        <MDBBtn
          color="green"
          className="mb-0"
          onClick={this.handleSubmit}
          size="lg"
          /*disabled={!this.state.hasGitHub}*/
        >
          <MDBIcon icon="angle-right" />
          Join now
        </MDBBtn>
      </>
    );
  }
}
//#endregion

//#region > PropTypes
RegisterForm.propTypes = {
  goto: PropTypes.func,
};
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  registrationHistory: state.user.registrationHistory,
  gitlabServers: state.general.allGitlabServers,
});

const mapDispatchToProps = (dispatch) => {
  return {
    register: (registrationData) => dispatch((registrationData)),
    login: (user) => dispatch((user)),
    fetchGitLabServers: () => dispatch(),
  };
};
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
