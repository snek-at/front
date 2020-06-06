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
  MDBRow,
  MDBCol,
  MDBAlert,
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
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
  MDBListGroup,
  MDBListGroupItem,
} from "mdbreact";

//> Components
import { RegisterForm, LoginForm } from "../forms";

//> Images
import { ReactComponent as SvgSoftware } from "../../../assets/header/dev.svg";
import { ReactComponent as SvgMedia } from "../../../assets/header/media.svg";

//> CSS
import "./useractioncard.scss";
//#endregion

//#region > Components
class UserActionCard extends React.Component {
  state = {
    activeItem: 0,
  };

  goTo = (item) => {
    this.setState({
      activeItem: item,
    });
  };

  render() {
    const { globalState, globalFunctions } = this.props;
    const { activeItem } = this.state;

    return (
      <div className="text-center" id="useractionscard">
        {activeItem === 0 && (
          <>
            <MDBBtn
              color="green"
              onClick={() => this.setState({ activeItem: 1 })}
            >
              Login to SNEK
            </MDBBtn>
            <div className="w-100">
              <div className="splitter my-4">
                <span className="or">
                  <span className="or-text">or</span>
                </span>
              </div>
            </div>
            <h2 className="mb-0">Choose your snek</h2>
            <p className="text-muted mb-3">What is your main profession?</p>
            <MDBRow>
              <MDBCol md="6">
                <div
                  className="selectType"
                  onClick={() => this.setState({ activeItem: 2 })}
                >
                  <p className="lead">Software Engineer</p>
                  <SvgSoftware />
                </div>
              </MDBCol>
              <MDBCol md="6">
                <div
                  className="selectType"
                  onClick={() => this.setState({ activeItem: 3 })}
                >
                  <p className="lead">Media Engineer</p>
                  <SvgMedia />
                </div>
              </MDBCol>
            </MDBRow>
          </>
        )}
        {activeItem === 1 && (
          <LoginForm globalFunctions={globalFunctions} goTo={this.goTo} />
        )}
        {activeItem === 2 && (
          <RegisterForm globalFunctions={globalFunctions} goTo={this.goTo} />
        )}
        {activeItem === 3 && (
          <>
            <div className="text-left mb-4">
              <small
                className="text-muted clickable"
                onClick={() => this.goTo(0)}
              >
                <MDBIcon icon="angle-left" className="mr-1" />
                Back
              </small>
            </div>
            <MDBAlert color="info">
              <p className="mb-2">
                <MDBIcon icon="question" className="mr-2" />
                Media Engineer profiles are not yet supported
              </p>
              <MDBBtn color="white" onClick={() => this.goTo(2)}>
                Create Software Engineer profile
              </MDBBtn>
            </MDBAlert>
          </>
        )}
      </div>
    );
  }
}
//#endregion

//#region > PropTypes
UserActionCard.propTypes = {
  globalState: PropTypes.object,
  globalFunctions: PropTypes.object,
};
//#endregion

//#region > Exports
export default UserActionCard;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
