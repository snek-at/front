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
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";
//> Actions
// Functions to send data from the application to the store
import {
  register,
  isValidUsername,
  loginAction,
} from "../../../../store/actions/userActions";
//#endregion

//#region > Components
/**
 * @class A registration form component. Contains all fields required for
 *        registration including OAuth and a selectable list of GitLab servers.
 */
class RegisterForm extends React.Component {
  state = {
    loading: false,
    errors: [],
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password1: "",
    password2: "",
    redemptionCodeValue: "",
    redemptionCode: true,
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

  handleCodeChange = (e) => {
    let code = e.target.value;

    if (code.length <= 14) {
      if (code.length === 4 || code.length === 9) {
        code = code + "-";
      }

      this.setState(
        {
          redemptionCodeValue: code.toUpperCase(),
        },
        () => this.removeError(9)
      );
    } else {
      return false;
    }
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

  handleSubmit = async () => {
    const {
      username,
      firstname,
      lastname,
      email,
      password1,
      password2,
      redemptionCodeValue,
      redemptionCode,
    } = this.state;
    let errors = [];

    // Check if passwords match
    if (password1 !== "" && password2 !== "" && password1 !== password2) {
      errors.push({
        code: 1,
        msg: "Your passwords do not match.",
        weight: 10,
      });
    }

    if (firstname === "") {
      errors.push({
        code: 3,
        msg: "Please enter your first name.",
        weight: 8,
      });
    }

    if (lastname === "") {
      errors.push({
        code: 4,
        msg: "Please enter your last name.",
        weight: 8,
      });
    }

    if (email === "") {
      errors.push({
        code: 5,
        msg: "Please enter your email.",
        weight: 9,
      });
    }

    const isUsernameTaken = !(await this.props.isValidUsername(username));

    if (username === "" || (username && isUsernameTaken)) {
      errors.push({
        code: 6,
        msg: "Please enter a valid username.",
        weight: 10,
      });
    }

    if (password1 === "") {
      errors.push({
        code: 7,
        msg: "Please enter a password.",
        weight: 10,
      });
    }

    if (password2 === "") {
      errors.push({
        code: 8,
        msg: "Please repeat your password.",
        weight: 10,
      });
    }

    if (redemptionCodeValue === "" && redemptionCode) {
      errors.push({
        code: 9,
        msg: "Please enter your promo code or contact us to receive one.",
        weight: 5,
      });
    }

    if (errors.length === 0) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          await this.props.register(
            username,
            firstname,
            lastname,
            email,
            password1,
            redemptionCodeValue ? redemptionCodeValue : "none"
          );

          await this.props.login(username, password1);
        }
      );
    } else {
      this.setState({ errors });
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
              this.testForError(6)
                ? "form-control error mb-2"
                : "form-control mb-2"
            }
            name="username"
            onChange={(e) => this.handleChange(e, 6)}
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
            onClick={() =>
              this.setState({ redemptionCode: !this.state.redemptionCode })
            }
          >
            {!this.state.redemptionCode
              ? "I have a promo code"
              : "I don't have a promo code"}
          </small>
        </div>
        {this.state.redemptionCode && (
          <input
            value={this.state.redemptionCodeValue}
            className={
              this.testForError(9)
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
  test: "",
});

const mapDispatchToProps = (dispatch) => {
  return {
    register: (
      username,
      firstName,
      lastName,
      email,
      password,
      redemptionCode
    ) =>
      dispatch(
        register(username, firstName, lastName, email, password, redemptionCode)
      ),
    login: (username, password) =>
      dispatch(loginAction({ username, password })),
    isValidUsername: (username) => dispatch(isValidUsername(username)),
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
