//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
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
//#endregion

//#region > Components
/** @class A upload modal component for uploading files including a drop-zone */
class UploadModal extends React.Component {
  state = {
    loading: false,
    error: [],
  };

  onDrop = async (files) => {
    const { globalState, globalFunctions } = this.props;

    if (files.length > 0) {
      this.setState({
        error: [],
        loading: true,
      });

      globalFunctions
        .uploadTalk(files[0], {
          avatarUrl: globalState.fetchedUser.platformData.profile.avatarUrl,
          owner: {
            username: globalState.loggedUser.username,
          },
        })
        .then(() => {
          this.setState({
            loading: false,
          });

          this.props.closeModal();
        });
    } else {
      this.setState({ error: ["Only PDF files can be uploaded!"] });
    }
  };

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
      >
        <MDBModalHeader
          className="text-center text-dark donate"
          titleClass="w-100"
          tag="p"
        >
          Upload
        </MDBModalHeader>
        <MDBModalBody className="text-center">
          <div>
            <Dropzone onDrop={this.onDrop} accept="application/pdf">
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
                                icon="file"
                                className="green-text"
                                size="6x"
                              />
                              <p />
                              <h3>{acceptedFile.name}</h3>
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
                    <div>
                      <MDBIcon
                        icon="file-upload"
                        className="green-text"
                        size="6x"
                      />
                      <p />
                      <h3>Click here or drop a file to upload!</h3>
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

//#region > Exports
//> Default Class
export default UploadModal;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
