//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> React Router bindings to DOM
import { withRouter } from "react-router-dom";
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

//> CSS
import "./talkstab.scss";
//> Modules
import { UploadModal } from "../../../molecules/modals";
//#endregion

//#region > Components
/** @class A component which lists all talks */
class Talks extends React.Component {
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
    const { globalState, globalFunctions } = this.props;
    const talkList = globalState?.fetchedUser?.platformData?.talks;
    const { deleteTalk } = globalFunctions;

    if (talkList) {
      talkList.map((talk) => {
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
          {globalState.loggedUser && (
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
          {talkList &&
            talkList.map((talk, i) => {
              return (
                <MDBCol md="6" key={i} className="mt-3">
                  <MDBCard>
                    <MDBCardHeader className="lead mb-1">
                      <MDBRow>
                        <MDBCol md="11">
                          {talk.name.length > 25
                            ? talk.name.substring(0, 25) + "..."
                            : talk.name}
                        </MDBCol>
                        <MDBCol md="1">
                          {globalState.loggedUser && (
                            <small onClick={() => deleteTalk(talk)}>
                              <MDBIcon
                                icon="trash-alt"
                                className="black-text font-weight-bold"
                              />
                            </small>
                          )}
                        </MDBCol>
                      </MDBRow>
                    </MDBCardHeader>
                    <a
                      href={
                        "/t/" +
                        this.props.match.params.username +
                        "/" +
                        talk.uid
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MDBCardBody className="lead">
                        <div className="thumbnail-container">
                          <div className="thumbnail">
                            <iframe
                              id={talk.uid}
                              src={talk.displayUrl}
                              onLoad={() => {
                                clearInterval(talk.interval.timeoutId);
                                talkList[i].interval.loaded = true;
                              }}
                              frameBorder="0"
                            />
                          </div>
                        </div>
                      </MDBCardBody>
                    </a>
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
                            published on {talk.social.date}
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
                        href={talk.repository.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div>
                          <img
                            src={talk.repository.avatarUrl}
                            alt={talk.repository.name}
                          />
                          <small>
                            Owned by {talk.repository.owner.username}
                          </small>
                        </div>
                      </a>
                    </MDBCardFooter>
                  </MDBCard>
                </MDBCol>
              );
            })}
        </MDBRow>
        {this.state.showUpload && (
          <UploadModal {...this.props} closeModal={this.handleUploadClose} />
        )}
      </>
    );
  }
}
//#endregion

//#region > Exports
//> Default Class
export default withRouter(Talks);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
