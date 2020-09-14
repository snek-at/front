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
import {
  addMetaLink,
  deleteMetaLink,
} from "../../../../../store/actions/personActions";
//> Style
import "./aigallery.scss";
//> Intel
import INTEL_IMGUR from "snek-intel/lib/utils/imgur";
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

  handleSuccess = async (event) => {
    let photo = {
      url: event.link,
      linkType: "PHOTO",
      deleteHash: event.deletehash,
    };

    const res = await this.props.addMetaLink({
      url: photo.url,
      linkType: photo.linkType,
      imgurDeleteHash: photo.deleteHash,
    });

    photo = {
      ...photo,
      id: res.id,
      imgurDeleteHash: res.imgurDeleteHash,
    };

    this.setState({
      images: [...this.state.images, photo],
    });
  };

  toggle = (modal) => {
    this.setState({
      [modal]: !this.state[modal],
      selectedPicture: undefined,
    });
  };

  save = async (pictureList) => {
    let pics = [];

    for (const index in pictureList) {
      const picture = pictureList[index];
      const samePic = this.props.images.filter(
        (pic) => pic.url === picture.url
      );

      if (samePic.length === 0) {
        let pic = {
          url: picture.url,
          linkType: "INSTAGRAM",
        };

        const res = await this.props.addMetaLink({
          url: pic.url,
          linkType: pic.linkType,
        });

        pic = {
          ...pic,
          id: res.id,
        };

        pics = [...pics, pic];
      }
    }

    this.setState(
      {
        images: [...this.state.images, ...pics],
        modalSelectPictures: false,
      },
      () => {
        const currentPics = this.props.images;
        const newPics = this.state.images;

        const intersection = currentPics.filter((x) => !newPics.includes(x));

        intersection.forEach((curItem) => {
          this.props.deleteMetaLink(curItem.id);
        });
      }
    );
  };

  removeImage = async (id, deleteHash) => {
    if (deleteHash !== undefined && deleteHash !== null) {
      await INTEL_IMGUR.delete(deleteHash);
    }
    this.props.deleteMetaLink(id);
  };

  checkProfileTypeExists = (sourceType) => {
    return this.props.loggedUser.person.profiles.some(
      (e) => e.sourceType === sourceType && e.isActive
    )
      ? true
      : false;
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
            {this.checkProfileTypeExists("INSTAGRAM") && (
              <MDBBtn
                social="ins"
                onClick={() => this.setState({ modalSelectPictures: true })}
              >
                <MDBIcon fab icon="instagram" />
                Select images
              </MDBBtn>
            )}
          </div>
        )}
        <div className="card-columns">
          {this.state.images &&
            this.state.images.map((picture, i) => {
              return (
                <MDBCard key={"picture-" + i} className="mb-3">
                  <MDBCardBody>
                    <MDBView>
                      {sameOrigin && picture.id && (
                        <div className="text-right video-preview py-1 px-2">
                          <MDBBtn
                            color="danger"
                            size="sm"
                            onClick={() => {
                              this.setState(
                                {
                                  images: this.state.images.filter(
                                    (p) => p.id !== picture.id
                                  ),
                                },
                                () =>
                                  this.removeImage(
                                    picture.id,
                                    picture.imgurDeleteHash
                                  )
                              );
                            }}
                          >
                            <MDBIcon icon="trash" className="m-0" />
                          </MDBBtn>
                        </div>
                      )}
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
              );
            })}
        </div>
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
  return {
    addMetaLink: (linkOptions) => dispatch(addMetaLink(linkOptions)),
    deleteMetaLink: (id) => dispatch(deleteMetaLink(id)),
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AIGallery)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
