//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { Link } from "react-router-dom";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBModal,
  MDBIcon,
  MDBModalBody,
  MDBBtn,
  MDBModalHeader,
  MDBRow,
  MDBCol,
} from "mdbreact";

//> Stylesheet
import "./follow.scss";
//#endregion

//#region > Components
/** @class A modal that shows a list of follows */
class FollowModal extends React.Component {
  state = {
    loggedUser: null,
  };

  componentDidMount = () => {
    const { loggedUser } = this.props;

    this.setState({
      loggedUser: loggedUser,
    });
  };

  componentDidUpdate = () => {
    const { loggedUser } = this.props;

    if (loggedUser !== this.state.loggedUser) {
      this.setState({
        loggedUser: loggedUser,
      });
    }
  };

  follow = (personToFollow) => {
    if (!this.props.loggedUser?.anonymous) {
      this.props.follow(personToFollow).then(() => {
        let loggedUser = this.props.loggedUser;
        let follows = [];

        for (let count in loggedUser.person.follows) {
          follows.push(loggedUser.person.follows[count]);
        }

        follows.push({ slug: "p-" + personToFollow });

        loggedUser.person.follows = follows;

        this.setState({ loggedUser });
      });
    } else {
      this.props.toContinue();
    }
  };

  unfollow = (personToUnfollow) => {
    this.props.unfollow(personToUnfollow).then(() => {
      let loggedUser = this.state.loggedUser;
      let follows = [];

      for (let count in loggedUser?.person?.follows) {
        if (loggedUser.person.follows[count].slug !== "p-" + personToUnfollow) {
          follows.push(loggedUser.person.follows[count]);
        }
      }

      loggedUser.person.follows = follows;

      this.setState({ loggedUser });
    });
  };

  isFollowing = (follower) => {
    const { loggedUser } = this.state;

    for (let count in loggedUser?.person?.follows) {
      if (loggedUser.person.follows[count].slug === follower.slug) {
        return true;
      }
    }

    return false;
  };

  render() {
    const { followType, fetchedPerson } = this.props;
    console.log("XD");
    return (
      <MDBModal
        modalStyle="white"
        className="text-dark"
        size="md"
        id="follow"
        backdrop={true}
        isOpen={true}
        toggle={this.props.closeModal}
      >
        <MDBModalHeader
          className="text-center text-dark donate"
          titleClass="w-100"
          tag="p"
        >
          {followType}
        </MDBModalHeader>
        <MDBModalBody>
          {followType === "Followers" &&
            fetchedPerson.followedBy.map((follower, i) => {
              return (
                <div key={i}>
                  <MDBRow>
                    <MDBCol size="2">
                      <img
                        src={
                          follower.avatarImage?.src
                            ? follower.avatarImage?.src
                            : "https://octodex.github.com/images/nyantocat.gif"
                        }
                      />
                    </MDBCol>
                    <MDBCol size="6">
                      <strong>{follower.slug.substring(2)}</strong>
                      <p>{follower.firstName + " " + follower.lastName}</p>
                    </MDBCol>
                    {follower.slug !== this.props.loggedUser?.person?.slug && (
                      <MDBCol size="4">
                        {this.isFollowing(follower) ? (
                          <MDBBtn
                            color="green"
                            outline
                            size="md"
                            onClick={() =>
                              this.unfollow(follower.slug.substring(2))
                            }
                          >
                            <MDBIcon icon="minus-circle" className="mr-2" />
                            Unfollow
                          </MDBBtn>
                        ) : (
                          <MDBBtn
                            color="green"
                            outline
                            size="md"
                            onClick={() =>
                              this.follow(follower.slug.substring(2))
                            }
                          >
                            <MDBIcon icon="plus-circle" className="mr-2" />
                            Follow
                          </MDBBtn>
                        )}
                      </MDBCol>
                    )}
                  </MDBRow>
                </div>
              );
            })}
          {followType === "Following" &&
            fetchedPerson.follows.map((follower, i) => {
              return (
                <div key={i}>
                  <MDBRow>
                    <MDBCol size="2">
                      {
                        <img
                          src={
                            follower.avatarImage?.src
                              ? follower.avatarImage?.src
                              : "https://octodex.github.com/images/nyantocat.gif"
                          }
                        />
                      }
                    </MDBCol>
                    <MDBCol size="6">
                      <strong>{follower.slug.substring(2)}</strong>
                      <p>{follower.firstName + " " + follower.lastName}</p>
                    </MDBCol>
                    {follower.slug !== this.props.loggedUser?.person?.slug && (
                      <MDBCol size="4">
                        {this.isFollowing(follower) ? (
                          <MDBBtn
                            color="green"
                            outline
                            size="md"
                            onClick={() =>
                              this.unfollow(follower.slug.substring(2))
                            }
                          >
                            <MDBIcon icon="minus-circle" className="mr-2" />
                            Unfollow
                          </MDBBtn>
                        ) : (
                          <MDBBtn
                            color="green"
                            outline
                            size="md"
                            onClick={() =>
                              this.follow(follower.slug.substring(2))
                            }
                          >
                            <MDBIcon icon="plus-circle" className="mr-2" />
                            Follow
                          </MDBBtn>
                        )}
                      </MDBCol>
                    )}
                  </MDBRow>
                </div>
              );
            })}
        </MDBModalBody>
      </MDBModal>
    );
  }
}
//#endregion

//#region > Exports
//> Default Component
export default FollowModal;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
