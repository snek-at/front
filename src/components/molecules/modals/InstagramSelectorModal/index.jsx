//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Time management
import moment from "moment";
//> Redux
// Allows React components to read data, update data and dispatch actions
// from/to a Redux store.
import { connect } from "react-redux";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBFormInline,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBAlert,
  MDBView,
  MDBMask,
} from "mdbreact";

//> Actions
// Functions to send data from the application to the store
import { getInstagramPosts } from "../../../../store/actions/personActions";
//> Style
import "./instagramselector.scss";
//#endregion

//#region > Dummy data
const DUMMY = [
  "https://mdbootstrap.com/img/Photos/Others/images/10.jpg",
  "https://mdbootstrap.com/img/Photos/Others/images/20.jpg",
  "https://mdbootstrap.com/img/Photos/Others/images/30.jpg",
  "https://mdbootstrap.com/img/Photos/Others/images/40.jpg",
];
//#endregion

//#region > Components
class InstagramSelectorModal extends React.Component {
  state = { selection: [] };

  componentDidMount = async () => {
    this.setState({
      posts: await this.props.getInstagramPosts(),
    });
  };

  updateList = (picture) => {
    if (this.state.selection.includes(picture)) {
      const current = this.state.selection;
      const index = current.indexOf(picture);

      if (index > -1) {
        current.splice(index, 1);
      }

      this.setState({
        selection: current,
      });
    } else {
      this.setState({
        selection: [...this.state.selection, picture],
      });
    }
  };

  render() {
    console.log("REEEEEE", this.state);
    return (
      <>
        <MDBModal
          isOpen={true}
          toggle={this.props.toggle}
          size="lg"
          centered
          animation="left"
          id="selectorModal"
        >
          <MDBModalBody className="p-2 text-center">
            <div className="d-flex justify-content-between align-items-center">
              <p className="lead mb-0">Select Instagram images</p>
              <MDBBtn
                color="green"
                disabled={this.state.selection.length === 0}
                onClick={() => this.props.save(this.state)}
              >
                Confirm selection
              </MDBBtn>
            </div>
            <MDBRow className="mt-3">
              {this.state.posts &&
                this.state.posts.map((picture, i) => {
                  const selected = this.state.selection.includes(picture);

                  return (
                    <MDBCol
                      lg="4"
                      className={selected ? "mb-3 selected" : "mb-3"}
                      key={"selector-" + i}
                    >
                      <MDBView>
                        <img src={picture} className="img-fluid" />
                        <MDBMask
                          onClick={() => this.updateList(picture)}
                          className="text-white d-flex justify-content-center align-items-center"
                        >
                          {selected && (
                            <MDBIcon icon="check-circle" size="3x" />
                          )}
                        </MDBMask>
                      </MDBView>
                    </MDBCol>
                  );
                })}
            </MDBRow>
          </MDBModalBody>
        </MDBModal>
      </>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  //loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getInstagramPosts: (id) => dispatch(getInstagramPosts(id)),
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstagramSelectorModal);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
