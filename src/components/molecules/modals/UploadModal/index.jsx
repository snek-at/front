//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Runtime type checking for React props and similar objects
import PropTypes from "prop-types";
// Contains the functionality for uploading a file
import Dropzone from "react-dropzone";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBModal,
  MDBModalHeader,
  MDBIcon,
  MDBModalBody,
  MDBProgress,
} from "mdbreact";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";
//> Intel
import { anonfiles } from "snek-intel/lib/utils/upload";
import IMGUR_PROVIDER from "snek-intel/lib/utils/imgur";

//> Actions
// Functions to send data from the application to the store
// import { uploadTalkAction } from "../../../../store/actions/userActions";
//#endregion

//#region > Components
/** @class A upload modal component for uploading files including a drop-zone */
class UploadModal extends React.Component {
  state = {
    loading: false,
    error: [],
  };

  onDrop = async (files) => {
    const { storageEngine } = this.props;

    if (files.length > 0) {
      this.setState({
        error: [],
        loading: true,
      });

      let res;

      if (storageEngine === "anonfiles") {
        res = await anonfiles.uploadFile(files[0]);
      } else if (storageEngine === "imgur") {
        res = await IMGUR_PROVIDER.upload(files[0]);
      } else {
        this.setState({ error: ["no valid storageEngine specified"] });
      }

      this.props.onSuccess(res);

      this.setState({
        loading: false,
      });

      this.props.closeModal();
    } else {
      this.setState({ error: [this.props.invalidTypeMessage] });
    }
  };

  uploadToAnonfiles = async (file) => {};

  render() {
    return (
      <MDBModal
        modalStyle="white"
        className="text-dark"
        size="lg"
        id="upload"
        backdrop={true}
        isOpen={true}
        toggle={this.props.closeModal}
        centered
        animation="left"
      >
        <MDBModalBody className="text-center">
          <div>
            <Dropzone onDrop={this.onDrop} accept={this.props.acceptTypes}>
              {({ getRootProps, getInputProps, acceptedFiles }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {this.state.error.length > 0 || acceptedFiles.length > 0 ? (
                    <div>
                      <ul className="list-group mt-2">
                        {acceptedFiles.length > 0 &&
                          acceptedFiles.map((acceptedFile, i) => (
                            <li
                              className="list-group-item list-group-item-success"
                              key={i}
                            >
                              <MDBIcon
                                icon="file-upload"
                                className="green-text"
                                size="3x"
                              />
                              <p className="lead mt-3 mb-0">
                                {acceptedFile.name}
                              </p>
                            </li>
                          ))}
                      </ul>
                      {this.state.loading && (
                        <MDBProgress
                          material
                          value={100}
                          animated
                          height="25px"
                          color="success"
                          className="mb-0 pb-0"
                        >
                          Uploading file
                        </MDBProgress>
                      )}
                      <ul className="list-group mt-2">
                        {this.state.error.length > 0 &&
                          this.state.error.map((error, i) => (
                            <li
                              className="list-group-item list-group-item-danger"
                              key={i}
                            >
                              <MDBIcon
                                icon="times"
                                className="danger-text"
                                size="6x"
                              />
                              <p />
                              <h3>{error}</h3>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="border rounded px-4 pt-4 pb-3 clickable">
                      <MDBIcon
                        icon="file-upload"
                        className="green-text"
                        size="3x"
                      />
                      <p className="lead mt-3 mb-0">
                        Click here or drop a file to upload!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        </MDBModalBody>
      </MDBModal>
    );
  }
}
//#endregion

//#region > PropTypes
UploadModal.propTypes = {
  acceptTypes: PropTypes.string.isRequired,
  invalidTypeMessage: PropTypes.string.isRequired,
  storageEngine: PropTypes.oneOf(["anonfiles", "imgur"]).isRequired,
  onSuccess: PropTypes.func,
};
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  loggedUser: state.user.fetchedUser,
  fetchedUser: state.user.fetchedUser,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
