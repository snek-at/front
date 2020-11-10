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
    followers: [],
    anonymous: undefined,
    loading: false,
  };

  componentDidMount = () => {
    const { loggedUser } = this.props;

    this.setState({ loading: true });

    // this.setState({
    //   followers: loggedUser.person?.followers,
    //   anonymous: loggedUser.anonymous,
    // });
  };

  // shouldComponentUpdate(prevProps, prevState) {
  //   console.log(
  //     "SHOUDL UPDATE?",
  //     this.props.loggedUser.person !== prevProps.loggedUser.person
  //   );
  //   return this.props.loggedUser.person !== prevProps.loggedUser.person;
  // }

  componentDidUpdate = (prevProps, prevState) => {
    const { loggedUser } = this.props;

    if (
      this.state.loading ||
      this.props.loggedUser.person !== prevProps.loggedUser.person
    ) {
      this.setState({
        followers: loggedUser.person.follows,
        anonymous: loggedUser.anonymous,
        loading: false,
      });
    }
  };

  follow = async (personToFollow) => {
    if (this.state.anonymous == false) {
      await this.props.follow(personToFollow);

      const followers = this.state.followers.concat({
        slug: `p-${personToFollow}`,
      });

      this.setState({ followers });
    } else {
      this.props.toContinue();
    }
  };

  unfollow = async (personToUnfollow) => {
    if (!this.state.anonymous) {
      await this.props.unfollow(personToUnfollow);

      let followers = [...this.state.followers];

      const idx = followers.findIndex(
        (o) => o.slug === `p-${personToUnfollow}`
      );

      followers.splice(idx, 1);

      this.setState({ followers });
    }
  };

  isFollowing = (follower) => {
    return this.state.followers.find((e) => e.slug === follower.slug);
  };

  render() {
    const { followType, fetchedPerson } = this.props;

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
