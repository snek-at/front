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
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBAlert,
  MDBProgress,
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
import {
  ProfilePictureModal,
  ConnectModal,
} from "../../../components/molecules/modals";
//> Style sheet
import "./settings.scss";
//> Actions
// Functions to send data from the application to the store
import {
  updateSettings,
  deleteProfile,
  updateProfile,
} from "../../../store/actions/personActions";
import { getPerson as getUserPerson } from "../../../store/actions/userActions";
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
    showSaveButton: false,
    avatarFile: undefined,
    activeItem: 0,
    tabItems: [
      { name: "Profile", icon: "" },
      { name: "Connections", icon: "" },
      { name: "Customization", icon: "" },
      { name: "Account", icon: "" },
    ],
  };

  checkTypes = (item, value) => {
    return this.state.person
      ? this.state.person[item] !== value
        ? this.state.person[item]
        : value
      : value;
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

    if (loggedUser?.person) {
      const {
        avatarImage,
        bio,
        display2dCalendar,
        display3dCalendar,
        displayContributionTypes,
        displayWeekActivity,
        displayImageGallery,
        displayVideoGallery,
        displayMusicGallery,
        displayMap,
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
        profiles,
      } = loggedUser?.person;

      const person = {
        avatarImage: this.checkTypes("avatarImage", avatarImage),
        bio: this.checkTypes("bio", bio),
        display2dCalendar: this.checkTypes(
          "display2dCalendar",
          display2dCalendar
        ),
        display3dCalendar: this.checkTypes(
          "display3dCalendar",
          display3dCalendar
        ),
        displayContributionTypes: this.checkTypes(
          "displayContributionTypes",
          displayContributionTypes
        ),
        displayWeekActivity: this.checkTypes(
          "displayWeekActivity",
          displayWeekActivity
        ),
        displayImageGallery: this.checkTypes(
          "displayImageGallery",
          displayImageGallery
        ),
        displayVideoGallery: this.checkTypes(
          "displayVideoGallery",
          displayVideoGallery
        ),
        displayMusicGallery: this.checkTypes(
          "displayMusicGallery",
          displayMusicGallery
        ),
        displayMap: this.checkTypes("displayMap", displayMap),
        displayEmail: this.checkTypes("displayEmail", displayEmail),
        displayProgrammingLanguages: this.checkTypes(
          "displayProgrammingLanguages",
          displayProgrammingLanguages
        ),
        displayRanking: this.checkTypes("displayRanking", displayRanking),
        displayWorkplace: this.checkTypes("displayWorkplace", displayWorkplace),
        email: this.checkTypes("email", email),
        firstName: this.checkTypes("firstName", firstName),
        lastName: this.checkTypes("lastName", lastName),
        location: this.checkTypes("location", location),
        status: this.checkTypes("status", status),
        websiteUrl: this.checkTypes("websiteUrl", websiteUrl),
        workplace: this.checkTypes("workplace", workplace),
        profiles,
      };

      if (JSON.stringify(this.state.person) !== JSON.stringify(person)) {
        this.setState({
          loading: false,
          person,
        });
      }
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

  refetch = () => {
    const { loggedUser } = this.props;

    if (loggedUser.anonymous) {
      this.props.history.push({
        pathname: "/",
        state: {
          actionCard: 1,
        },
      });
    }

    if (loggedUser.person) {
      this.setState(
        {
          loading: true,
        },
        () => this.props.getUserPerson(loggedUser.person.slug.split("-")[1])
      );
    }
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
    if (name.target) {
      value =
        name?.target?.type === "checkbox"
          ? name?.target?.checked
          : name?.target?.value;
      name = name?.target?.name ? name?.target?.name : name;
    }

    console.log(name, value);

    this.setState(
      {
        showSaveButton: true,
        person: {
          ...this.state.person,
          [name]:
            typeof this.state.person[name] === "object"
              ? { ...this.state.person[name], ...value }
              : value,
        },
      },
      () => console.log(this.state)
    );
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

  renderProfileTypeSwitch(param) {
    switch (param) {
      case "GITHUB":
        return "github";
      case "GITLAB":
        return "gitlab";
      case "INSTAGRAM":
        return "instagram";
      default:
        return "";
    }
  }

  checkProfileTypeExists = (sourceType) => {
    return this.state.person.profiles.some(
      (e) => e.sourceType === sourceType && e.isActive
    )
      ? true
      : false;
  };

  toggle = (modal) => {
    this.setState({
      [modal]: !this.state[modal],
    });
  };

  render() {
    const { loggedUser } = this.props;
    const { person, activeItem } = this.state;

    console.log(person);

    if (person) {
      return (
        <>
          {this.state.showNotification && (
            <div id="notification">
              <MDBContainer>
                <MDBRow className="message">
                  Changes were saved successfully —{"  "}
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
                      <MDBNavItem key={i} className="clickable">
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
                    <h5>Profile</h5>
                    <Dropzone onDrop={this.onDrop} accept="image/*">
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="avatar">
                          <MDBView>
                            <input {...getInputProps()} />
                            <img
                              src={person.avatarImage?.src}
                              className="img-fluid"
                            />
                            <MDBMask className="flex-center clickable">
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
                  </MDBTabPane>
                  <MDBTabPane tabId={1}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">Connections</h5>
                      <div>
                        <ConnectModal
                          refetch={this.refetch}
                          disabled={this.state.loading}
                        />
                      </div>
                    </div>
                    {this.state.loading && <MDBProgress material preloader />}
                    <MDBListGroup>
                      {person.profiles?.map((profile, p) => {
                        return (
                          <MDBListGroupItem
                            className="d-flex justify-content-between align-items-center clickable py-0 pr-0 pl-2"
                            // onClick={
                            //   // this.setState({
                            //   //   modal: true,
                            //   //   selectedGitLab: gitlab,
                            //   //   authorizedUser: gitlab.username,
                            //   // })
                            // }
                            key={p}
                          >
                            <div className="d-flex align-items-center">
                              <a
                                href={profile.sourceUrl}
                                target="_blank"
                                className="mr-2 text-dark"
                              >
                                <MDBIcon
                                  fab
                                  icon={this.renderProfileTypeSwitch(
                                    profile.sourceType
                                  )}
                                  size="2x"
                                />
                              </a>
                              <code>
                                {profile.username ? profile.username : null}
                              </code>
                              {profile.isAccessTokenExpired && (
                                <MDBBadge
                                  pill
                                  color="danger"
                                  className="z-depth-0 ml-2"
                                >
                                  Expired
                                </MDBBadge>
                              )}
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                              <div className="small d-inline-block text-right px-2">
                                <span className="text-muted">Type</span>
                                <span className="d-block">
                                  {profile.sourceType}
                                </span>
                              </div>
                              <div className="small d-inline-block text-center ml-2">
                                <span className="text-muted">Active</span>
                                <span className="d-block">
                                  <MDBIcon
                                    icon="circle"
                                    size="lg"
                                    className={
                                      profile.isActive &&
                                      !profile.isAccessTokenExpired
                                        ? "text-success"
                                        : "text-danger"
                                    }
                                  />
                                </span>
                              </div>
                              {profile.isActive ? (
                                <div className="bg-warning h-100 ml-3">
                                  <MDBIcon
                                    icon="pause"
                                    className="text-white p-3"
                                    onClick={() =>
                                      this.props
                                        .updateProfile(profile.id, {
                                          URL: profile.sourceUrl,
                                          type: profile.sourceType,
                                          authorization: profile.accessToken,
                                          username: profile.username,
                                          isActive: false,
                                        })
                                        .then(() => this.refetch())
                                    }
                                  />
                                </div>
                              ) : (
                                <div className="bg-success h-100 ml-3">
                                  <MDBIcon
                                    icon="play"
                                    className="text-white p-3"
                                    onClick={() =>
                                      this.props
                                        .updateProfile(profile.id, {
                                          URL: profile.sourceUrl,
                                          type: profile.sourceType,
                                          authorization: profile.accessToken,
                                          username: profile.username,
                                          isActive: true,
                                        })
                                        .then(() => this.refetch())
                                    }
                                  />
                                </div>
                              )}
                              <div className="bg-danger h-100">
                                <MDBIcon
                                  icon="trash"
                                  className="text-white p-3"
                                  onClick={() =>
                                    this.props
                                      .deleteProfile(profile.id)
                                      .then(() => this.refetch())
                                  }
                                />
                              </div>
                            </div>
                          </MDBListGroupItem>
                        );
                      })}
                    </MDBListGroup>
                  </MDBTabPane>
                  <MDBTabPane tabId={2}>
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
                              {loggedUser?.person?.tids?.map((tid, i) => {
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
                      <p className="font-weight-bold">Display settings</p>
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
                            label={<p>Show music gallery</p>}
                            filled
                            type="checkbox"
                            id="checkbox3"
                            name="displayMusicGallery"
                            onChange={this.handleChange}
                            checked={person.displayMusicGallery}
                            containerClass="mr-5"
                          />
                        </MDBCol>
                        <MDBCol md="12">
                          <hr />
                        </MDBCol>
                        {!this.checkProfileTypeExists("GITHUB") &&
                          !this.checkProfileTypeExists("GITLAB") && (
                            <MDBAlert color="info">
                              <MDBIcon icon="question-circle" /> Looks like no
                              profiles are present. You can add one{" "}
                              <span
                                className="blue-text clickable"
                                onClick={() => this.setState({ activeItem: 1 })}
                              >
                                here!
                              </span>
                            </MDBAlert>
                          )}
                        <span class="badge badge-info pill"></span>
                        <MDBCol md="12">
                          <MDBInput
                            label={<p>Show top programming languages</p>}
                            filled
                            type="checkbox"
                            id="checkbox4"
                            name="displayProgrammingLanguages"
                            onChange={this.handleChange}
                            checked={
                              this.checkProfileTypeExists("GITHUB") ||
                              this.checkProfileTypeExists("GITLAB")
                                ? person.displayProgrammingLanguages
                                : false
                            }
                            containerClass="mr-5"
                            disabled={
                              this.checkProfileTypeExists("GITHUB") ||
                              this.checkProfileTypeExists("GITLAB")
                                ? false
                                : true
                            }
                          />
                        </MDBCol>
                        <MDBCol md="12">
                          <MDBInput
                            label={<p>Show 3D work activity diagram</p>}
                            filled
                            type="checkbox"
                            id="checkbox5"
                            name="display3dCalendar"
                            onChange={this.handleChange}
                            checked={
                              this.checkProfileTypeExists("GITHUB") ||
                              this.checkProfileTypeExists("GITLAB")
                                ? person.display3dCalendar
                                : false
                            }
                            containerClass="mr-5"
                            disabled={
                              this.checkProfileTypeExists("GITHUB") ||
                              this.checkProfileTypeExists("GITLAB")
                                ? false
                                : true
                            }
                          />
                        </MDBCol>
                        <MDBCol md="12">
                          <MDBInput
                            label={<p>Show 2D work activity diagram</p>}
                            filled
                            type="checkbox"
                            id="checkbox6"
                            name="display2dCalendar"
                            onChange={this.handleChange}
                            checked={
                              this.checkProfileTypeExists("GITHUB") ||
                              this.checkProfileTypeExists("GITLAB")
                                ? person.display2dCalendar
                                : false
                            }
                            containerClass="mr-5"
                            disabled={
                              this.checkProfileTypeExists("GITHUB") ||
                              this.checkProfileTypeExists("GITLAB")
                                ? false
                                : true
                            }
                          />
                        </MDBCol>
                        <MDBCol md="12">
                          <MDBInput
                            label={<p>Show contribution type diagram</p>}
                            filled
                            type="checkbox"
                            id="checkbox7"
                            name="displayContributionTypes"
                            onChange={this.handleChange}
                            checked={
                              this.checkProfileTypeExists("GITHUB") ||
                              this.checkProfileTypeExists("GITLAB")
                                ? person.displayContributionTypes
                                : false
                            }
                            containerClass="mr-5"
                            disabled={
                              this.checkProfileTypeExists("GITHUB") ||
                              this.checkProfileTypeExists("GITLAB")
                                ? false
                                : true
                            }
                          />
                        </MDBCol>
                        <MDBCol md="12">
                          <MDBInput
                            label={<p>Show week activity diagram</p>}
                            filled
                            type="checkbox"
                            id="checkbox8"
                            name="displayWeekActivity"
                            onChange={this.handleChange}
                            checked={
                              this.checkProfileTypeExists("GITHUB") ||
                              this.checkProfileTypeExists("GITLAB")
                                ? person.displayWeekActivity
                                : false
                            }
                            containerClass="mr-5"
                            disabled={
                              this.checkProfileTypeExists("GITHUB") ||
                              this.checkProfileTypeExists("GITLAB")
                                ? false
                                : true
                            }
                          />
                        </MDBCol>
                        <MDBCol md="12">
                          <hr />
                        </MDBCol>
                        <MDBCol md="12">
                          <MDBInput
                            label={<p>Show image gallery</p>}
                            filled
                            type="checkbox"
                            id="checkbox9"
                            name="displayImageGallery"
                            onChange={this.handleChange}
                            checked={person.displayImageGallery}
                            containerClass="mr-5"
                          />
                        </MDBCol>
                        <MDBCol md="12">
                          <MDBInput
                            label={<p>Show video gallery</p>}
                            filled
                            type="checkbox"
                            id="checkbox10"
                            name="displayVideoGallery"
                            onChange={this.handleChange}
                            checked={person.displayVideoGallery}
                            containerClass="mr-5"
                          />
                        </MDBCol>
                        <MDBCol md="12">
                          <MDBInput
                            label={<p>Show image map</p>}
                            filled
                            type="checkbox"
                            id="checkbox11"
                            name="displayMap"
                            onChange={this.handleChange}
                            checked={person.displayMap}
                            containerClass="mr-5"
                          />
                        </MDBCol>
                      </MDBRow>
                    </div>
                  </MDBTabPane>
                  <MDBTabPane tabId={3}>
                    <h5>Account</h5>
                    <div className="personal-data">
                      <p className="font-weight-bold">Username</p>
                      <MDBRow>
                        <MDBCol md="6">
                          <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            // onChange={this.handleChange}
                            value={loggedUser.username}
                            // placeholder="Firstname"
                          />
                        </MDBCol>
                      </MDBRow>
                    </div>
                  </MDBTabPane>
                </MDBTabContent>
              </MDBCol>
            </MDBRow>
            {this.state.showSaveButton && this.state.person.email !== "" && (
              <MDBRow className="float-right">
                <MDBBtn
                  color="green"
                  onClick={() => {
                    this.props
                      .saveSettings({
                        ...this.state.person,
                        avatarImage: this.state.avatarFile,
                      })
                      .then(() => {
                        this.setState({
                          loading: true,
                          showNotification: true,
                          showSaveButton: false,
                        });
                      });
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
  person: state.person,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveSettings: (nextSettings) => dispatch(updateSettings(nextSettings)),
    deleteProfile: (id) => dispatch(deleteProfile(id)),
    updateProfile: (id, nextProfile) =>
      dispatch(updateProfile(id, nextProfile)),
    getUserPerson: (user) => dispatch(getUserPerson(user)),
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
