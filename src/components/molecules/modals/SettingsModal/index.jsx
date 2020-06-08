//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBTabPane,
  MDBTabContent,
  MDBRow,
  MDBCol,
  MDBNav,
  MDBNavLink,
  MDBNavItem,
  MDBInput,
  MDBAnimation,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions,
} from "mdbreact";

//> CSS
import "./settings.scss";
//#endregion

//#region > Constant Variables
//> Settings data
const SETTINGS_TAB = [
  { name: "Profile", icon: "" },
  { name: "Customization", icon: "" },
  { name: "Account", icon: "" },
  { name: "Connections", icon: "" },
  { name: "Blocked users", icon: "" },
  { name: "Billing", icon: "" },
  { name: "Security", icon: "" },
];
//#endregion

//#region > Components
class SettingsModal extends React.Component {
  state = {
    changeDetected: false,
    activeItemInnerPills: 0,
  };

  componentDidMount = () => {
    // Check for the current values
    const platformData = this.props.globalState?.fetchedUser?.platformData;

    if (platformData?.profile && platformData?.user) {
      const profile = platformData.profile;
      const data = platformData.user;
      const enterData = {
        first_name: data.firstName ? data.firstName : "",
        last_name: data.lastName ? data.lastName : "",
        email: data.email ? data.email : "",
        showEmailPublic: data.settings.showEmailPublic,
        company: profile.company ? profile.company : "",
        showCompanyPublic: data.settings.showCompanyPublic,
        website: profile.websiteUrl ? profile.websiteUrl : "",
        location: profile.location ? profile.location : "",
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
      });
    } else {
      this.initBlank();
    }
  };

  initBlank = () => {
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      showEmailPublic: true,
      company: "",
      showCompanyPublic: true,
      website: "",
      location: "",
      showLocalRanking: true,
      showTopLanguages: true,
      show3DDiagram: true,
      show2DDiagram: true,
      activeTheme: null,
    });
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

  toggleInnerPills = (tab) => (e) => {
    if (this.state.activeItemInnerPills !== tab) {
      this.setState({
        activeItemInnerPills: tab,
      });
    }
  };

  save = () => {
    this.props.saveSettings(this.state);
    this.props.closeModal();
  };

  render() {
    return (
      <MDBModal
        modalStyle="white"
        className="text-dark"
        size="lg"
        id="settings"
        backdrop={true}
        isOpen={true}
        toggle={this.props.closeModal}
      >
        <MDBModalHeader
          className="text-center text-dark donate"
          titleClass="w-100"
          tag="p"
        >
          <MDBIcon icon="wrench" className="green-text pr-2" />
          Settings
        </MDBModalHeader>
        <MDBModalBody className="text-center">
          <MDBRow>
            <MDBCol md="4">
              <MDBNav pills color="primary" className="flex-column">
                {SETTINGS_TAB.map((tab, i) => {
                  return (
                    <MDBNavItem key={i}>
                      <MDBNavLink
                        link
                        to="#"
                        active={this.state.activeItemInnerPills === i}
                        onClick={this.toggleInnerPills(i)}
                      >
                        {tab.name}
                        {this.state.activeItemInnerPills === i &&
                          tab.icon !== "" && (
                            <MDBAnimation
                              type="fadeInLeft"
                              className="d-inline-block"
                              duration="500ms"
                            >
                              <MDBIcon icon={tab.icon} />
                            </MDBAnimation>
                          )}
                      </MDBNavLink>
                    </MDBNavItem>
                  );
                })}
              </MDBNav>
            </MDBCol>
            <MDBCol md="8">
              <MDBTabContent activeItem={this.state.activeItemInnerPills}>
                <MDBTabPane tabId={0}>
                  <h5>Profile</h5>
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
                            <MDBSelectOption value="">Default</MDBSelectOption>
                            {this.props.globalState.fetchedUser.accessories.themes.tids.map(
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
        </MDBModalBody>
        <MDBModalFooter className="text-right">
          {this.state.changeDetected && (
            <MDBBtn color="green" onClick={this.save}>
              Save
            </MDBBtn>
          )}
          <MDBBtn color="elegant" outline onClick={this.props.closeModal}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}
//#endregion

//#region > Exports
export default SettingsModal;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
