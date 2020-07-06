//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// React PropTypes
import PropTypes from "prop-types";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBCol, MDBIcon, MDBProgress } from "mdbreact";
//> Components
import { LanguageChart } from "../../atoms";
//#endregion

//#region > Components
/** @class A component which contains all projects where the given user is involved */
class Project extends React.Component {
  render() {
    const { repo } = this.props;

    return (
      <MDBCol md="6">
        <a href={repo.url} target="_blank" rel="noopener noreferrer">
          <li>
            <div>
              <p className="mb-1 font-weight-bold">{repo.name.split("/")[1]}</p>
            </div>
            <div>
              <img
                src={
                  repo.avatarUrl
                    ? repo.avatarUrl
                    : "https://img.favpng.com/4/1/20/computer-icons-gregorio-lvarez-museum-png-favpng-xPCKYGtUJihZeAkdqind0HH2N.jpg"
                }
              />
              <small>/{repo.owner.username}</small>
            </div>
            <div className="pt-3">
              {repo.languages.length > 0 && (
                <LanguageChart languages={repo.languages} />
              )}
              {repo.languages.length > 0 && (
                <small className="text-left text-muted">
                  <MDBIcon
                    icon="square"
                    className="pr-1"
                    style={{ color: repo.languages[0].color }}
                  />
                  {repo.languages[0].name ? repo.languages[0].name : "none"}
                </small>
              )}
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
//> Default Class
export default Project;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */