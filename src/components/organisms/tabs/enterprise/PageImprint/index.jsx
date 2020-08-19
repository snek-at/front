//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Redux
// Allows React components to read data, update data and dispatch actions
// from/to a Redux store.
import { connect } from "react-redux";
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

//> Actions
// Functions to send data from the application to the store
import { editImprint } from "../../../../store/actions/pageActions";
//> Components
import { AIInput, AIToggle } from "../../../atoms";
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
                  <AIInput
                    title="Company name"
                    description="Legal name of your enterprise."
                    name="name"
                    placeholder="Company name"
                    value={this.state.page.company.name}
                    handleChange={this.handleChange}
                  />
                  <AIInput
                    type="textarea"
                    title="Description"
                    description="What is your enterprise all about?"
                    name="description"
                    placeholder="Company description"
                    value={this.state.page.company.description}
                    handleChange={this.handleChange}
                  />
                  <AIInput
                    title="Company E-Mail"
                    description="How can visitors reach your enterprise?"
                    name="email"
                    placeholder="Company E-Mail"
                    value={this.state.page.company.email}
                    handleChange={this.handleChange}
                  />
                  <hr />
                  <AIToggle
                    title="VAT Number"
                    description="Is your company entitled to deduct pre-tax?"
                    checked={this.state.page.company.hasVAT}
                    change={this.handleSwitchChange}
                    name="hasVAT"
                    labelLeft="No"
                    labelRight="Yes"
                  />
                  {this.state.page.company.hasVAT && (
                    <AIInput
                      description="Please enter your VAT number."
                      name="vat"
                      placeholder="VAT number"
                      value={this.state.page.company.vat.value}
                      handleChange={this.handleChange}
                    />
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="4">
              <MDBCard>
                <MDBCardBody>
                  <p className="lead">Specific</p>
                  <AIInput
                    type="number"
                    title="Employees"
                    description="How many people does your enterprise employ?"
                    name="employees"
                    placeholder="Number of employees"
                    value={this.state.page.company.employees}
                    handleChange={this.handleChange}
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="4">
              <MDBCard>
                <MDBCardBody>
                  <p className="lead">Other information</p>
                  <AIToggle
                    title="Open Source"
                    description="Does your enterprise produce open source software?"
                    checked={this.state.page.company.isOpenSource}
                    change={this.handleSwitchChange}
                    name="isOpenSource"
                    labelLeft="No"
                    labelRight="Yes"
                  />
                  {this.state.page.company.isOpenSource && (
                    <>
                      <span className="small text-muted mb-1">
                        Where can we find your Open Source projects at?
                      </span>
                      <input
                        type="text"
                        name="openSourceUrl"
                        placeholder="Open Source Platform URL"
                        value={this.state.page.company.openSourceUrl}
                        onChange={(e) =>
                          this.handleChange(e.target.name, e.target.value)
                        }
                        className="form-control"
                      />
                    </>
                  )}
                  <hr />
                  <AIToggle
                    title="Recruiting"
                    description="Is your enterprise currently recruiting?"
                    checked={this.state.page.company.isRecruiting}
                    change={this.handleSwitchChange}
                    name="isRecruiting"
                    labelLeft="No"
                    labelRight="Yes"
                  />
                  {this.state.page.company.isRecruiting && (
                    <>
                      <span className="small text-muted mb-1">
                        Where can visitors see open positions?
                      </span>
                      <input
                        type="text"
                        name="recruitmentUrl"
                        placeholder="Recruitment URL"
                        value={this.state.page.company.recruitmentUrl}
                        onChange={(e) =>
                          this.handleChange(e.target.name, e.target.value)
                        }
                        className="form-control"
                      />
                    </>
                  )}
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

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  page: state.pages.page,
});

const mapDispatchToProps = (dispatch) => {
  return {
    editImprint: (newCompanyInfo) => dispatch(editImprint(newCompanyInfo)),
  };
};
//#endregion

//#region > Exports
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default connect(mapStateToProps, mapDispatchToProps)(PageImprint);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
