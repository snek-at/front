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
  MDBModalFooter,
  MDBModalHeader,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions,
} from "mdbreact";

//> Actions
// Functions to send data from the application to the store
import { addProfile } from "../../../../store/actions/personActions";
import { getGitlabServers } from "../../../../store/actions/generalActions";
//> OAuth
import { GitHubOAuth, InstagramOAuth } from "reactjs-oauth";
//> Style
import "./connectmodal.scss";
//#endregion

//#region > Components
class ConnectModal extends React.Component {
  state = { sourceList: [], gitlab_server: undefined };

  componentDidMount = () => {
    this.props.getGitlabServers();
  };

  componentDidUpdate = () => {
    if (!this.state.gitlab_servers && this.props.gitlabServer) {
      this.setState({
        gitlab_servers: this.props.gitlabServer,
      });
    }
  };

  // Activate or deactivate GitLab modal
  toggle = () => {
    this.setState({ modalGitLab: !this.state.modalGitLab });
  };

  addGitLab = () => {
    // Deactivate GitLab modal
    this.setState(
      {
        modalGitLab: false,
      },
      () => {
        const gitlab = {
          server: this.state.gitlab_server,
          username: this.state.gitlab_username,
        };

        this.props
          .addProfile({
            URL: gitlab.server,
            type: "GITLAB",
            authorization: undefined,
            username: gitlab.username,
          })
          .then(() => this.props.refetch());
      }
    );
  };

  oauthGitHubSuccess = (response) => {
    this.setState(
      {
        loadingGitHub: true,
      },
      async () => {
        this.props
          .addProfile({
            URL: "https://api.github.com/graphql",
            type: "GITHUB",
            authorization: response.accessToken,
            username: response.username,
          })
          .then(() => this.props.refetch());
      }
    );
  };

  oauthGitHubFailure = (response) => {
    //#ERROR
    console.error(response);
  };

  oauthInstagramSuccess = (response) => {
    this.setState(
      {
        loadingInstagram: true,
      },
      async () => {
        this.props
          .addProfile({
            URL: "https://graph.instagram.com",
            type: "INSTAGRAM",
            authorization: response.accessToken,
            username: response.username,
          })
          .then(() => this.props.refetch());
      }
    );
  };

  oauthInstagramFailure = (response) => {
    //#ERROR
    console.error(response);
  };

  handleSelectChange = (e) => {
    this.setState({
      gitlab_server: e[0],
    });
  };

