//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { Link } from "react-router-dom";
// Contains the functionality for uploading a file
import Dropzone from "react-dropzone";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBCol,
  MDBInput,
  MDBTabPane,
  MDBRow,
  MDBSelect,
  MDBSelectOption,
  MDBSelectOptions,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBAnimation,
  MDBIcon,
  MDBTabContent,
  MDBView,
  MDBMask,
  MDBSelectInput,
  MDBBtn,
} from "mdbreact";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Actions
// Functions to send data from the application to the store
// import {
//   readCacheAction,
//   saveSettingsActions,
// } from "../../../store/actions/userActions";
//> Components
// Profile Picture Editor
import { ProfilePictureModal } from "../../../components/molecules/modals";
//> Style sheet
import "./settings.scss";
import { updateSettings } from "../../../store/actions/personActions";
//#endregion

//#region > Components
/**
 * @class This component adds the Settings page,
 *        used to change user information like.
 */
class SettingsPage extends React.Component {
  state = {
    loading: true,
    person: null,
    showProfilePicture: false,
    showNotification: false,
    avatarFile: undefined,
    activeItem: 0,
    tabItems: [
      { name: "Profile", icon: "" },
      { name: "Customization", icon: "" },
      { name: "Account", icon: "" },
      { name: "Connections", icon: "" },
      { name: "Blocked users", icon: "" },
      { name: "Billing", icon: "" },
      { name: "Security", icon: "" },
    ],
  };

  handleLoading = () => {
    const { loggedUser } = this.props;

    if (loggedUser.anonymous) {
      this.props.history.push({
        pathname: "/",
        state: {
          actionCard: 1,
        },
      });
    }

    if (loggedUser.person && !this.state.person) {
      const {
        avatarImage,
        bio,
        display2dCalendar,
        display3dCalendar,
        displayEmail,
        displayProgrammingLanguages,
        displayRanking,
        displayWorkplace,
        email,
        firstName,
        lastName,
        location,
        status,
        websiteUrl,
        workplace,
      } = loggedUser.person;

      this.setState({
        person: {
          avatarImage,
          bio,
          display2dCalendar,
          display3dCalendar,
          displayEmail,
          displayProgrammingLanguages,
          displayRanking,
          displayWorkplace,
          email,
          firstName,
          lastName,
          location,
          status,
          websiteUrl,
          workplace,
        },
      });
    }
  };

  // triggers every time the settings menu tab is pressed
  componentDidMount = () => {
    this.handleLoading();
  };

  // important for direct url access
  componentDidUpdate = () => {
    this.handleLoading();
  };

  onDrop = async (files) => {
    if (files.length > 0) {
      this.setState({
        avatarFile: files[0],
        showProfilePicture: true,
      });
    }
  };

  handleChange = (name, value) => {
    value =
      name?.target?.type === "checkbox"
        ? name.target.checked
        : name.target.value;

    name = name?.target?.name ? name.target.name : name;

    this.setState({
      person: {
        ...this.state.person,
        [name]:
          typeof this.state.person[name] === "object"
            ? { ...this.state.person[name], ...value }
            : value,
      },
    });
  };

  checkIfChanged = () => {
    if (
      JSON.stringify(this.props.loggedUser.person) !==
      JSON.stringify(this.state.person)
    ) {
      return true;
    } else {
      return false;
    }
  };

  setAvatarUrl = (imageSrc) => {
    this.handleChange("avatarImage", { src: imageSrc });
  };

  handleProfilePictureModal = () => {
    if (this.state.showProfilePicture) {
      this.setState({
        showProfilePicture: !this.state.showProfilePicture,
      });
    }
  };

