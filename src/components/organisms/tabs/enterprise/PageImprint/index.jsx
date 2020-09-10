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

  componentDidMount = () => {
    this.setState({
      page: this.props.page,
    });
  };

  handleSwitchChange = (nr) => {
    this.setState({
      page: {
        ...this.state.page,
        company: {
          ...this.state.page.company,
          [nr]: !this.state.page.company[nr],
        },
      },
    });
  };

  handleChange = (name, value) => {
    this.setState({
      page: {
        ...this.state.page,
        company: {
          ...this.state.page.company,
          [name]:
            typeof this.state.page.company[name] !== "object"
              ? value
              : { ...this.state.page.company[name], value },
        },
      },
    });
  };

  checkIfChanged = () => {
    if (JSON.stringify(this.props.page) !== JSON.stringify(this.state.page)) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { page } = this.state;

    console.log(page);

    return (
      <div id="pageimprint">
        <div className="d-flex justify-content-between mt-3">
          <div>
            <p className="lead font-weight-bold mb-0">Imprint</p>
            <p className="text-muted small">
              <MDBIcon icon="question-circle" className="mr-2" />
              Manage your enterprise imprint
            </p>
          </div>
          <div>
            {this.checkIfChanged() && (
              <MDBBtn
                color="success"
                onClick={() => this.props.editImprint(this.state.page)}
              >
                <MDBIcon icon="check-circle" />
                Save
              </MDBBtn>
            )}
          </div>
        </div>
        {this.state.page ? (
          <MDBRow className="mt-3">
            <MDBCol lg="4">
              <MDBCard>
                <MDBCardBody>
                  <p className="lead">General</p>
                  <p>{this.state.page.company.name}</p>
                  <p>{this.state.page.company.description}</p>
                  <p>{this.state.page.company.email}</p>
                  <hr />
                  <p>{this.state.page.company.vat.value}</p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        ) : (
          <span>No imprint</span>
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
