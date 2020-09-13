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
//#endregion

//#region > Components
class AddVideoModal extends React.Component {
  state = { youtubeLink: "" };

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

  /**
   * Retrieving YouTube video ID from URL
   *
   * @param {string} e Event of input field
   * @author SithCult <https://github.com/SithCult/Holobook>
   * @license EUPL-1.2
   */
  onChangeYouTubeHandler = (e) => {
    const url = e.target.value;

    if (url && url.includes("youtube.com")) {
      const videoId = this.getYouTubeVideoId(url);

      if (videoId) {
        this.setState({
          youtubeLink: url,
          youtubeId: videoId,
          youtubeLinkError: false,
        });
      } else {
        this.setState({
          youtubeLink: url,
          youtubeId: false,
          youtubeLinkError: true,
        });
      }
    } else {
      this.setState({
        youtubeLink: url,
        youtubeId: false,
        youtubeLinkError: true,
      });
    }
  };

  render() {
    const { selectedVideoId } = this.props;

    return (
      <>
        <MDBModal
          isOpen={true}
          toggle={this.props.toggle}
          size="md"
          centered
          animation="left"
        >
          <MDBModalBody className="p-3 text-center">
            <div className="d-flex justify-content-between align-items-center">
              <p className="lead mb-0">Add YouTube Video</p>
              <MDBBtn
                social="yt"
                disabled={!this.state.youtubeId || this.state.youtubeLinkError}
                onClick={() => this.props.save(this.state)}
              >
                {this.state.youtubeId && !this.state.youtubeLinkError && (
                  <MDBIcon icon="check-circle" />
                )}
                Add
              </MDBBtn>
            </div>
            <div className="text-left">
              <p className="mb-0 small text-muted">Enter YouTube link</p>
              <input
                type="text"
                className="form-control"
                value={this.state.youtubeLink}
                onChange={this.onChangeYouTubeHandler}
              />
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
export default connect(mapStateToProps, mapDispatchToProps)(AddVideoModal);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