  render() {
    const { loggedUser } = this.props;
    const { person, activeItem } = this.state;

    if (person) {
      return (
        <>
          {this.state.showNotification && (
            <div id="notification">
              <MDBContainer>
                <MDBRow className="message">
                  Changes were saved successfully —{" "}
                  <Link to={"/u/" + loggedUser.username}>
                    View your profile
                  </Link>
                </MDBRow>
              </MDBContainer>
            </div>
          )}
          <MDBContainer id="settings">
            <MDBRow>
              <MDBCol md="4">
                <MDBNav pills color="primary" className="flex-column">
                  <MDBNavItem>
                    <MDBRow className="profile">
                      <MDBCol md="3">
                        <img
                          src={person.avatarImage?.src}
                          className="img-fluid"
                        />
                      </MDBCol>
                      <MDBCol md="8">
                        <p className="font-weight-bold">
                          {loggedUser.username}
                        </p>
                        Profile Settings
                      </MDBCol>
                    </MDBRow>
                  </MDBNavItem>
                  {this.state.tabItems.map((tab, i) => {
                    return (
                      <MDBNavItem key={i}>
                        <span
                          className={
                            activeItem === i ? "nav-link active" : "nav-link"
                          }
                          onClick={() => this.setState({ activeItem: i })}
                        >
                          {tab.name}
                          {activeItem === i && tab.icon !== "" && (
                            <MDBAnimation
                              type="fadeInLeft"
                              className="d-inline-block"
                              duration="500ms"
                            >
                              <MDBIcon icon={tab.icon} />
                            </MDBAnimation>
                          )}
                        </span>
                      </MDBNavItem>
                    );
                  })}
                </MDBNav>
              </MDBCol>
              <MDBCol md="8">
                <MDBTabContent activeItem={activeItem}>
                  <MDBTabPane tabId={0}>
                    <h2>Profile</h2>
                    <Dropzone onDrop={this.onDrop} accept="image/*">
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="avatar">
                          <MDBView>
                            <input {...getInputProps()} />
                            <img
                              src={person.avatarImage?.src}
                              className="img-fluid"
                            />
                            <MDBMask className="flex-center">
                              <MDBIcon
                                icon="camera"
                                size="2x"
                                className="white-text"
                              />
                            </MDBMask>
                          </MDBView>
                        </div>
                      )}
                    </Dropzone>
                    <div className="personal-data">
                      <p className="font-weight-bold">Your full name</p>
                      <MDBRow>
                        <MDBCol md="6">
                          <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            onChange={this.handleChange}
                            value={person.firstName}
                            placeholder="Firstname"
                          />
                        </MDBCol>
                        <MDBCol md="6">
                          <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            onChange={this.handleChange}
                            value={person.lastName}
                            placeholder="Lastname"
                          />
                        </MDBCol>
                      </MDBRow>
                      <p className="font-weight-bold">Public email</p>
                      <MDBRow>
                        <MDBCol md="12">
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={this.handleChange}
                            value={person.email}
                            placeholder="Email"
                            required
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBInput
                        label={<p>Display email on profile</p>}
                        filled
                        type="checkbox"
                        id="checkbox0"
                        name="displayEmail"
                        onChange={this.handleChange}
                        checked={person.displayEmail}
                        containerClass="mr-5"
                      />
                      <p className="font-weight-bold">Your workplace</p>
                      <MDBRow>
                        <MDBCol md="12">
                          <input
                            type="text"
                            name="workplace"
                            className="form-control"
                            onChange={this.handleChange}
                            value={person.workplace}
                            placeholder="Company"
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBInput
                        label={<p>Display workplace on profile</p>}
                        filled
                        type="checkbox"
                        id="checkbox1"
                        name="displayWorkplace"
                        onChange={this.handleChange}
                        checked={person.displayWorkplace}
                        containerClass="mr-5"
                      />
                      <p className="font-weight-bold">Status</p>
                      <MDBRow>
                        <MDBCol md="12">
                          <input
                            type="text"
                            name="status"
                            className="form-control"
                            onChange={this.handleChange}
                            value={person.status}
                            placeholder="I'm on vacation!"
                          />
                        </MDBCol>
                      </MDBRow>
                      <p className="font-weight-bold">Bio</p>
                      <MDBRow>
                        <MDBCol md="12">
                          <textarea
                            type="text"
                            name="bio"
                            className="form-control"
                            onChange={this.handleChange}
                            value={person.bio}
                            placeholder="Describe yourself"
                          />
                        </MDBCol>
                      </MDBRow>
                      {/* <small className="d-block">
                        You can @mention your company anywhere on SNEK
                      </small> */}
                      {/* <p className="font-weight-bold">Website</p>
                      <MDBRow>
                        <MDBCol md="12">
                          <input
                            type="text"
                            name="website"
                            className="form-control"
                            onChange={this.handleChange}
                            value={person.displayWebsite}
                            placeholder="Website URL"
                          />
                        </MDBCol>
                      </MDBRow> */}
                      <p className="font-weight-bold">Location</p>
                      <MDBRow>
                        <MDBCol md="12">
                          <input
                            type="text"
                            name="location"
                            className="form-control"
                            onChange={this.handleChange}
                            value={person.location}
                            placeholder="City, Country"
                          />
                        </MDBCol>
                      </MDBRow>
                      <small className="d-block">
                        This can also assist us in finding you the best local
                        matches
                      </small>
                    </div>
                    <hr />
                    <MDBRow>
                      <MDBCol md="12">
                        <MDBInput
                          label={<p>Show local ranking</p>}
                          filled
                          type="checkbox"
                          id="checkbox2"
                          name="displayRanking"
                          onChange={this.handleChange}
                          checked={person.displayRanking}
                          containerClass="mr-5"
                        />
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput
                          label={<p>Show top programming languages</p>}
                          filled
                          type="checkbox"
                          id="checkbox3"
                          name="displayProgrammingLanguages"
                          onChange={this.handleChange}
                          checked={person.displayProgrammingLanguages}
                          containerClass="mr-5"
                        />
                      </MDBCol>
                      <MDBCol md="12">
                        <hr />
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput
                          label={<p>Show 3D work activity diagram</p>}
                          filled
                          type="checkbox"
                          id="checkbox4"
                          name="display3dCalendar"
                          onChange={this.handleChange}
                          checked={person.display3dCalendar}
                          containerClass="mr-5"
                        />
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput
                          label={<p>Show 2D work activity diagram</p>}
                          filled
                          type="checkbox"
                          id="checkbox5"
                          name="display2dCalendar"
                          onChange={this.handleChange}
                          checked={person.display2dCalendar}
                          containerClass="mr-5"
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBTabPane>
                  <MDBTabPane tabId={1}>
                    <h5>Customization</h5>
                    <div className="personal-data">
                      <p className="font-weight-bold">Choose your theme</p>
                      <MDBRow>
                        <MDBCol md="12">
                          <MDBSelect getValue={this.handleSelectChange} outline>
                            <MDBSelectInput
                              selected={
                                this.state.activeTheme
                                  ? this.state.activeTheme
                                  : "Default"
                              }
                            />
                            <MDBSelectOptions>
                              <MDBSelectOption value="">
                                Default
                              </MDBSelectOption>
                              {loggedUser.person.tids.map((tid, i) => {
                                let name = "Unnamed";
                                switch (tid) {
                                  case "9d88bda4657dcf17581ee91dfe6ab2a3":
                                    name = "Alpha";
                                    break;
                                  default:
                                    name = "Unnamed";
                                }
                                name += " Theme";
                                return (
                                  <MDBSelectOption key={i} value={tid}>
                                    {tid}
                                  </MDBSelectOption>
                                );
                              })}
                            </MDBSelectOptions>
                          </MDBSelect>
                        </MDBCol>
                      </MDBRow>
                    </div>
                  </MDBTabPane>
                  <MDBTabPane tabId={2}>
                    <h5>Panel 3</h5>
                  </MDBTabPane>
                </MDBTabContent>
              </MDBCol>
            </MDBRow>
            {this.checkIfChanged() && this.state.person.email !== "" && (
              <MDBRow className="float-right">
                <MDBBtn
                  color="green"
                  onClick={() => {
                    this.setState({ showNotification: true });
                    this.props.saveSettings(this.state.person);
                  }}
                >
                  Save Changes
                </MDBBtn>
              </MDBRow>
            )}
          </MDBContainer>
          {this.state.showProfilePicture && (
            <ProfilePictureModal
              {...this.props}
              setAvatarUrl={this.setAvatarUrl}
              file={this.state.avatarFile}
              handleProfilePictureModal={this.handleProfilePictureModal}
            />
          )}
        </>
      );
    } else {
      return (
        <div className="text-center my-5 py-5">
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  loggedUser: state.user.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveSettings: (nextSettings) => dispatch(updateSettings(nextSettings)),
  };
};
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
