//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBRow, MDBCol, MDBAlert, MDBBtn, MDBIcon } from "mdbreact";

//> Components
import { RegisterForm, LoginForm } from "../forms";
//> Images
import { ReactComponent as SvgSoftware } from "../../../assets/header/dev.svg";
import { ReactComponent as SvgMedia } from "../../../assets/header/media.svg";
//> Style sheet
import "./useractioncard.scss";
//#endregion

//#region > Components
/**
 * @class A user action card component which contains the login and registration
 *        form component.
 */
class UserActionCard extends React.Component {
  state = {
    activeItem: this.props.activeIndex,
  };

  goTo = (item) => {
    this.setState({
      activeItem: item,
    });
  };

  setActiveItem = (activeItem) => {
    this.setState({
      activeItem,
    });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <div className="text-center" id="useractionscard">
        {activeItem === 0 && (
          <>
            <MDBBtn color="green" onClick={() => this.setActiveItem(1)}>
              <MDBIcon icon="sign-in-alt" />
              Login to SNEK
            </MDBBtn>
            <div className="w-100">
              <div className="splitter mt-3 mb-2">
                <span className="or">
                  <span className="or-text">or</span>
                </span>
              </div>
            </div>
            <p className="mb-0 lead">Sign up</p>
            <p className="text-muted mb-3 small">
              Join the biggest network for engineers today!
            </p>
            <RegisterForm />
          </>
        )}
        {activeItem === 1 && <LoginForm goTo={this.goTo} />}
      </div>
    );
  }
}
//#endregion

//#region > Exports
//> Default Component
export default UserActionCard;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
