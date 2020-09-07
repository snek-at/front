//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter } from "react-router-dom";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer, MDBBtn } from "mdbreact";

//> Components
import {
  AIGallery,
  AIVideoGallery,
  AISongGallery,
} from "../../organisms/sections/media";
import { ConnectModal } from "../../molecules/modals";
//#endregion

//#region > Components
class TempPage extends React.Component {
  state = { connect: true };

  componentDidMount = () => {};

  toggleConnect = () => {
    this.setState({
      connect: !this.state.connect,
    });
  };

  render() {
    return (
      <MDBContainer id="media">
        {this.state.connect && <ConnectModal toggle={this.toggleConnect} />}

        <AIGallery />
        <AIVideoGallery />
        <AISongGallery />
      </MDBContainer>
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
export default TempPage;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
