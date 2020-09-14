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
  MDBInput,
  MDBAlert,
  MDBView,
  MDBMask,
  MDBCard,
} from "mdbreact";

//> Actions
// Functions to send data from the application to the store
import { getInstagramPosts } from "../../../../store/actions/personActions";
//> Style
import "./instagramselector.scss";
//#endregion

//#region > Dummy data
const DUMMY = [
  "https://mdbootstrap.com/img/Photos/Others/images/10.jpg",
  "https://mdbootstrap.com/img/Photos/Others/images/20.jpg",
  "https://mdbootstrap.com/img/Photos/Others/images/30.jpg",
  "https://mdbootstrap.com/img/Photos/Others/images/40.jpg",
];
//#endregion

//#region > Components
class InstagramSelectorModal extends React.Component {
  state = { selection: [] };

  componentDidMount = () => {
    this.init();
  };

  init = async (refetch) => {
    let next;
    let posts;

    if (
      localStorage.getItem("instagram_posts") &&
      localStorage.getItem("instagram_posts") !== "undefined" &&
      !refetch
    ) {
      posts = JSON.parse(localStorage.getItem("instagram_posts"));
      next = undefined;
    } else {
      const res = await this.props.getInstagramPosts();

      posts = res.posts;
      next = res.next;
    }

    this.setState(
      {
        posts,
        next,
        selection: this.props.selection ? this.props.selection : [],
      },
      () =>
        localStorage.setItem(
          "instagram_posts",
          JSON.stringify(this.state.posts)
        )
    );
  };

  updateList = (picture) => {
    console.log("ohnonono", picture);
    const current = this.state.selection;

    if (current.filter((item) => item.url === picture.mediaLink).length > 0) {
      const index = current.findIndex((x) => x.url === picture.mediaLink);

      if (index > -1) {
        current.splice(index, 1);
      }

      this.setState({
        selection: current,
      });
    } else {
      const pic = {
        url: picture.mediaLink,
        linkType: "INSTAGRAM",
      };

      this.setState({
        selection: [...current, pic],
      });
    }
  };

  loadMore = async () => {
    const isLocalStorage = localStorage.getItem("instagram_posts")
      ? true
      : false;

    if (isLocalStorage) {
      await this.init(true);
    }

    // const morePosts

    const nextFns = this.state.next;
    let nextPosts = [];
    let nextNextFns = [];

    for (const index in nextFns) {
      const fn = nextFns[index];
      const res = await fn();

      nextPosts.concat(res.posts);

      if (res.nex) {
        nextNextFns.concat(res.nex);
      }
    }

    this.setState({
      posts: nextPosts,
      next: nextNextFns,
    });
  };

  render() {
    console.log(this.state);

    return (
      <>
        <MDBModal
          isOpen={true}
          toggle={this.props.toggle}
          size="lg"
          centered
          animation="left"
          id="selectorModal"
        >
          <MDBModalBody className="p-2 text-center">
            <div className="d-flex justify-content-between align-items-center">
              <p className="lead mb-0">Select Instagram images</p>
              <div>
                <MDBBtn color="blue" onClick={() => this.init(true)}>
                  Refresh
                </MDBBtn>
                <MDBBtn
                  color="green"
                  onClick={() => this.props.save(this.state.selection)}
                >
                  Confirm selection
                </MDBBtn>
              </div>
            </div>
            <div className="mt-3 card-columns">
              {this.state.posts &&
                this.state.posts.map((picture, i) => {
                  const selected =
                    this.state.selection.filter(
                      (item) => item.url === picture.mediaLink
                    ).length > 0
                      ? true
                      : false;

                  if (picture.mediaType === "IMAGE") {
                    return (
                      <MDBCard
                        className={selected ? "mb-3 selected" : "mb-3"}
                        key={"selector-" + i}
                      >
                        <MDBView>
                          <img src={picture.mediaLink} className="img-fluid" />
                          <MDBMask
                            onClick={() => this.updateList(picture)}
                            className="text-white d-flex justify-content-center align-items-center"
                          >
                            {selected && (
                              <MDBIcon icon="check-circle" size="3x" />
                            )}
                          </MDBMask>
                        </MDBView>
                      </MDBCard>
                    );
                  } else {
                    return null;
                  }
                })}
            </div>
            {this.state.posts && (
              <div className="text-center">
                <MDBBtn
                  color="elegant"
                  onClick={() => this.loadMore()}
                  disabled
                >
                  Load more
                </MDBBtn>
              </div>
            )}
          </MDBModalBody>
        </MDBModal>
      </>
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
    getInstagramPosts: (id) => dispatch(getInstagramPosts(id)),
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstagramSelectorModal);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
