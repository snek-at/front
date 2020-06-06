//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

//> Components
import { SoftwareTabs, ProfileInfo } from "../../index";
//#endregion

//#region > Components
class SoftwareEngineer extends React.Component {
  state = {};

  render() {
    return (
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="3">
            <ProfileInfo {...this.props} />
          </MDBCol>
          <MDBCol lg="9">
            <SoftwareTabs {...this.props} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Exports
export default SoftwareEngineer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
