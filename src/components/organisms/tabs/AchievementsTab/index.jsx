//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Runtime type checking for React props and similar objects
import PropTypes from "prop-types";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBRow, MDBBtn, MDBCol } from "mdbreact";

//> Actions
// Functions to send data from the application to the store
import { redeemAchievement } from "../../../../store/actions/personActions";
//> Components
import { Achievement } from "../../../atoms";
//> Style sheet
import "./achievementstab.scss";
//#endregion

//#region > Components
/** @class A component which lists all achievements of a user */
class AchievementsTab extends React.Component {
  state = {
    sequence: "",
    loading: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        this.props
          .redeemAchievement(this.state.sequence)
          .then((res) => console.log(res));
      }
    );
  };

  render() {
    const { achievements } = this.props;

    return (
      <>
        <h3 className="font-weight-bold">Achievements</h3>
        <form className="text-left">
          <span className="text-muted small">Flag</span>
          <MDBRow>
            <MDBCol size="9">
              <input
                type="text"
                className="form-control"
                name="sequence"
                onChange={(e) => this.handleChange(e)}
                value={this.state.sequence}
              />
            </MDBCol>
            <MDBCol size="3">
              <MDBBtn
                color="green"
                onClick={this.handleSubmit}
                size="lg"
                className="submit-sequence"
              >
                Redeem flag
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
        <MDBRow className="achievement-list">
          {achievements &&
            achievements.map((achievement, i) => {
              return <Achievement achievement={achievement} key={i} />;
            })}
        </MDBRow>
      </>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  fetchedPerson: state.person.fetchedPerson,
});

const mapDispatchToProps = (dispatch) => {
  return {
    redeemAchievement: (sequence) => dispatch(redeemAchievement(sequence)),
  };
};
//#endregion

//#region > Exports
//> Default Component
export default connect(mapStateToProps, mapDispatchToProps)(AchievementsTab);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
