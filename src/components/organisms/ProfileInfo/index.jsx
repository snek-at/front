//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBBtn,
  MDBBadge,
  MDBView,
  MDBMask,
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBIcon,
  MDBTooltip,
} from "mdbreact";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Components
import { LanguageChart } from "../../atoms";
//> Style Sheet
import "./profileinfo.scss";
//#endregion

//#region > Components
/** @class This component displays personal information and status of a user */
class ProfileInfo extends React.Component {
  state = { limitLanguages: true };

  componentDidMount = () => {
    const { fetchedUser } = this.props;

    if (fetchedUser && !this.state.sources) {
      this.displaySources(fetchedUser.platformData.profile.sources);
    }
  };

  displaySources = (sources) => {
    let res = sources.map((source, i) => {
      switch (source.source) {
        case "github":
          return "github";
        case "gitlab":
          return "gitlab";
        case "bitbucket":
          return "bitbucket";
        default:
          return false;
      }
    });

    this.setState({
      sources: res,
    });
  };

  render() {
    const { fetchedUser } = this.props;

    return (
      <div className="social">
        <MDBView>
          <img
            className="img-fluid main-avatar"
            src={fetchedUser && fetchedUser.platformData.user.avatarUrl}
          />
          <MDBMask />
        </MDBView>
        <div className="bg-elegant py-3 px-3">
          <h4 className="mb-0">
            {fetchedUser && fetchedUser.platformData.user.firstName && (
              <>{fetchedUser.platformData.user.firstName}</>
            )}{" "}
            {fetchedUser && fetchedUser.platformData.user.lastName && (
              <>{fetchedUser.platformData.user.lastName}</>
            )}
          </h4>
          {fetchedUser &&
            fetchedUser.platformData.user.settings &&
            fetchedUser.platformData.user.settings.showLocalRanking && (
              <p className="mb-1 text-muted">
                <small>
                  <a href="#!">#3</a> in your region
                </small>
              </p>
            )}
          {fetchedUser && fetchedUser.platformData.user.company && (
            <>
              {fetchedUser &&
                fetchedUser.platformData.user.settings.showCompanyPublic && (
                  <small className="text-muted py-3">
                    {fetchedUser.platformData.user.company}
                  </small>
                )}
            </>
          )}
          <div className="badges">
            {fetchedUser && fetchedUser.accessories.badges && (
              <>
                {fetchedUser.accessories.badges.bids.map((bid, i) => {
                  switch (bid) {
                    case "6403bf4d17b8472735a93b71a37e0bd0":
                      return (
                        <MDBBadge color="secondary-color" key={i}>
                          Alpha
                        </MDBBadge>
                      );
                  }
                })}
              </>
            )}
          </div>
          {fetchedUser && fetchedUser.platformData.profile.statusMessage && (
            <div className="d-flex pt-3">
              {fetchedUser.platformData.profile.statusEmojiHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: fetchedUser.platformData.profile.statusEmojiHTML,
                  }}
                />
              )}
              <small className="px-1">
                {fetchedUser.platformData.profile.statusMessage}
              </small>
            </div>
          )}
        </div>
        <div className="py-3 follow text-center">
          <MDBBtn color="green" outline size="md">
            <MDBIcon icon="plus-circle" className="mr-2" />
            Follow
          </MDBBtn>
          <MDBBtn color="primary" outline size="md">
            <MDBIcon icon="angle-up" className="mr-2" />
            Upvote
          </MDBBtn>
        </div>
        <div className="bg-light py-3 px-2">
          <p>Connected accounts</p>
          <div className="connected mt-2 text-muted">
            <MDBIcon
              fab
              icon="github"
              size="lg"
              className={
                this.state.sources && this.state.sources.includes("github")
                  ? "active"
                  : ""
              }
            />
            <MDBIcon
              fab
              icon="gitlab"
              size="lg"
              className={
                this.state.sources && this.state.sources.includes("gitlab")
                  ? "active"
                  : ""
              }
            />
            <MDBIcon
              fab
              icon="bitbucket"
              size="lg"
              className={
                this.state.sources && this.state.sources.includes("bitbucket")
                  ? "active"
                  : ""
              }
            />
          </div>
          <hr />
          <p>Organisations</p>
          {fetchedUser && (
            <div
              className={
                fetchedUser.platformData.profile.organizations.length >= 5
                  ? "orgs text-center"
                  : "orgs"
              }
            >
              {fetchedUser.platformData.profile.organizations.length > 0 ? (
                <>
                  {fetchedUser.platformData.profile.organizations.map(
                    (org, i) => {
                      return (
                        <MDBPopover placement="top" popover clickable key={i}>
                          <MDBBtn color="link">
                            <div className="org">
                              {org.avatarUrl ? (
                                <img src={org.avatarUrl} alt={org.name} />
                              ) : (
                                <MDBIcon
                                  icon="sitemap"
                                  className="text-muted"
                                  size="lg"
                                />
                              )}
                              {org.members && (
                                <div className="tag">{org.members.length}</div>
                              )}
                            </div>
                          </MDBBtn>
                          <div>
                            <MDBPopoverHeader>
                              <div>
                                {org.platformName}/
                                <strong className="text-dark">
                                  {org.name}
                                </strong>
                              </div>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <small>
                                    {org.members
                                      ? org.members.length
                                      : "Unknown"}{" "}
                                    members
                                  </small>
                                </div>
                                <div className="member-list">
                                  <div>
                                    {org.members &&
                                      org.members.length > 0 &&
                                      org.members
                                        .slice(0, 8)
                                        .map((member, m) => {
                                          return (
                                            <MDBTooltip
                                              domElement
                                              tag="span"
                                              placement="top"
                                              key={m}
                                            >
                                              <a
                                                href={member.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <img
                                                  src={member.avatarUrl}
                                                  alt={member.username}
                                                />
                                              </a>
                                              <span>{member.username}</span>
                                            </MDBTooltip>
                                          );
                                        })}
                                  </div>
                                  {org.members && org.members.length > 9 && (
                                    <div className="text-muted text-right">
                                      {org.platformName === "github" && (
                                        <a
                                          href={`https://www.github.com/orgs/${org.name}/people`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <small>Show all</small>
                                        </a>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </MDBPopoverHeader>
                            <MDBPopoverBody>
                              <p className="my-2">{org.description}</p>
                              <a
                                href={org.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Show more
                                <MDBIcon
                                  icon="external-link-alt"
                                  className="ml-1"
                                />
                              </a>
                            </MDBPopoverBody>
                          </div>
                        </MDBPopover>
                      );
                    }
                  )}
                </>
              ) : (
                <small>
                  {fetchedUser.username} hasn't joined an organisation yet.
                </small>
              )}
            </div>
          )}
          {fetchedUser.platformData?.statistic?.languages?.length > 0 && (
            <div className="px-1">
              <hr />
              <p>Top languages</p>
              <LanguageChart
                languages={fetchedUser.platformData.statistic.languages}
                height={10}
              />
              {fetchedUser.platformData.statistic.languages
                .slice(
                  0,
                  this.state.limitLanguages
                    ? 3
                    : fetchedUser.platformData.statistic.languages.length - 1
                )
                .map((language, i) => {
                  return (
                    <small className="text-left text-muted d-block" key={i}>
                      <div className="d-flex justify-content-between">
                        <div>
                          <MDBIcon
                            icon="square"
                            className="pr-1"
                            style={{
                              color: language.color,
                            }}
                          />
                          <span>{language.name}</span>
                        </div>
                        <span className="text-muted small">
                          {language.share}%
                        </span>
                      </div>
                    </small>
                  );
                })}
              {this.state.limitLanguages &&
              fetchedUser.platformData.statistic.languages.length > 3 ? (
                <p
                  className="small clickable blue-text d-inline"
                  onClick={() => this.setState({ limitLanguages: false })}
                >
                  Show more
                </p>
              ) : (
                <p
                  className="small clickable blue-text d-inline"
                  onClick={() => this.setState({ limitLanguages: true })}
                >
                  Show less
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  fetchedUser: state.user.fetchedUser,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
