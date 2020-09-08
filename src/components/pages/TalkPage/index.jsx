//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
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
  MDBIcon,
  MDBPageItem,
  MDBCardHeader,
  MDBMedia,
  MDBPageNav,
  MDBPagination,
} from "mdbreact";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Actions
// Functions to send data from the application to the store
import { getTalkAction } from "../../../store/actions/userActions";
//> Style sheet
import "./talk.scss";
//#endregion

//#region > Components
/** @class This component adds the Talk Page which displays a certain talk */
class TalkPage extends React.Component {
  state = {
    loading: true,
    talk: undefined,
  };

  componentDidMount = () => {
    const { uid, username } = this.props.match?.params;

    this.props.getTalk(uid, username).then(() => {
      const { selectedTalk } = this.props;

      if (uid && username) {
        selectedTalk.social = {
          likes: 17,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
        };

        selectedTalk.interval = {
          timeoutID: setInterval(() => this.updateIframe(selectedTalk), 4000),
          loaded: false,
        };
      }
      this.setState({ talk: selectedTalk, loading: false });
    });
  };

  updateIframe = (talk) => {
    let iframe;

    if (talk.interval.loaded === false) {
      if (document.getElementById(talk.uid)) {
        iframe = document.getElementById(talk.uid);
        iframe.src = talk.displayUrl;
      }
    }
  };

