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
//> Style
import "./aivideogallery.scss";
//#endregion

//#region > Dummy data
const DUMMY = [
  {
    id: "rX0kyTpTIw0",
  },
  {
    id: "viek5d1_0VA",
  },
  { id: "pPw_izFr5PA" },
];
//#endregion

//#region > Components
class AIVideoGallery extends React.Component {
  state = { modalPicture: false };

  componentDidMount = () => {
    this.setState({
      videos: DUMMY,
    });
  };

  toggle = (modal) => {
    this.setState({
      [modal]: !this.state[modal],
      selectedVideoId: undefined,
    });
  };

  addVideo = (state) => {
    const video = {
      type: "YOUTUBE",
      id: state.youtubeId,
    };

    this.setState({
      modalAddVideo: false,
      videos: [...this.state.videos, video],
    });
  };

  render() {
    const { loggedUser } = this.props;

    return (
      <div className="py-5">
        <div className="mb-4 text-right">
          <MDBBtn
            color="green"
            onClick={() => this.setState({ modalAddVideo: true })}
          >
            Add video
          </MDBBtn>
        </div>
        <MDBRow id="videogallery">
          {this.state.videos &&
            this.state.videos.map((video, i) => {
              return (
                <MDBCol lg="4" className="mb-3">
                  <MDBCard>
                    <MDBCardBody>
                      <MDBView>
                        <div className="position-relative">
                          <img
                            src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                            alt="Video thumbnail"
                            className="img-fluid"
                          />
                          <div className="d-flex justify-content-between video-title p-2 align-items-center">
                            <span>Titel ausständig</span>
                            <MDBIcon
                              fab
                              icon="youtube"
                              className="text-danger"
                            />
                          </div>
                          <div className="position-absolute w-100 video-preview d-none">
                            <MDBRow>
                              <MDBCol lg="4">
                                <img
                                  src={`https://img.youtube.com/vi/${video.id}/1.jpg`}
                                  className="img-fluid"
                                />
                              </MDBCol>
                              <MDBCol lg="4">
                                <img
                                  src={`https://img.youtube.com/vi/${video.id}/2.jpg`}
                                  className="img-fluid"
                                />
                              </MDBCol>
                              <MDBCol lg="4">
                                <img
                                  src={`https://img.youtube.com/vi/${video.id}/3.jpg`}
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
                              selectedVideoId: video.id,
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
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => {
  return null;
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
