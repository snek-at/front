//#region > Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBBtn, MDBIcon } from "mdbreact";

//> PopupWindow
import PopupWindow from "./PopupWindow";
//> Utils
import { toQuery, GuidGenerator } from "./utils";
//#endregion

//#region > Components
/**
 * @class A button that is used for GitHub OAuth
 */
class OAuth2Login extends Component {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.onRequest = this.onRequest.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  onBtnClick() {
    const {
      authorizationUrl,
      clientId,
      clientSecret,
      scope,
      redirectUri,
    } = this.props;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      response_type: "code",
    });

    const popup = PopupWindow.open(`${authorizationUrl}?${search}`);
    this.popup = popup;

    this.onRequest();
    popup.then(
      (data) => this.onSuccess(data),
      (error) => this.onFailure(error)
    );
  }

  onRequest() {
    const { onRequest } = this.props;

    onRequest();
  }

  async onSuccess(data) {
    if (!data.code) {
      return this.onFailure(new Error("'code' not found"));
    }

    const AuthorizeUrl =
      `https://cors.snek.at/` +
      `https://github.com/login/oauth/access_token?code=${data.code}` +
      `&client_id=${this.props.clientId}` +
      `&client_secret=${this.props.clientSecret}` +
      `&redirect_uri=${this.props.redirectUri}` +
      `&state=${await GuidGenerator()}`;

    /* POST request to get the access token from GitHub */
    await fetch(AuthorizeUrl, {
      // prettier-ignore
      headers: {
        "Accept": "application/json",
        "Access-Allow-Credentials": "True",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Vary": "Origin",
      },
      method: "POST",
    })
      .then(async (res) => await res.json())
      .then(async (res) => {
        const accessToken = res.access_token;

        /* GET request to get the user used for OAuth */
        await fetch(`https://api.github.com/user`, {
          // prettier-ignore
          headers: {
            "authorization": "Token " + accessToken,
          }
        })
          .then(async (res) => await res.json())
          .then((res) => {
            data = { username: res.login, accessToken };

            const { onSuccess } = this.props;

            return onSuccess(data);
          });
      });
  }

  onFailure(error) {
    const { onRequest } = this.props;
    console.log(error);
    onRequest(error);
  }

  render() {
    const { className } = this.props;
    const attrs = { onClick: this.onBtnClick };

    if (className) {
      attrs.className = className;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return (
      <MDBBtn color="elegant" {...attrs}>
        <MDBIcon fab icon="github" size="lg" />
      </MDBBtn>
    );
  }
}
//#endregion

//#region > Properties
OAuth2Login.defaultProps = {
  scope: "",
  onRequest: () => {},
};

OAuth2Login.propTypes = {
  authorizationUrl: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  clientId: PropTypes.string.isRequired,
  clientSecret: PropTypes.string.isRequired,
  onRequest: PropTypes.func,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  redirectUri: PropTypes.string.isRequired,
  scope: PropTypes.string,
};
//#endregion

//#region > Exports
//> Default Class
export default OAuth2Login;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
