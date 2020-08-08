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
import {
  readCacheAction,
  saveSettingsActions,
} from "../../../store/actions/userActions";
//> Components
// Profile Picture Editor
import { ProfilePictureModal } from "../../../components/molecules/modals";
//> Style sheet
import "./settings.scss";
//#endregion

//#region > Components
/**
 * @class This component adds the Settings page,
 *        used to change user information like.
 */
class SettingsPage extends React.Component {
  state = {
    loading: true,
    changeDetected: false,
    showProfilePicture: false,
    showNotification: false,
    file: undefined,
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

  // triggers every time the settings menu tab is pressed
  componentDidMount = () => {
    const { loggedUser } = this.props;

    if (!loggedUser.anonymous) {
      this.props.readCache(loggedUser.username);
    }
  };

  // important for direct url access
  componentDidUpdate = () => {
    const { loggedUser, fetchedUser } = this.props;

    // redirect to root if the loggedUser is anonymous
    if (loggedUser.anonymous) {
      this.props.history.push({
        pathname: "/",
        state: {
          actionCard: 1,
        },
      });
    }

    if (!fetchedUser && !loggedUser.anonymous) {
      this.props.readCache(loggedUser.username);
    }

    if (fetchedUser && this.state.loading) {
      const platformData = this.props.fetchedUser?.platformData;
      const data = platformData.user;
      const enterData = {
        avatar_url: data.avatarUrl ? data.avatarUrl : "",
        first_name: data.firstName ? data.firstName : "",
        last_name: data.lastName ? data.lastName : "",
        email: data.email ? data.email : "",
        showEmailPublic: data.settings.showEmailPublic,
        company: data.company ? data.company : "",
        showCompanyPublic: data.settings.showCompanyPublic,
        website: data.websiteUrl ? data.websiteUrl : "",
        location: data.location ? data.location : "",
        showLocalRanking: data.settings.showLocalRanking,
        showTopLanguages: data.settings.showTopLanguages,
        show3DDiagram: data.settings.show3DDiagram,
        show2DDiagram: data.settings.show2DDiagram,
        activeTheme: data.settings.activeTheme
          ? data.settings.activeTheme
          : null,
      };

      const dataString = this.stringToHash(JSON.stringify(enterData));

      this.setState({
        ...enterData,
        checksum: dataString,
        loading: false,
      });
    }
  };

  stringToHash = (string) => {
    let hash = 0;

    if (string.length == 0) return hash;

    for (let i = 0; i < string.length; i++) {
      let char = string.charCodeAt(i);

      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    return hash;
  };

  handleSelectChange = (val) => {
    this.setState(
      {
        activeTheme: val[0],
      },
      () => this.getChange()
    );
  };

  handleCheckChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.checked,
      },
      () => this.getChange()
    );
  };

  handleTextChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => this.getChange()
    );
  };

  getChange = () => {
    let currentData = {
      avatar_url: this.state.avatar_url,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      showEmailPublic: this.state.showEmailPublic,
      company: this.state.company,
      showCompanyPublic: this.state.showCompanyPublic,
      website: this.state.website,
      location: this.state.location,
      showLocalRanking: this.state.showLocalRanking,
      showTopLanguages: this.state.showTopLanguages,
      show3DDiagram: this.state.show3DDiagram,
      show2DDiagram: this.state.show2DDiagram,
      activeTheme: this.state.activeTheme ? this.state.activeTheme : null,
    };

    // Get hash of current data
    let currentHash = this.stringToHash(JSON.stringify(currentData));

    if (this.state.changeDetected) {
      if (this.state.checksum === currentHash) {
        this.setState({
          changeDetected: false,
        });
      }
    } else {
      if (this.state.checksum !== currentHash) {
        this.setState({
          changeDetected: true,
        });
      }
    }
  };

  save = () => {
    this.props.saveSettings(this.state);
    this.setState({ showNotification: true });
  };

  handleProfilePictureModal = () => {
    if (this.state.showProfilePicture) {
      this.setState({
        showProfilePicture: !this.state.showProfilePicture,
      });
    }
  };

  onDrop = async (files) => {
    if (files.length > 0) {
      this.setState({
        file: files[0],
        showProfilePicture: true,
      });
    }
  };

  setAvatarUrl = (avatar_url) => {
    this.setState({ avatar_url }, () => this.getChange());
  };

  render() {
    const { fetchedUser, loggedUser } = this.props;
    const { activeItem } = this.state;

    if (fetchedUser && this.state.avatar_url) {
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
                          src={this.state.avatar_url}
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
                              src={this.state.avatar_url}
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
                            name="first_name"
                            className="form-control"
                            onChange={this.handleTextChange}
                            value={this.state.first_name}
                            placeholder="Firstname"
                          />
                        </MDBCol>
                        <MDBCol md="6">
                          <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            onChange={this.handleTextChange}
                            value={this.state.last_name}
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
                            onChange={this.handleTextChange}
                            value={this.state.email}
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
                        name="showEmailPublic"
                        onChange={this.handleCheckChange}
                        checked={this.state.showEmailPublic}
                        containerClass="mr-5"
                      />
                      <p className="font-weight-bold">Your workplace</p>
                      <MDBRow>
                        <MDBCol md="12">
                          <input
                            type="text"
                            name="company"
                            className="form-control"
                            onChange={this.handleTextChange}
                            value={this.state.company}
                            placeholder="Company"
                          />
                        </MDBCol>
                      </MDBRow>
                      <small className="d-block">
                        You can @mention your company anywhere on SNEK
                      </small>
                      <MDBInput
                        label={<p>Display company on profile</p>}
                        filled
                        type="checkbox"
                        id="checkbox1"
                        name="showCompanyPublic"
                        onChange={this.handleCheckChange}
                        checked={this.state.showCompanyPublic}
                        containerClass="mr-5"
                      />
                      <p className="font-weight-bold">Website</p>
                      <MDBRow>
                        <MDBCol md="12">
                          <input
                            type="text"
                            name="website"
                            className="form-control"
                            onChange={this.handleTextChange}
                            value={this.state.website}
                            placeholder="Website URL"
                          />
                        </MDBCol>
                      </MDBRow>
                      <p className="font-weight-bold">Location</p>
                      <MDBRow>
                        <MDBCol md="12">
                          <input
                            type="text"
                            name="location"
                            className="form-control"
                            onChange={this.handleTextChange}
                            value={this.state.location}
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
                          id="checkbox3"
                          name="showLocalRanking"
                          onChange={this.handleCheckChange}
                          checked={this.state.showLocalRanking}
                          containerClass="mr-5"
                        />
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput
                          label={<p>Show top programming languages</p>}
                          filled
                          type="checkbox"
                          id="checkbox4"
                          name="showTopLanguages"
                          onChange={this.handleCheckChange}
                          checked={this.state.showTopLanguages}
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
                          id="checkbox5"
                          name="show3DDiagram"
                          onChange={this.handleCheckChange}
                          checked={this.state.show3DDiagram}
                          containerClass="mr-5"
                        />
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput
                          label={<p>Show 2D work activity diagram</p>}
                          filled
                          type="checkbox"
                          id="checkbox6"
                          name="show2DDiagram"
                          onChange={this.handleCheckChange}
                          checked={this.state.show2DDiagram}
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
                              {fetchedUser?.accessories?.themes &&
                                fetchedUser.accessories.themes.tids.map(
                                  (tid, i) => {
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
                                  }
                                )}
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
            {this.state.changeDetected && this.state.email !== "" && (
              <MDBRow className="float-right">
                <MDBBtn color="green" onClick={this.save}>
                  Save Changes
                </MDBBtn>
              </MDBRow>
            )}
          </MDBContainer>
          {this.state.showProfilePicture && (
            <ProfilePictureModal
              {...this.props}
              setAvatarUrl={this.setAvatarUrl}
              file={this.state.file}
              handleProfilePictureModal={this.handleProfilePictureModal}
            />
          )}
        </>
      );
    } else {
      if (!loggedUser) {
        //>TODO The active component has to be set to the login component
        window.open("/", "_self");
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
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
  fetchedUser: state.user.fetchedUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveSettings: (nextSettings) => dispatch(saveSettingsActions(nextSettings)),
    readCache: (username) => dispatch(readCacheAction(username)),
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
