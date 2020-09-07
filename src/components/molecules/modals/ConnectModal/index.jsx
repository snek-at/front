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
  MDBModalFooter,
  MDBModalHeader,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions,
} from "mdbreact";
//#endregion

//#region > Components
class ConnectModal extends React.Component {
  state = { youtubeLink: "", modalGitLab: false };

  toggle = () => {
    this.setState({ modalGitLab: !this.state.modalGitLab });
  };

  render() {
    const { selectedVideoId } = this.props;

    return (
      <>
        <MDBModal
          isOpen={this.state.modalGitLab ? false : true}
          toggle={this.props.toggle}
          size="md"
          centered
          animation="left"
        >
          <MDBModalBody className="p-3 text-center">
            <div className="d-flex justify-content-between align-items-center">
              <p className="lead mb-0">Connect your profiles</p>
              <MDBBtn color="green" onClick={this.props.toggle}>
                Done
              </MDBBtn>
            </div>
            <div className="pt-4 text-center">
              <MDBRow className="justify-content-center">
                <MDBCol lg="7">
                  <MDBBtn
                    social="git"
                    size="lg"
                    className="d-block mx-auto w-100"
                  >
                    <MDBIcon fab icon="github" />
                    Connect GitHub
                  </MDBBtn>
                  <MDBBtn
                    color="orange"
                    size="lg"
                    className="d-block mx-auto w-100"
                    onClick={this.toggle}
                  >
                    <MDBIcon fab icon="gitlab" />
                    Connect GitLab
                  </MDBBtn>
                  <MDBBtn
                    social="ins"
                    size="lg"
                    className="d-block mx-auto w-100"
                  >
                    <MDBIcon fab icon="instagram" />
                    Connect Instagram
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </div>
            {this.state.youtubeId && (
              <div className="embed-responsive embed-responsive-16by9 mt-3">
                <iframe
                  className="embed-responsive-item"
                  title="YouTube Video"
                  src={"//www.youtube.com/embed/" + this.state.youtubeId}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </MDBModalBody>
        </MDBModal>
        {this.state.modalGitLab && (
          <MDBModal
            className="text-white"
            size="sm"
            backdrop={true}
            isOpen={this.state.modalGitLab}
            toggle={this.toggle}
            centered
            animation="left"
          >
            <MDBModalHeader
              className="text-center"
              titleClass="w-100 text-dark"
              tag="p"
            >
              <MDBIcon fab icon="gitlab" className="pr-2" />
              Add GitLab profile
            </MDBModalHeader>
            <MDBModalBody className="text-center">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="GitLab username"
                name="gitlab_username"
                onChange={(e) =>
                  this.setState({ [e.target.name]: e.target.value })
                }
                value={this.state.gitlab_username}
              />
              <MDBSelect
                outline
                getValue={this.handleSelectChange}
                className="mb-0"
              >
                <MDBSelectInput selected={this.state.gitlab_server} />
                <MDBSelectOptions>
                  <MDBSelectOption disabled>
                    Choose your organisation
                  </MDBSelectOption>
                  {this.state.gitlab_servers &&
                    this.state.gitlab_servers.map((source, i) => {
                      return (
                        <MDBSelectOption key={i} value={source.domain}>
                          {source.organisation}
                        </MDBSelectOption>
                      );
                    })}
                </MDBSelectOptions>
              </MDBSelect>
            </MDBModalBody>
            <MDBModalFooter className="justify-content-center">
              <MDBBtn color="orange" onClick={this.addGitLab}>
                <MDBIcon icon="plus-circle" className="mr-2" />
                Add
              </MDBBtn>
              <MDBBtn color="elegant" outline onClick={this.toggle}>
                Cancel
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        )}
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
  return {};
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
export default connect(mapStateToProps, mapDispatchToProps)(ConnectModal);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
