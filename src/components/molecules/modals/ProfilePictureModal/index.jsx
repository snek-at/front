//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Contains the functionality for editing a file
import AvatarEditor from "react-avatar-editor";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBModal,
  MDBModalHeader,
  MDBIcon,
  MDBModalBody,
  MDBBtn,
  MDBCol,
  MDBRow,
} from "mdbreact";

//> Style sheet
import "./profile.scss";
//#endregion

//#region > Components
class ProfilePictureModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: 1,
    };
    this.handleWheel = this.handleWheel.bind(this);
  }

  onClickSave = () => {
    if (this.editor) {
      const file = this.editor.getImageScaledToCanvas().toDataURL();

      this.props.setAvatarUrl(file);
      this.props.handleProfilePictureModal();
    }
  };

  componentDidMount() {
    window.addEventListener("wheel", this.handleWheel, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("wheel", this.handleWheel);
  }

  handleWheel(event) {
    let scale = this.state.scale;

    if (event.deltaY < 0) {
      if (scale < 2) {
        scale += 0.01;
      }
    } else {
      if (scale > 1) {
        scale -= 0.01;
      }
    }

    this.setState({ scale });
  }

  handleScale = (e) => {
    const scale = parseFloat(e.target.value);

    this.setState({ scale });
  };

  setEditorRef = (editor) => (this.editor = editor);

  render() {
    return (
      <MDBModal
        modalStyle="white"
        className="text-dark"
        size="md"
        id="profile"
        backdrop={true}
        isOpen={true}
        toggle={this.props.handleProfilePictureModal}
      >
        <MDBModalHeader
          className="text-center text-dark"
          titleClass="w-100"
          tag="p"
        >
          <MDBRow id="header">
            <MDBCol md="2" className="text-center">
              <MDBIcon
                icon="arrow-left"
                className="green-text"
                size="1x"
                onClick={this.props.handleProfilePictureModal}
              />
            </MDBCol>
            <MDBCol md="7" className="text-center">
              Image Editor
            </MDBCol>
            <MDBCol md="3">
              <MDBBtn
                color="green"
                outline
                size="sm"
                id="btn-save"
                onClick={this.onClickSave}
              >
                Save
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBModalHeader>
        <MDBModalBody className="text-center">
          <AvatarEditor
            ref={this.setEditorRef}
            image={this.props.file}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={parseFloat(this.state.scale)}
          />
          <input
            name="scale"
            type="range"
            onChange={this.handleScale}
            min="1"
            max="2"
            step="0.01"
            value={this.state.scale}
          />
        </MDBModalBody>
      </MDBModal>
    );
  }
}
//#endregion

//#region > Exports
//> Default Component
export default ProfilePictureModal;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
