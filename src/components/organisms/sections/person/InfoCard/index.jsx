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
  MDBRow,
  MDBCol,
} from "mdbreact";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Components
import { LanguageChart } from "../../../../atoms";
import {
  ToContinueModal,
  FollowModal,
  LikesModal,
} from "../../../../molecules/modals";
//> Actions
// Functions to send data from the application to the store
import {
  follow,
  unfollow,
  like,
  unlike,
} from "../../../../../store/actions/personActions";
//> Style Sheet
import "./infocard.scss";
//#endregion

//#region > Components
/** @class This component displays personal information and status of a user */
class InfoCard extends React.Component {
  state = {
    limitLanguages: true,
    showToContinue: false,
    showFollow: false,
    showLikes: false,
    followType: "",
    fetchedPerson: null,
  };

  componentDidMount = () => {
    const { fetchedPerson } = this.props;

    this.setState({
      fetchedPerson: fetchedPerson,
    });
  };

  componentDidUpdate = () => {
    const { fetchedPerson } = this.props;

    if (fetchedPerson !== this.state.fetchedPerson) {
      this.setState({
        fetchedPerson: fetchedPerson,
      });
    }
  };

  follow = (personToFollow) => {
    if (!this.props.loggedUser?.anonymous) {
      this.props.follow(personToFollow).then(() => {
        let fetchedPerson = this.state.fetchedPerson;
        let followedBy = [];

        for (let count in fetchedPerson.followedBy) {
          followedBy.push(fetchedPerson.followedBy[count]);
        }

        followedBy.push(this.props.loggedUser.person);

        fetchedPerson.followedBy = followedBy;

        this.setState({ fetchedPerson });
      });
    } else {
      this.setState({ showToContinue: true });
    }
  };

  unfollow = (personToUnfollow) => {
    if (!this.props.loggedUser?.anonymous) {
      this.props.unfollow(personToUnfollow).then(() => {
        let fetchedPerson = this.state.fetchedPerson;
        let followedBy = [];

        const { loggedUser } = this.props;

        for (let count in fetchedPerson.followedBy) {
          if (fetchedPerson.followedBy[count].slug !== loggedUser.person.slug) {
            followedBy.push(fetchedPerson.followedBy[count]);
          }
        }

        fetchedPerson.followedBy = followedBy;

        this.setState({ fetchedPerson });
      });
    } else {
      this.setState({ showToContinue: true });
    }
  };

  isFollower = () => {
    if (!this.props.loggedUser?.anonymous) {
      const loggedUser = this.props.loggedUser.username;
      const followerList = this.state.fetchedPerson?.followedBy;

      for (let count in followerList) {
        let follower = followerList[count];

        if (follower.slug.substring(2) === loggedUser) {
          return true;
        }
      }
    }

    return false;
  };

  like = (personToLike) => {
    if (!this.props.loggedUser?.anonymous) {
      this.props.like(personToLike).then(() => {
        let fetchedPerson = this.state.fetchedPerson;
        let likedBy = [];

        for (let count in fetchedPerson.likedBy) {
          likedBy.push(fetchedPerson.likedBy[count]);
        }

        likedBy.push(this.props.loggedUser.person);

        fetchedPerson.likedBy = likedBy;

        this.setState({ fetchedPerson });
      });
    } else {
      this.setState({ showToContinue: true });
    }
  };

  unlike = (personToUnlike) => {
    if (!this.props.loggedUser?.anonymous) {
      this.props.unlike(personToUnlike).then(() => {
        let fetchedPerson = this.state.fetchedPerson;
        let likedBy = [];

        const { loggedUser } = this.props;

        for (let count in fetchedPerson.likedBy) {
          if (fetchedPerson.likedBy[count].slug !== loggedUser.person.slug) {
            likedBy.push(fetchedPerson.likedBy[count]);
          }
        }

        fetchedPerson.likedBy = likedBy;

        this.setState({ fetchedPerson });
      });
    } else {
      this.setState({ showToContinue: true });
    }
  };

  isLiker = () => {
    if (!this.props.loggedUser?.anonymous) {
      const loggedUser = this.props.loggedUser.username;
      const likerList = this.state.fetchedPerson?.likedBy;

      for (let count in likerList) {
        let liker = likerList[count];

        if (liker.slug.substring(2) === loggedUser) {
          return true;
        }
      }
    }

    return false;
  };

  handleModalClose = () => {
    if (this.state.showToContinue) {
      this.setState({
        showToContinue: false,
      });
    } else if (this.state.showFollow) {
      this.setState({
        showFollow: false,
      });
    } else if (this.state.showLikes) {
      this.setState({
        showLikes: false,
      });
    }
  };

  toContinue = () => {
    this.handleModalClose();

    this.setState({
      showToContinue: true,
    });
  };

