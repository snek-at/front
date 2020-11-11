//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBAvatar,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBSwitch,
  MDBBtn,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays page overview of the page section */
class PageImprint extends React.Component {
  state = { page: null };

  render() {
    const { page } = this.props;

    return (
      <div id="pageimprint">
        <div className="mt-3">
          <div>
            <p className="lead font-weight-bold mb-0">Imprint</p>
          </div>
        </div>
        {page ? (
          <MDBRow className="mt-3">
            <MDBCol lg="4">
              <MDBCard>
                <MDBCardBody>
                  <p className="lead mb-2">General</p>
                  {page.name && (
                    <p className="mb-0 font-weight-bold">{page.name}</p>
                  )}
                  {page.ownership && <p className="mb-2">{page.ownership}</p>}
                  {page.address && <p className="mb-0">{page.address}</p>}
                  {page.zipCode && page.city && (
                    <p className="mb-0">
                      {page.zipCode} {page.city}
                    </p>
                  )}
                  {page.email && (
                    <p className="mt-2 mb-0">
                      <a href={`mailto:${page.email}`}>{page.email}</a>
                    </p>
                  )}
                  {page.telephone && <p className="mb-0">{page.telephone}</p>}
                  {page.vatNumber && (
                    <>
                      <hr />
                      <p className="mb-1">VAT: {page.vatNumber}</p>
                    </>
                  )}
                  {page.taxId && <p>Tax ID: {page.taxId}</p>}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
//#endregion

//#region > Exports
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default PageImprint;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