  render() {
    const { selectedVideoId } = this.props;

    return (
      <>
        {this.props.isModal ? (
          <MDBModal
            size="md"
            backdrop={true}
            isOpen={true}
            toggle={this.props.toggle}
            centered
            animation="left"
          >
            <MDBModalBody>
              <div className="text-center" id="connectmodal">
                <div className="text-right small text-muted">
                  <span onClick={this.props.toggle} className="clickable">
                    Later
                  </span>
                </div>
                <p className="lead font-weight-bold mb-0">Connect your work</p>
                <p className="text-muted small">
                  You can add GitHub, Instagram and GitLab to share parts of
                  your work.
                </p>
                {this.props.disabled ? (
                  <>
                    <MDBBtn social="git" disabled>
                      <MDBIcon fab icon="github" size="lg" />
                    </MDBBtn>
                    <MDBBtn social="ins" disabled>
                      <MDBIcon fab icon="instagram" size="lg" />
                    </MDBBtn>
                    <MDBBtn color="orange" disabled>
                      <MDBIcon fab icon="gitlab" size="lg" />
                    </MDBBtn>
                  </>
                ) : (
                  <>
                    {!process.env.NODE_ENV ||
                    process.env.NODE_ENV === "development" ? (
                      <GitHubOAuth
                        authorizationUrl="https://github.com/login/oauth/authorize"
                        clientId="1440dd4c1d1c4c0fa124"
                        clientSecret="0723a2b5bfef27efc8b2d26d837ead239fa0b0e6"
                        redirectUri="http://localhost:3000/redirect"
                        onSuccess={this.oauthGitHubSuccess}
                        onFailure={this.oauthGitHubFailure}
                      />
                    ) : (
                      <GitHubOAuth
                        authorizationUrl="https://github.com/login/oauth/authorize"
                        clientId="2148629809594d57c113"
                        clientSecret="64a37e4846387cfcaea35d83afca3c9c8689628c"
                        redirectUri="https://snek.at/redirect"
                        onSuccess={this.oauthGitHubSuccess}
                        onFailure={this.oauthGitHubFailure}
                      />
                    )}
                    {!process.env.NODE_ENV ||
                    process.env.NODE_ENV === "development" ? (
                      <InstagramOAuth
                        authorizationUrl="https://api.instagram.com/oauth/authorize"
                        clientId="291591375471783"
                        clientSecret="d4e65f2dd4c72c3123cfbd84c19e7bee"
                        redirectUri="https://localhost:3000/redirect"
                        onSuccess={this.oauthInstagramSuccess}
                        onFailure={this.oauthInstagramFailure}
                      />
                    ) : (
                      <InstagramOAuth
                        authorizationUrl="https://api.instagram.com/oauth/authorize"
                        clientId="291591375471783"
                        clientSecret="d4e65f2dd4c72c3123cfbd84c19e7bee"
                        redirectUri="https://snek.at/redirect"
                        onSuccess={this.oauthInstagramSuccess}
                        onFailure={this.oauthInstagramFailure}
                      />
                    )}
                    <MDBBtn color="orange" onClick={this.toggle}>
                      <MDBIcon fab icon="gitlab" size="lg" />
                    </MDBBtn>
                  </>
                )}
                <p className="mt-3">SNEK's no fun without those connections!</p>
              </div>
            </MDBModalBody>
          </MDBModal>
        ) : (
          <div className="text-center" id="connectmodal">
            {this.props.disabled ? (
              <>
                <MDBBtn social="git" disabled>
                  <MDBIcon fab icon="github" size="lg" />
                </MDBBtn>
                <MDBBtn social="ins" disabled>
                  <MDBIcon fab icon="instagram" size="lg" />
                </MDBBtn>
                <MDBBtn color="orange" disabled>
                  <MDBIcon fab icon="gitlab" size="lg" />
                </MDBBtn>
              </>
            ) : (
              <>
                {!process.env.NODE_ENV ||
                process.env.NODE_ENV === "development" ? (
                  <GitHubOAuth
                    authorizationUrl="https://github.com/login/oauth/authorize"
                    clientId="1440dd4c1d1c4c0fa124"
                    clientSecret="0723a2b5bfef27efc8b2d26d837ead239fa0b0e6"
                    redirectUri="http://localhost:3000/redirect"
                    onSuccess={this.oauthGitHubSuccess}
                    onFailure={this.oauthGitHubFailure}
                  />
                ) : (
                  <GitHubOAuth
                    authorizationUrl="https://github.com/login/oauth/authorize"
                    clientId="2148629809594d57c113"
                    clientSecret="64a37e4846387cfcaea35d83afca3c9c8689628c"
                    redirectUri="https://snek.at/redirect"
                    onSuccess={this.oauthGitHubSuccess}
                    onFailure={this.oauthGitHubFailure}
                  />
                )}
                {!process.env.NODE_ENV ||
                process.env.NODE_ENV === "development" ? (
                  <InstagramOAuth
                    authorizationUrl="https://api.instagram.com/oauth/authorize"
                    clientId="291591375471783"
                    clientSecret="d4e65f2dd4c72c3123cfbd84c19e7bee"
                    redirectUri="https://localhost:3000/redirect"
                    onSuccess={this.oauthInstagramSuccess}
                    onFailure={this.oauthInstagramFailure}
                  />
                ) : (
                  <InstagramOAuth
                    authorizationUrl="https://api.instagram.com/oauth/authorize"
                    clientId="291591375471783"
                    clientSecret="d4e65f2dd4c72c3123cfbd84c19e7bee"
                    redirectUri="https://snek.at/redirect"
                    onSuccess={this.oauthInstagramSuccess}
                    onFailure={this.oauthInstagramFailure}
                  />
                )}
                <MDBBtn color="orange" onClick={this.toggle}>
                  <MDBIcon fab icon="gitlab" size="lg" />
                </MDBBtn>
              </>
            )}
          </div>
        )}
        {this.state.modalGitLab && (
          <MDBModal
            className="text-white"
            size="sm"
            backdrop={true}
            isOpen={this.state.modalGitLab}
            toggle={this.toggle}
            centered
            animation="left"
          >
            <MDBModalHeader
              className="text-center"
              titleClass="w-100 text-dark"
              tag="p"
            >
              <MDBIcon fab icon="gitlab" className="pr-2" />
              Add GitLab profile
            </MDBModalHeader>
            <MDBModalBody className="text-center">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="GitLab username"
                name="gitlab_username"
                onChange={(e) =>
                  this.setState({ [e.target.name]: e.target.value })
                }
                value={this.state.gitlab_username}
              />
              <MDBSelect
                outline
                getValue={this.handleSelectChange}
                className="mb-0"
              >
                <MDBSelectInput selected={this.state.gitlab_server} />
                <MDBSelectOptions>
                  <MDBSelectOption disabled>
                    Choose your organisation
                  </MDBSelectOption>
                  {this.state.gitlab_servers &&
                    this.state.gitlab_servers.map((source, i) => {
                      return (
                        <MDBSelectOption key={i} value={source.domain}>
                          {source.organisation}
                        </MDBSelectOption>
                      );
                    })}
                </MDBSelectOptions>
              </MDBSelect>
            </MDBModalBody>
            <MDBModalFooter className="justify-content-center">
              <MDBBtn
                color="orange"
                onClick={this.addGitLab}
                disabled={
                  !this.state.gitlab_username || !this.state.gitlab_servers
                }
              >
                <MDBIcon icon="plus-circle" className="mr-2" />
                Add
              </MDBBtn>
              <MDBBtn color="elegant" outline onClick={this.toggle}>
                Cancel
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        )}
      </>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  gitlabServer: state.general.gitlabServer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addProfile: (source) => dispatch(addProfile(source)),
    getGitlabServers: () => dispatch(getGitlabServers()),
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
export default connect(mapStateToProps, mapDispatchToProps)(ConnectModal);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