  render() {
    const { fetchedPerson, loggedUser } = this.props;

    return (
      <>
        <div className="social">
          <MDBView>
            <img
              className="img-fluid main-avatar"
              src={
                fetchedPerson?.avatarImage?.src
                  ? fetchedPerson.avatarImage.src
                  : ""
              }
            />
            <MDBMask />
          </MDBView>
          <div className="bg-elegant py-3 px-3">
            <h4 className="mb-0">
              {fetchedPerson?.firstName && <>{fetchedPerson.firstName}</>}{" "}
              {fetchedPerson?.lastName && <>{fetchedPerson.lastName}</>}
            </h4>
            {fetchedPerson?.showLocalRanking && (
              <p className="mb-1 text-muted">
                <small>
                  <a href="#!">#3</a> in your region
                </small>
              </p>
            )}
            {fetchedPerson?.company && (
              <>
                {fetchedPerson?.showCompanyPublic && (
                  <small className="text-muted py-3">
                    {fetchedPerson.company}
                  </small>
                )}
              </>
            )}
            <MDBRow>
              <MDBCol
                onClick={() =>
                  this.setState({ showFollow: true, followType: "Followers" })
                }
              >
                <strong>{this.state.fetchedPerson?.followedBy.length} </strong>
                Followers
              </MDBCol>
              <MDBCol
                onClick={() =>
                  this.setState({ showFollow: true, followType: "Following" })
                }
              >
                <strong>{this.state.fetchedPerson?.follows.length} </strong>
                Following
              </MDBCol>
            </MDBRow>
            <div className="likes">
              <MDBRow>
                <MDBCol onClick={() => this.setState({ showLikes: true })}>
                  <strong>{this.state.fetchedPerson?.likedBy.length} </strong>
                  Likes
                </MDBCol>
              </MDBRow>
            </div>
            <div className="badges">
              {fetchedPerson?.bids && (
                <>
                  {fetchedPerson.bids.map((bid, i) => {
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
            {fetchedPerson?.status && (
              <div className="d-flex pt-3">
                {fetchedPerson.status && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: fetchedPerson.status,
                    }}
                  />
                )}
              </div>
            )}
          </div>
          {loggedUser.person?.slug !== fetchedPerson.slug && (
            <div className="py-3 social text-center">
              {this.isFollower() ? (
                <MDBBtn
                  color="green"
                  outline
                  size="md"
                  onClick={() => this.unfollow(fetchedPerson.slug.substring(2))}
                >
                  <MDBIcon icon="minus-circle" className="mr-2" />
                  Unfollow
                </MDBBtn>
              ) : (
                <MDBBtn
                  color="green"
                  outline
                  size="md"
                  onClick={() => this.follow(fetchedPerson.slug.substring(2))}
                >
                  <MDBIcon icon="plus-circle" className="mr-2" />
                  Follow
                </MDBBtn>
              )}
              {this.isLiker() ? (
                <MDBBtn
                  color="primary"
                  outline
                  size="md"
                  onClick={() => this.unlike(fetchedPerson.slug.substring(2))}
                >
                  <MDBIcon icon="angle-down" className="mr-2" />
                  Unlike
                </MDBBtn>
              ) : (
                <MDBBtn
                  color="primary"
                  outline
                  size="md"
                  onClick={() => this.like(fetchedPerson.slug.substring(2))}
                >
                  <MDBIcon icon="angle-up" className="mr-2" />
                  Like
                </MDBBtn>
              )}
            </div>
          )}
          <div className="bg-light py-3 px-2">
            <p>Connected accounts</p>
            <div className="connected mt-2 text-muted">
              <MDBIcon
                fab
                icon="github"
                size="lg"
                className={
                  fetchedPerson?.profiles.some(
                    (e) => e.sourceType == "GITHUB" && e.isActive
                  )
                    ? "active"
                    : ""
                }
              />
              <MDBIcon
                fab
                icon="gitlab"
                size="lg"
                className={
                  fetchedPerson?.profiles.some(
                    (e) => e.sourceType == "GITLAB" && e.isActive
                  )
                    ? "active"
                    : ""
                }
              />
              <MDBIcon
                fab
                icon="instagram"
                size="lg"
                className={
                  fetchedPerson?.profiles.some(
                    (e) => e.sourceType == "INSTAGRAM" && e.isActive
                  )
                    ? "active"
                    : ""
                }
              />
            </div>
            <hr />
            <p>Organisations</p>
            {fetchedPerson && (
              <div
                className={
                  fetchedPerson.person.organisations.length >= 5
                    ? "orgs text-center"
                    : "orgs"
                }
              >
                {fetchedPerson.person.organisations.length > 0 ? (
                  <>
                    {fetchedPerson.person.organisations.map((org, i) => {
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
                    })}
                  </>
                ) : (
                  <small>
                    {fetchedPerson.title} hasn't joined an organisation yet.
                  </small>
                )}
              </div>
            )}
            {fetchedPerson.person.statistic?.languages?.length > 0 && (
              <div className="px-1">
                <hr />
                <p>Top languages</p>
                <LanguageChart
                  languages={fetchedPerson.person.statistic.languages}
                  height={10}
                />
                {fetchedPerson.person.statistic.languages
                  .slice(
                    0,
                    this.state.limitLanguages
                      ? 3
                      : fetchedPerson.person.statistic.languages.length - 1
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
                fetchedPerson.person.statistic.languages.length > 3 ? (
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
        {this.state.showToContinue && (
          <ToContinueModal {...this.props} closeModal={this.handleModalClose} />
        )}
        {this.state.showFollow && (
          <FollowModal
            closeModal={this.handleModalClose}
            fetchedPerson={this.state.fetchedPerson}
            followType={this.state.followType}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            loggedUser={this.props.loggedUser}
            toContinue={this.toContinue}
          />
        )}
        {this.state.showLikes && (
          <LikesModal
            closeModal={this.handleModalClose}
            fetchedPerson={this.state.fetchedPerson}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            loggedUser={this.props.loggedUser}
            toContinue={this.toContinue}
          />
        )}
      </>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  fetchedPerson: state.person.fetchedPerson,
  loggedUser: state.user.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (personToFollow) => dispatch(follow(personToFollow)),
    unfollow: (personToUnfollow) => dispatch(unfollow(personToUnfollow)),
    like: (personToLike) => dispatch(like(personToLike)),
    unlike: (personToUnlike) => dispatch(unlike(personToUnlike)),
  };
};
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(InfoCard);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
