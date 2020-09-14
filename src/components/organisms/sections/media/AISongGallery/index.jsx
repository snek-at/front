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
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
} from "mdbreact";

//> Components
import { AddSongModal } from "../../../../molecules/modals";
//> Actions
// Functions to send data from the application to the store
import {
  addMetaLink,
  deleteMetaLink,
} from "../../../../../store/actions/personActions";
//> Style
import "./aisonggallery.scss";
//#endregion

//#region > Dummy data
const DUMMY = [
  {
    url: "https://soundcloud.com/paetz_official/hard-work-pays-off",
  },
];
//#endregion

//#region > Components
class AISongGallery extends React.Component {
  state = { modalPicture: false };

  componentDidMount = () => {
    this.setState({
      songs: this.props.songs,
    });
  };

  toggle = (modal) => {
    this.setState({
      [modal]: !this.state[modal],
      selectedVideoId: undefined,
    });
  };

  addSong = async (url) => {
    let song = {
      linkType: "SOUNDCLOUD",
      url,
    };

    const rtn = await this.props.addMetaLink({
      url: song.url,
      linkType: song.linkType,
    });

    song = {
      ...song,
      id: rtn.id,
    };

    this.setState({
      modalAddSong: false,
      songs: [...this.state.songs, song],
    });
  };

  render() {
    const { sameOrigin } = this.props;

    return (
      <div className="py-5">
        {sameOrigin && (
          <div className="mb-4 text-right">
            <MDBBtn
              color="orange"
              onClick={() => this.setState({ modalAddSong: true })}
            >
              <MDBIcon fab icon="soundcloud" />
              Add song
            </MDBBtn>
          </div>
        )}
        <MDBRow id="videogallery">
          {this.state.songs &&
            this.state.songs.map((song, i) => {
              return (
                <MDBCol lg="6" className="mb-3" key={"song-" + i}>
                  <MDBCard>
                    <MDBCardBody>
                      {sameOrigin && song.id && (
                        <div className="text-right video-preview py-1 px-2">
                          <MDBBtn
                            color="danger"
                            size="sm"
                            onClick={() => {
                              this.setState(
                                {
                                  songs: this.state.songs.filter(
                                    (s) => s.id !== song.id
                                  ),
                                },
                                () => this.props.deleteMetaLink(song.id)
                              );
                            }}
                          >
                            <MDBIcon icon="trash" className="m-0" />
                          </MDBBtn>
                        </div>
                      )}
                      <iframe
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={"https://w.soundcloud.com/player/?url=" + song.url}
                      ></iframe>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              );
            })}
        </MDBRow>
        {this.state.modalAddSong && (
          <AddSongModal
            toggle={() => this.toggle("modalAddSong")}
            save={this.addSong}
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
  connect(mapStateToProps, mapDispatchToProps)(AISongGallery)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
