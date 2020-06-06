//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// React PropTypes
import PropTypes from "prop-types";
//> Additional
// Text animations
import TextLoop from "react-text-loop";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBAlert, MDBBtn, MDBIcon } from "mdbreact";
//#endregion

//#region > Components
/** @class A login form which contains a username and password field */
class LoginForm extends React.Component {
  state = {
    login_username: "",
    login_password: "",
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
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeManual = (name, value, id) => {
    this.setState({
      [name]: value,
    });
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

  login = async (event) => {
    // Prevent page from reloading
    event.preventDefault();
    event.stopPropagation();

    let errors = [];

    if (this.state.login_username === "") {
      errors.push({
        code: 20,
        weight: 10,
      });
    }

    if (this.state.login_password === "") {
      errors.push({
        code: 21,
        weight: 10,
      });
    }

    // Check if there are any errors
    if (errors.length > 0) {
      this.setState({
        errors,
      });
    } else {
      // Proceed to login
      const result = await this.props.globalFunctions.login(
        this.state.login_username,
        this.state.login_password
      );

      //#TSID
      console.log(result);

      if (result) {
        this.setState(
          {
            loginFail: false,
          },
          () => this.props.handleLogin(result)
        );
      } else {
        // Login fail
        this.setState({
          loginFail: true,
        });
      }
    }
  };

  render() {
    const { goTo } = this.props;

    return (
      <>
        <div className="text-left">
          <small className="text-muted clickable" onClick={() => goTo(0)}>
            <MDBIcon icon="angle-left" className="mr-1" />
            Back
          </small>
        </div>
        <p className="lead">Login to SNEK</p>
        {this.state.loginFail && (
          <MDBAlert color="danger" className="mt-3 mb-3">
            Can not perform login. Please check your username and password.
          </MDBAlert>
        )}
        <form onSubmit={this.login}>
          <input
            type="text"
            className={
              this.testForError(20)
                ? "form-control my-2 error"
                : "form-control my-2"
            }
            placeholder="Username"
            name="username"
            onChange={(e) =>
              this.handleChangeManual("login_username", e.target.value, 20)
            }
            value={this.state.login_username}
          />
          <input
            type="password"
            className={
              this.testForError(21)
                ? "form-control my-2 error"
                : "form-control my-2"
            }
            placeholder="Password"
            name="password"
            onChange={(e) =>
              this.handleChangeManual("login_password", e.target.value, 21)
            }
            value={this.state.login_password}
          />
          <MDBBtn color="green" className="mb-0" type="submit">
            Login
            <MDBIcon icon="angle-right" className="pl-1" />
          </MDBBtn>
        </form>
      </>
    );
  }
}
//#endregion

//#region > PropTypes
LoginForm.propTypes = {
  globalFunctions: PropTypes.object,
  goTo: PropTypes.func,
};
//#endregion

//#region > Exports
export default LoginForm;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
