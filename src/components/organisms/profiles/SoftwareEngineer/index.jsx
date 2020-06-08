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
/**
 * @class The profile component of a Software Engineer user
 */
class SoftwareEngineer extends React.Component {
  state = {};

  render() {
    const { globalState, globalFunctions } = this.props;

    return (
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="3">
            <ProfileInfo
              globalFunctions={globalFunctions}
              globalState={globalState}
            />
          </MDBCol>
          <MDBCol lg="9">
            <SoftwareTabs
              globalFunctions={globalFunctions}
              globalState={globalState}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Exports
//> Default Class
export default SoftwareEngineer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
