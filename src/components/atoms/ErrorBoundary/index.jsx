//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Runtime type checking for React props and similar objects
import PropTypes from "prop-types";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBAlert, MDBCollapse, MDBIcon } from "mdbreact";
//#endregion

//#region > Components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      info: null,
      collapseID: "",
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info,
    });
  }

  toggleCollapse = (collapseID) => () => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  };

  render() {
    if (this.props.hidden) {
      return null;
    }

    if (this.state.hasError) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        //> Development Code
        return (
          <MDBAlert color="danger">
            <code>{"696 - Oops, something went wrong :("}</code>
            <div class="pl-2">
              <p class="pt-3">{this.state.error.toString()}</p>
              <label
                class="mdb-main-label mb-3"
                color="primary"
                onClick={this.toggleCollapse("basicCollapse")}
              >
                ErrorStack
                <MDBIcon icon="angle-down" className="pl-2" />
              </label>
              <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
                <small class="pl-3">
                  <code>{this.state.info.componentStack}</code>
                </small>
              </MDBCollapse>
            </div>
          </MDBAlert>
        );
      } else {
        //> Production Code
        return (
          <MDBAlert color="danger">
            <code>{"696 - Oops, something went wrong :("}</code>
          </MDBAlert>
        );
      }
    }

    return this.props.children;
  }
}
//#endregion

//#region > PropTypes
ErrorBoundary.propTypes = {
  hidden: PropTypes.bool,
};
//#endregion

//#region > Exports
//> Default Component
export default ErrorBoundary;
//#endregion
