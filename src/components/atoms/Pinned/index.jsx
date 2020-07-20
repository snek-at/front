//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Runtime type checking for React props and similar objects
import PropTypes from "prop-types";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";

//> Style sheet
import "./pinned.scss";
//#endregion

//#region > Components
/**
 * @class A component which contains a single pinned item for the Overview tab
 */
class Pinned extends React.Component {
  render() {
    const { category, link, pinned } = this.props;

    return (
      <MDBCol md="4" className="pinned-item">
        <MDBCard>
          <div className={`text-center pinned-header ${category?.color}`} />
          <MDBCardBody>
            <div className="text-center mt-2">
              <p className="text-muted">{pinned?.description}</p>
            </div>
            <div>
              <MDBRow className="mx-1">
                <MDBCol col="6" className="text-left">
                  <span className="text-muted">
                    <MDBIcon icon="eye" className="mr-1" /> {pinned?.views}
                  </span>
                </MDBCol>
                {link && (
                  <MDBCol col="6" className="text-right">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <span className="clickable text-muted blue-text">
                        More
                      </span>
                    </a>
                  </MDBCol>
                )}
              </MDBRow>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}
//#endregion

//#region > PropTypes
Pinned.propTypes = {
  category: PropTypes.object.isRequired,
  link: PropTypes.string,
  pinned: PropTypes.object.isRequired,
};
//#endregion

//#region > Exports
//> Default Component
export default Pinned;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
