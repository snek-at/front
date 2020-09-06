//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter } from "react-router-dom";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";
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
  MDBProgress,
  MDBTooltip,
  MDBIcon,
  MDBTimeline,
  MDBTimelineStep,
  MDBView,
  MDBMask,
} from "mdbreact";

//> Components
import {
  ImageModal,
  InstagramSelectorModal,
} from "../../../../molecules/modals";
//> Style
import "./aigallery.scss";
//#endregion

//#region > Dummy data
const DUMMY = [
  {
    img: {
      url: "https://mdbootstrap.com/img/Photos/Others/images/43.jpg",
      alt: "Dummy image",
    },
    data: {
      title: "Dummy",
    },
  },
  {
    img: {
      url: "https://mdbootstrap.com/img/Photos/Others/images/12.jpg",
      alt: "Dummy image",
    },
    data: {
      title: "Dummy 2",
    },
  },
];
//#endregion

//#region > Components
class AIGallery extends React.Component {
  state = { modalPicture: false };

  componentDidMount = () => {
    this.setState({
      images: DUMMY,
    });
  };

  toggle = (modal) => {
    this.setState({
      [modal]: !this.state[modal],
      selectedPicture: undefined,
    });
  };

  save = (urlList) => {
    const res = urlList.selection.map((url) => {
      return {
        img: {
          url,
        },
      };
    });

    this.setState({
      images: [...this.state.images, ...res],
      modalSelectPictures: false,
    });
  };

  removeImage = (url) => {
    // TODO
  };

  render() {
    const { loggedUser } = this.props;

    return (
      <div className="py-5">
        <div className="mb-4 text-right">
          <MDBBtn
            color="green"
            onClick={() => this.setState({ modalSelectPictures: true })}
          >
            Select images
          </MDBBtn>
        </div>
        <MDBRow id="gallery">
          {this.state.images &&
            this.state.images.map((picture, i) => {
              console.log("YE", picture);
              return (
                <MDBCol lg="4" key={"picture-" + i}>
                  <MDBCard>
                    <MDBCardBody>
                      <MDBView>
                        <img
                          src={picture.img.url}
                          alt={picture.img.alt}
                          className="img-fluid"
                        />
                        <MDBMask
                          onClick={() =>
                            this.setState({
                              modalPicture: true,
                              selectedPicture: picture,
                            })
                          }
                        />
                      </MDBView>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              );
            })}
        </MDBRow>
        {this.state.modalPicture && this.state.selectedPicture && (
          <ImageModal
            toggle={() => this.toggle("modalPicture")}
            selectedPicture={this.state.selectedPicture}
          />
        )}
        {this.state.modalSelectPictures && (
          <InstagramSelectorModal
            toggle={() => this.toggle("modalSelectPictures")}
            save={this.save}
          />
        )}
      </div>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => {
  return {};
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AIGallery)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
