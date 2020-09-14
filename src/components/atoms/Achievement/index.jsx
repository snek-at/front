//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Runtime type checking for React props and similar objects
import PropTypes from "prop-types";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBPopover,
  MDBPopoverHeader,
  MDBPopoverBody,
} from "mdbreact";
//#endregion

//#region > Components
/** @class A component to display an achievement */
class Achievement extends React.Component {
  state = {
    isVisible: false,
  };

  togglePopover = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  render() {
    const { achievement } = this.props;

    return (
      <MDBCol
        md="6"
        onMouseEnter={() => {
          this.togglePopover();
        }}
        onMouseLeave={() => {
          this.togglePopover();
        }}
      >
        <MDBPopover
          popover
          placement="top"
          domElement
          isVisible={this.state.isVisible}
        >
          <li>
            <MDBRow>
              <MDBCol md="6">
                <img src={achievement?.image?.src} />
              </MDBCol>
              <MDBCol md="4">
                <MDBRow>
                  <strong>{achievement.title}</strong>
                </MDBRow>
                <MDBRow>X days ago </MDBRow>
              </MDBCol>
            </MDBRow>
          </li>
          <div>
            <MDBPopoverHeader>{achievement.title}</MDBPopoverHeader>
            <MDBPopoverBody>{achievement.description}</MDBPopoverBody>
          </div>
        </MDBPopover>
      </MDBCol>
    );
  }
}
//#endregion

//#region > Exports
//> Default Component
export default Achievement;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
