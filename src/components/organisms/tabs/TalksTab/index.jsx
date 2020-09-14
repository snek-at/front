//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Runtime type checking for React props and similar objects
import PropTypes from "prop-types";
//> React Router bindings to DOM
import { withRouter, Link } from "react-router-dom";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
} from "mdbreact";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";
//> Additional
// Used to display the time in a readable format
import moment from "moment";

//> Style sheet
import "./talkstab.scss";
//> Actions
// Functions to send data from the application to the store
import { addTalk, deleteTalk } from "../../../../store/actions/personActions";
import { UploadModal } from "../../../molecules/modals";
//#endregion

//#region > Components
/** @class A component which lists all talks */
class TalkTab extends React.Component {
  state = {
    showUpload: false,
    loading: true,
  };

  handleUploadClose = () => {
    if (this.state.showUpload) {
      this.setState({
        showUpload: false,
      });
    }
  };

  handleSuccess = (event) => {
    this.props.addTalk(
      event.name,
      "",
      "https://docs.google.com/viewer?embedded=true&url=" + event.displayUrl,
      event.downloadUrl,
      event.path,
      event.html_url
    );
  };

  updateIframe = (talk) => {
    let iframe;

    if (talk.interval.loaded === false) {
      if (document.getElementById(talk.id)) {
        iframe = document.getElementById(talk.id);
        iframe.src = talk.displayUrl;
      }
    }
  };

  render() {
    const { loggedUser, fetchedPerson, talkList } = this.props;

    const talks = JSON.parse(JSON.stringify(talkList));

    if (talks) {
      talks.map((talk) => {
        talk.social = {
          likes: 17,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
        };

        talk.interval = {
          timeoutID: setInterval(() => this.updateIframe(talk), 4000),
          loaded: false,
        };

        return talk;
      });
    }

    return (
      <>
        <MDBRow>
          <MDBCol md="10">
            <h3 className="font-weight-bold">Talks</h3>
          </MDBCol>
          {loggedUser?.person?.slug === fetchedPerson.slug && (
            <MDBCol md="2">
              <MDBBtn
                color="green"
                outline
                size="md"
                onClick={() => this.setState({ showUpload: true })}
              >
                Upload
              </MDBBtn>
            </MDBCol>
          )}
        </MDBRow>
        <MDBRow className="talks-list">
          {talks &&
            talks.map((talk, i) => {
              return (
                <MDBCol md="6" key={i} className="mt-3">
                  <MDBCard>
                    <MDBCardHeader className="lead mb-1">
                      <MDBRow>
                        <MDBCol md="11">
                          {talk.title?.length > 25
                            ? talk.title?.substring(0, 25) + "..."
                            : talk.title}
                        </MDBCol>
                        <MDBCol md="1">
                          {loggedUser?.person?.slug === fetchedPerson.slug && (
                            <small
                              onClick={() => this.props.deleteTalk(talk.id)}
                            >
                              <MDBIcon
                                icon="trash-alt"
                                className="black-text font-weight-bold"
                              />
                            </small>
                          )}
                        </MDBCol>
                      </MDBRow>
                    </MDBCardHeader>
                    <Link
                      to={`/t/${talk.id}`}
                      params={{}}
                      rel="noopener noreferrer"
                    >
                      <MDBCardBody className="lead">
                        <div className="thumbnail-container">
                          <div className="thumbnail">
                            <iframe
                              id={talk.id}
                              src={talk.displayUrl}
                              onLoad={() => {
                                clearInterval(talk.interval.timeoutId);
                                talks[i].interval.loaded = true;
                              }}
                              frameBorder="0"
                            />
                          </div>
                        </div>
                      </MDBCardBody>
                    </Link>
                    <div className="clearfix" />
                    <MDBCardFooter>
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
                            published on{" "}
                            {moment(talk.createdAt).format("DD.MM.YYYY")}
                          </small>
                        </span>
                      )}
                      {talk.downloadUrl && (
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
                      <a
                        href={talk.repository?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div>
                          <img
                            src={talk.repository?.avatarUrl}
                            alt={talk.repository?.name}
                          />
                        </div>
                      </a>
                    </MDBCardFooter>
                  </MDBCard>
                </MDBCol>
              );
            })}
        </MDBRow>
        {this.state.showUpload && (
          <UploadModal
            {...this.props}
            acceptTypes={"application/pdf"}
            invalidTypeMessage={"Only PDF files can be uploaded!"}
            storageEngine={"anonfiles"}
            onSuccess={this.handleSuccess}
            closeModal={this.handleUploadClose}
          />
        )}
      </>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  loggedUser: state.user.user,
  fetchedPerson: state.person.fetchedPerson,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addTalk: (title, description, displayUrl, downloadUrl, path, url) =>
      dispatch(
        addTalk({ title, description, displayUrl, downloadUrl, path, url })
      ),
    deleteTalk: (id) => dispatch(deleteTalk(id)),
  };
};
//#endregion

//#region > PropTypes
TalkTab.propTypes = {
  talkList: PropTypes.array.isRequired,
};
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TalkTab)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
