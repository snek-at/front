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
import { VideoModal, AddVideoModal } from "../../../../molecules/modals";
//> Actions
// Functions to send data from the application to the store
import {
  addMetaLink,
  deleteMetaLink,
} from "../../../../../store/actions/personActions";
//> Style
import "./aivideogallery.scss";
//#endregion

//#region > Components
class AIVideoGallery extends React.Component {
  state = { modalPicture: false };

  componentDidMount = () => {
    this.setState({
      videos: this.props.videos,
    });
  };

  toggle = (modal) => {
    this.setState({
      [modal]: !this.state[modal],
      selectedVideoId: undefined,
    });
  };

  /**
   * Retrieving YouTube video ID from URL
   *
   * @param {string} url YouTube video URL
   * @author SithCult <https://github.com/SithCult/Holobook>
   * @license EUPL-1.2
   */
  getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  addVideo = async (state) => {
    let video = {
      linkType: "YOUTUBE",
      url: state.youtubeLink,
    };

    const rtn = await this.props.addMetaLink({
      url: video.url,
      linkType: video.linkType,
    });

    video = {
      ...video,
      id: rtn.id,
    };

    this.setState({
      modalAddVideo: false,
      videos: [...this.state.videos, video],
    });
  };

  render() {
    const { sameOrigin } = this.props;

    return (
      <div className="py-5" id="videogallery">
        {sameOrigin && (
          <div className="mb-4 text-right">
            <MDBBtn
              social="yt"
              onClick={() => this.setState({ modalAddVideo: true })}
            >
              <MDBIcon fab icon="youtube" />
              Add video
            </MDBBtn>
          </div>
        )}
        <MDBRow>
          {this.state.videos &&
            this.state.videos.map((video, i) => {
              const videoId = this.getYouTubeVideoId(video.url);

              return (
                <MDBCol lg="4" className="mb-3" key={"video-" + i}>
                  <MDBCard>
                    <MDBCardBody>
                      <MDBView>
                        <div className="position-relative">
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                            alt="Video thumbnail"
                            className="img-fluid"
                          />
                          <div className="text-right video-title py-1 px-2">
                            <MDBIcon
                              fab
                              icon="youtube"
                              className="text-danger"
                            />
                          </div>
                          {sameOrigin && video.id && (
                            <div className="text-right video-preview py-1 px-2">
                              <MDBBtn
                                color="danger"
                                size="sm"
                                onClick={() => {
                                  this.setState(
                                    {
                                      videos: this.state.videos.filter(
                                        (video) => video.id !== video.id
                                      ),
                                    },
                                    () => this.props.deleteMetaLink(video.id)
                                  );
                                }}
                              >
                                <MDBIcon icon="trash" className="m-0" />
                              </MDBBtn>
                            </div>
                          )}
                          <div className="position-absolute w-100 video-preview d-none">
                            <MDBRow>
                              <MDBCol lg="4">
                                <img
                                  src={`https://img.youtube.com/vi/${videoId}/1.jpg`}
                                  className="img-fluid"
                                />
                              </MDBCol>
                              <MDBCol lg="4">
                                <img
                                  src={`https://img.youtube.com/vi/${videoId}/2.jpg`}
                                  className="img-fluid"
                                />
                              </MDBCol>
                              <MDBCol lg="4">
                                <img
                                  src={`https://img.youtube.com/vi/${videoId}/3.jpg`}
                                  className="img-fluid"
                                />
                              </MDBCol>
                            </MDBRow>
                          </div>
                        </div>
                        <MDBMask
                          onClick={() =>
                            this.setState({
                              modalVideo: true,
                              selectedVideoId: videoId,
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
        {this.state.modalVideo && this.state.selectedVideoId && (
          <VideoModal
            toggle={() => this.toggle("modalVideo")}
            selectedVideoId={this.state.selectedVideoId}
          />
        )}
        {this.state.modalAddVideo && (
          <AddVideoModal
            toggle={() => this.toggle("modalAddVideo")}
            save={this.addVideo}
          />
        )}
      </div>
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
  connect(mapStateToProps, mapDispatchToProps)(AIVideoGallery)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
