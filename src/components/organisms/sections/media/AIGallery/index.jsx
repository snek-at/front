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
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBBtn,
  MDBBadge,
  MDBProgress,
  MDBTooltip,
  MDBIcon,
  MDBTimeline,
  MDBTimelineStep,
  MDBView,
  MDBMask,
} from "mdbreact";

//> Components
import {
  ImageModal,
  InstagramSelectorModal,
  UploadModal,
} from "../../../../molecules/modals";
//> Actions
// Functions to send data from the application to the store
import { addMetaLink } from "../../../../../store/actions/personActions";
//> Style
import "./aigallery.scss";
//#endregion

//#region > Components
class AIGallery extends React.Component {
  state = { modalPicture: false, showUpload: false };

  componentDidMount = () => {
    this.setState({
      images: this.props.images,
    });
  };

  componentDidUpdate = () => {
    console.log("AAAAAAAAAAAAAAA", this.props.loggedUser);
  };

  handleUploadClose = () => {
    if (this.state.showUpload) {
      this.setState({
        showUpload: false,
      });
    }
  };

  handleSuccess = (event) => {
    console.log("SUCCESS", event);
  };

  toggle = (modal) => {
    this.setState({
      [modal]: !this.state[modal],
      selectedPicture: undefined,
    });
  };

  save = (pictureList) => {
    this.setState(
      {
        images: [...this.state.images, ...pictureList],
        modalSelectPictures: false,
      },
      () => {
        pictureList.forEach((picture) => {
          this.props.addMetaLink({
            url: picture.mediaLink,
            linkType: "INSTAGRAM",
          });
        });
      }
    );
  };

  removeImage = (url) => {
    // TODO
  };

  render() {
    const { loggedUser, sameOrigin } = this.props;

    return (
      <div className="py-5" id="gallery">
        {sameOrigin && (
          <div className="mb-4 text-right">
            <MDBBtn
              color="elegant"
              onClick={() => this.setState({ showUpload: true })}
            >
              <MDBIcon icon="upload" />
              Upload image
            </MDBBtn>
            <MDBBtn
              social="ins"
              onClick={() => this.setState({ modalSelectPictures: true })}
            >
              <MDBIcon fab icon="instagram" />
              Select images
            </MDBBtn>
          </div>
        )}
        <MDBRow>
          {this.state.images &&
            this.state.images.map((picture, i) => {
              console.log("YE", picture);
              return (
                <MDBCol lg="4" key={"picture-" + i}>
                  <MDBCard>
                    <MDBCardBody>
                      <MDBView>
                        <img src={picture.url} className="img-fluid" />
                        <MDBMask
                          onClick={() =>
                            this.setState({
                              modalPicture: true,
                              selectedPicture: picture,
                            })
                          }
                        />
                      </MDBView>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              );
            })}
        </MDBRow>
        {this.state.modalPicture && this.state.selectedPicture && (
          <ImageModal
            toggle={() => this.toggle("modalPicture")}
            selectedPicture={this.state.selectedPicture}
          />
        )}
        {this.state.modalSelectPictures && (
          <InstagramSelectorModal
            toggle={() => this.toggle("modalSelectPictures")}
            profile={
              loggedUser.person &&
              loggedUser.person.profiles.filter(
                (profile) => profile.sourceType === "INSTAGRAM"
              )
            }
            selection={this.state.images}
            save={this.save}
          />
        )}
        {this.state.showUpload && (
          <UploadModal
            {...this.props}
            acceptTypes={"image/jpeg, image/png, image/gif"}
            invalidTypeMessage={
              "Only JPEG, PNG and GIF uploading is supported!"
            }
            storageEngine={"imgur"}
            onSuccess={this.handleSuccess}
            closeModal={this.handleUploadClose}
          />
        )}
      </div>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  loggedUser: state.user.user,
});

const mapDispatchToProps = (dispatch) => {
  return { addMetaLink: (linkOptions) => dispatch(addMetaLink(linkOptions)) };
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AIGallery)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
