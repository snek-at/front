//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// React PropTypes
import PropTypes from "prop-types";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBAlert,
  MDBInput,
  MDBBtn,
  MDBIcon,
} from "mdbreact";
//#endregion

//#region > Components
class Project extends React.Component {
  render() {
    const { repo } = this.props;

    return (
      <MDBCol md="6">
        <a href={repo.url} target="_blank" rel="noopener noreferrer">
          <li>
            <div>
              <p className="lead mb-1 float-left">
                {repo.name.length > 25
                  ? repo.name.substring(0, 25) + "..."
                  : repo.name}
              </p>
              {repo.languages.length > 0 && (
                <small className="mb-1 float-right text-muted">
                  <MDBIcon
                    icon="square"
                    className="pr-1"
                    style={{ color: repo.languages[0].color }}
                  />
                  {repo.languages[0].name}
                </small>
              )}
            </div>
            <div className="clearfix" />
            <div>
              <img src={repo.avatarUrl} alt={repo.name} />
              <small>Owned by {repo.owner.username}</small>
            </div>
            <div className="py-2">
              <img className="img-badge" />
            </div>
          </li>
        </a>
      </MDBCol>
    );
  }
}
//#endregion

//#region > PropTypes
Project.propTypes = {
  repo: PropTypes.object.isRequired,
};
//#endregion

//#region > Exports
export default Project;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