  render() {
    const talk = this.state.talk;

    return (
      <div id="talk">
        {talk && (
          <>
            <MDBContainer>
              <MDBRow>
                <MDBCol lg="12">
                  {talk.location === "snek" && (
                    <a
                      href={talk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MDBBadge color="elegant-color">
                        <MDBIcon fab icon="github" />
                        Open source
                      </MDBBadge>
                    </a>
                  )}
                  <p />
                </MDBCol>
                <MDBCol lg="12">
                  <MDBCard>
                    <MDBCardBody>
                      <iframe
                        src={talk.displayUrl}
                        id={talk.uid}
                        width="100%"
                        height="620px"
                        onLoad={() => {
                          clearInterval(talk.interval.loaded);
                          this.state.talk.interval.loaded = true;
                        }}
                        frameBorder="0"
                      />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="12">
                  <MDBCard>
                    <MDBCardBody>
                      <MDBRow className="d-flex align-items-center">
                        <MDBCol lg="2">
                          <img
                            src={talk.repository?.avatarUrl}
                            alt="logo"
                            className="img-fluid"
                          />
                        </MDBCol>
                        <MDBCol lg="10">
                          <div className="d-flex justify-content-space-between">
                            <div>
                              <p className="lead font-weight-bold mb-1">
                                Owned by {talk.repository?.owner.username}
                              </p>
                              {talk.repository?.owner && (
                                <div className="verified-badge mb-1">
                                  <MDBBadge color="success">
                                    <MDBIcon icon="check-circle" />
                                    Verified
                                  </MDBBadge>
                                </div>
                              )}
                              <p className="text-muted mb-1">
                                {talk.repository?.description}
                              </p>
                            </div>
                            <div className="d-flex">
                              <a>
                                <MDBBtn color="indigo" size="md">
                                  <MDBIcon icon="thumbs-up"></MDBIcon>
                                  Like
                                </MDBBtn>
                              </a>
                              <a>
                                <MDBBtn color="green" outline size="md">
                                  <MDBIcon icon="heart"></MDBIcon>
                                  Follow
                                </MDBBtn>
                              </a>
                            </div>
                          </div>
                          <div>
                            {talk.location === "github" && (
                              <a
                                href={talk.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MDBBadge color="elegant-color">
                                  <MDBIcon fab icon="github" />
                                  Open source
                                </MDBBadge>
                              </a>
                            )}
                            {talk.location === "snek" && (
                              <a
                                href={talk.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MDBBadge color="green">
                                  <MDBIcon icon="dragon" />
                                  On SNEK
                                </MDBBadge>
                              </a>
                            )}
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                    <MDBCardFooter className="px-4 py-3">
                      <div className="stats d-flex">
                        {talk.social && (
                          <span className="d-inline-block mr-4">
                            <MDBIcon
                              icon="thumbs-up"
                              className="green-text font-weight-bold"
                            />{" "}
                            <span className="font-weight-bold green-text">
                              {talk.social.likes}
                            </span>{" "}
                            likes
                            <br />
                            <small className="text-muted">
                              published on {talk.social.date}
                            </small>
                          </span>
                        )}
                        {talk.download && (
                          <a href={talk.downloadUrl}>
                            <span className="d-inline-block mr-4">
                              <MDBIcon
                                icon="file-download"
                                className="blue-text font-weight-bold"
                              />{" "}
                              download
                            </span>
                          </a>
                        )}
                      </div>
                    </MDBCardFooter>
                  </MDBCard>
                </MDBCol>
                {/* <MDBCol lg="12">
              <MDBCard>
                <MDBCardBody>
                  {talk1.repository?.readme}
                </MDBCardBody>
              </MDBCard>
            </MDBCol> */}
              </MDBRow>
            </MDBContainer>
            <MDBContainer>
              <MDBCardHeader className="border-0 font-weight-bold">
                <p className="mr-4 mb-0">4 comments</p>
              </MDBCardHeader>
              <MDBMedia className="d-block d-md-flex mt-4">
                <img
                  className="card-img-64 d-flex mx-auto mb-3"
                  src="https://mdbootstrap.com/img/Photos/Avatars/img (20).jpg"
                  alt=""
                />
                <MDBMedia
                  body
                  className="text-center text-md-left ml-md-3 ml-0"
                >
                  <h5 className="font-weight-bold mt-0">
                    Miley Steward
                    <MDBIcon icon="reply" className="pull-right ml-2" />
                  </h5>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                  <MDBMedia className="d-block d-md-flex mt-4">
                    <img
                      className="card-img-64 d-flex mx-auto mb-3"
                      src="https://mdbootstrap.com/img/Photos/Avatars/img (27).jpg"
                      alt=""
                    />
                    <MDBMedia
                      body
                      className="text-center text-md-left ml-md-3 ml-0"
                    >
                      <h5 className="font-weight-bold mt-0">
                        Tommy Smith
                        <MDBIcon icon="reply" className="pull-right ml-2" />
                      </h5>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                      <div className="form-group mt-4">
                        <label htmlFor="quickReplyFormComment">
                          Your comment
                        </label>
                        <textarea
                          className="form-control"
                          id="quickReplyFormComment"
                          rows="5"
                        ></textarea>
                        <div className="text-center my-4">
                          <MDBBtn size="sm" color="primary">
                            Post
                          </MDBBtn>
                        </div>
                      </div>
                      <MDBMedia className="d-block d-md-flex mt-4">
                        <img
                          className="card-img-64 d-flex mx-auto mb-3"
                          src="https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg"
                          alt=""
                        />
                        <MDBMedia
                          body
                          className="text-center text-md-left ml-md-3 ml-0"
                        >
                          <h5 className="font-weight-bold mt-0">
                            Sylvester the Cat
                            <MDBIcon icon="reply" className="pull-right ml-2" />
                          </h5>
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est
                          laborum.
                        </MDBMedia>
                      </MDBMedia>
                    </MDBMedia>
                  </MDBMedia>
                </MDBMedia>
              </MDBMedia>
              <MDBMedia className="d-block d-md-flex mt-4">
                <img
                  className="card-img-64 d-flex mx-auto mb-3"
                  src="https://mdbootstrap.com/img/Photos/Avatars/img (30).jpg"
                  alt=""
                />
                <MDBMedia
                  body
                  className="text-center text-md-left ml-md-3 ml-0"
                >
                  <h5 className="font-weight-bold mt-0">
                    Caroline Horwitz
                    <MDBIcon icon="reply" className="pull-right ml-2" />
                  </h5>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </MDBMedia>
              </MDBMedia>
              <MDBPagination className="d-flex justify-content-center mt-5">
                <MDBPageItem disabled>
                  <MDBPageNav>
                    <span>First</span>
                  </MDBPageNav>
                </MDBPageItem>
                <MDBPageItem disabled>
                  <MDBPageNav aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </MDBPageNav>
                </MDBPageItem>
                <MDBPageItem active>
                  <MDBPageNav>
                    1 <span className="sr-only">(current)</span>
                  </MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav>2</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav>3</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav>4</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav>5</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav>&raquo;</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav>Last</MDBPageNav>
                </MDBPageItem>
              </MDBPagination>
            </MDBContainer>
          </>
        )}
      </div>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  selectedTalk: state.user.selectedTalk,
});

const mapDispatchToProps = (dispatch) => {
  return { getTalk: (uid, username) => dispatch(getTalkAction(uid, username)) };
};
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(TalkPage);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
