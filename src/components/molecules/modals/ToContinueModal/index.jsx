//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { Link } from "react-router-dom";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBModal, MDBIcon, MDBModalBody, MDBBtn } from "mdbreact";

//> Stylesheet
import "./tocontinue.scss";
//#endregion

//#region > Components
/** @class A modal that shows if a login is required to continue an action */
class ToContinueModal extends React.Component {
  render() {
    return (
      <MDBModal
        modalStyle="white"
        className="text-dark"
        size="lg"
        id="continue"
        backdrop={true}
        isOpen={true}
        toggle={this.props.closeModal}
      >
        <MDBModalBody className="text-center">
          <img
            src={this.props.fetchedPerson.avatarImage.src}
            alt={"Avatar of " + this.props.fetchedPerson.slug.substring(2)}
            className="img-fluid"
          />
          <div className="font-weight-normal">
            Create a new SNEK account or login to SNEK, to continue.
          </div>
          <Link
            to={{
              pathname: "/",
              state: {
                actionCard: 1,
              },
            }}
          >
            <MDBBtn color="green" outline className="mb-0">
              Login
              <MDBIcon icon="angle-right" className="pl-1" />
            </MDBBtn>
          </Link>
          <Link
            to={{
              pathname: "/",
              state: {
                actionCard: 0,
              },
            }}
          >
            <MDBBtn color="primary" outline className="mb-0">
              Create new account
              <MDBIcon icon="angle-right" className="pl-1" />
            </MDBBtn>
          </Link>
        </MDBModalBody>
      </MDBModal>
    );
  }
}
//#endregion

//#region > Exports
//> Default Component
export default ToContinueModal;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
