//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { Link, withRouter } from "react-router-dom";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBFooter,
  MDBSmoothScroll,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdbreact";

//> CSS
import "./footer.scss";
//> Images
// SNEK Logo
import Logo from "../../../assets/navigation/logo.png";
//#endregion

//#region > Constant Variables
//> Local data
// Slogans
/** @todo Change to uppercase */
const slogans = [
  "Become a snek!",
  "Connect with your colleges!",
  "Show the world what you can do!",
  "What are you waiting for?!",
];
//#endregion

//#region > Components
/** @class The footer component for all pages */
class Footer extends React.PureComponent {
  state = {
    slogan: "",
  };

  componentDidMount = () => {
    this.getSlogan();
  };

  getSlogan = () => {
    this.setState({
      slogan: slogans[Math.floor(Math.random() * slogans.length)],
    });
  };

  render() {
    return (
      <MDBFooter color="white text-dark">
        <MDBRow className="social">
          <MDBCol md="12" className="text-center">
            <h4>Connect with us!</h4>
          </MDBCol>
          <MDBCol md="12" className="text-center">
            <MDBBtn
              tag="a"
              floating
              social="git"
              href="https://github.com/snek-at"
              rel="noopener noreferrer"
              target="_blank"
            >
              <MDBIcon fab icon="github fa-lg" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              floating
              social="ins"
              href="https://www.instagram.com/snek_at/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <MDBIcon fab icon="instagram" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              floating
              social="fb"
              href="https://www.facebook.com/SNEK-107139834155546/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <MDBIcon fab icon="facebook-f fa-lg" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              floating
              social="tw"
              href="https://twitter.com/snek-at"
              rel="noopener noreferrer"
              target="_blank"
            >
              <MDBIcon fab icon="twitter" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              floating
              social="yt"
              href="https://www.youtube.com/channel/UCbzwB5x8XBTjnGZMydUr5LA"
              rel="noopener noreferrer"
              target="_blank"
            >
              <MDBIcon fab icon="youtube" />
            </MDBBtn>
            <MDBBtn tag="a" floating social="email" href="mailto:info@snek.at">
              <MDBIcon far icon="envelope" />
            </MDBBtn>
          </MDBCol>
        </MDBRow>
        <MDBContainer className="text-center text-md-left pt-5">
          <MDBRow>
            <MDBCol md="2">
              <img src={Logo} alt="SNEK Logo" className="img-fluid" />
              <p className="mt-2">
                Social Network,
                <br />
                built for engineers.
              </p>
            </MDBCol>
            <MDBCol md="3">
              <h5 className="title">Legal</h5>
              <hr className="agency-red mb-4 mt-0 d-inline-block" />
              <ul>
                <Link to="/about">
                  <li className="list-unstyled">
                    <MDBIcon far icon="file-alt" />
                    About
                  </li>
                </Link>
                <Link to="/privacy">
                  <li className="list-unstyled">
                    <MDBIcon icon="balance-scale" />
                    Privacy
                  </li>
                </Link>
                <Link to="/terms">
                  <li className="list-unstyled">
                    <MDBIcon icon="balance-scale" />
                    Terms of Service
                  </li>
                </Link>
              </ul>
            </MDBCol>
            <MDBCol md="3">
              <h5 className="title">Useful links</h5>
              <hr className="agency-red mb-4 mt-0 d-inline-block" />
              <ul>
                <Link to="/faq">
                  <li className="list-unstyled">
                    <MDBIcon icon="question" />
                    FAQ
                  </li>
                </Link>
                <a
                  href="https://github.com/snek-at/front/blob/master/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="list-unstyled">
                    <MDBIcon icon="code" />
                    Code quality
                  </li>
                </a>
                <a
                  href="https://www.buymeacoffee.com/M4SVRWQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="list-unstyled">
                    <MDBIcon icon="coffee" />
                    Get us a coffee
                  </li>
                </a>
                <Link to="/branding">
                  <li className="list-unstyled">
                    <MDBIcon icon="palette" />
                    Press / Branding
                  </li>
                </Link>
              </ul>
            </MDBCol>
            <MDBCol md="4">
              <h5 className="title">Contact</h5>
              <hr className="agency-red mb-4 mt-0 d-inline-block" />
              <ul>
                <li className="list-unstyled">
                  <MDBIcon icon="home" />
                  Emailwerkstraße 29, Carinthia, Austria
                </li>
                <a href="mailto:info@snek.at">
                  <li className="list-unstyled">
                    <MDBIcon far icon="envelope" />
                    info@snek.at
                  </li>
                </a>
              </ul>
            </MDBCol>
            <MDBCol md="12" className="text-center my-5">
              <h4>{this.state.slogan}</h4>
              {this.props.location.pathname === "/" ? (
                <MDBSmoothScroll to="home" className="d-inline">
                  <MDBBtn size="lg" color="green">
                    Join now
                  </MDBBtn>
                </MDBSmoothScroll>
              ) : (
                <Link to="/">
                  <MDBBtn size="lg" color="green">
                    Join now
                  </MDBBtn>
                </Link>
              )}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            Copyright &copy; 2019 - {new Date().getFullYear()} Simon Prast
            <br />
            <small className="text-muted">
              v{process.env.REACT_APP_VERSION}
            </small>
            <p className="mb-2 mt-1 font-weight-bold madeby">
              Made with{" "}
              <MDBIcon
                icon="heart"
                className="pulse green-text"
                aria-hidden="true"
              />{" "}
              by{" "}
              <a
                href="https://www.snek.at"
                target="_blank"
                rel="noopener noreferrer"
              >
                us
              </a>
              .
            </p>
          </MDBContainer>
        </div>
      </MDBFooter>
    );
  }
}
//#endregion

//#region > Exports
// Got access to the history object’s properties and the closest
// <Route>'s match.
export default withRouter(Footer);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
