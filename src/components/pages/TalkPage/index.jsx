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
  MDBNavLink,
} from "mdbreact";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Actions
// Functions to send data from the application to the store
import { getTalk, addTalkComment } from "../../../store/actions/talkActions";
//> Style sheet
import "./talk.scss";
import { TalksTab } from "../../organisms/tabs";
//#endregion

//#region > Components
/** @class This component adds the Talk Page which displays a certain talk */
class TalkPage extends React.Component {
  state = {
    loading: true,
    talk: undefined,
    commentTextArea: "",
  };

  componentDidMount = () => {
    const { uid } = this.props.match?.params;

    this.props.getTalk(uid);
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
    const { fetchedTalk, loggedUser } = this.props;

    let talk;

    if (fetchedTalk) {
      talk = JSON.parse(JSON.stringify(fetchedTalk));

      talk.interval = {
        timeoutID: setInterval(() => this.updateIframe(talk), 4000),
        loaded: false,
      };
    }

    return (
      <div id="talk">
        {talk ? (
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
                          talk.interval.loaded = true;
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
                            src={talk?.owner?.avatarImage?.src}
                            alt="logo"
                            className="img-fluid"
                          />
                        </MDBCol>
                        <MDBCol lg="10">
                          <div className="d-flex justify-content-space-between">
                            <div>
                              <p className="lead font-weight-bold mb-1">
                                Owned by {talk.owner.title}
                              </p>
                              <p className="text-muted mb-1">
                                {talk.description}
                              </p>
                            </div>
                            {/* <div className="d-flex">
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
                            </div> */}
                          </div>
                          {/* <div>
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
                          </div> */}
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
                <p className="mr-4 mb-0">{talk.talkComments.length} comments</p>
              </MDBCardHeader>
              {talk.talkComments.map((comment) => {
                return (
                  <MDBMedia className="d-block d-md-flex mt-4">
                    <img
                      className="card-img-64 d-flex mx-auto mb-3"
                      src={comment.author.avatarImage?.src}
                      alt=""
                    />
                    <MDBMedia
                      body
                      className="text-center text-md-left ml-md-3 ml-0"
                    >
                      <h5 className="font-weight-bold mt-0">
                        {/* <a href ></a> */}
                        <MDBNavLink
                          link
                          to={`/u/${comment.author.slug.split("-")[1]}`}
                        >
                          {comment.author.title}
                          <MDBIcon icon="reply" className="pull-right ml-2" />
                        </MDBNavLink>
                      </h5>
                      {comment.text}
                    </MDBMedia>
                  </MDBMedia>
                );
              })}

              {loggedUser.anonymous === false && (
                <div className="form-group mt-4">
                  <label htmlFor="quickReplyFormComment">Your comment</label>
                  <textarea
                    className="form-control"
                    id="quickReplyFormComment"
                    rows="5"
                    value={this.state.commentTextArea}
                    onChange={(e) =>
                      this.setState({ commentTextArea: e.target.value })
                    }
                  ></textarea>
                  <div className="text-center my-4">
                    <MDBBtn
                      size="sm"
                      color="primary"
                      onClick={() => {
                        if (this.state.commentTextArea.length > 0) {
                          this.props
                            .addComment(talk.id, this.state.commentTextArea)
                            .then(this.props.getTalk(talk.id));
                        }
                      }}
                    >
                      Post
                    </MDBBtn>
                  </div>
                </div>
              )}

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
              </MDBPagination>
            </MDBContainer>
          </>
        ) : (
          <div className="text-center my-5 py-5">
            <div className="spinner-grow text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  loggedUser: state.user.user,
  fetchedTalk: state.talk.fetchedTalk,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getTalk: (uid) => dispatch(getTalk(uid)),
    addComment: (talkId, text, replyTo) =>
      dispatch(addTalkComment({ talkId, text, replyTo })),
  };
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
