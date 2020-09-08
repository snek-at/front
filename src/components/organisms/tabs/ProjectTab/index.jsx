//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Runtime type checking for React props and similar objects
import PropTypes from "prop-types";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBRow } from "mdbreact";

//> Style sheet
import "./projecttab.scss";
//> Components
import { Project } from "../../../atoms";
//#endregion

//#region > Components
/** @class A component which lists all projects */
class ProjectTab extends React.Component {
  render() {
    const { repoList } = this.props;

    return (
      <>
        <h3 className="font-weight-bold">Repositories</h3>
        <MDBRow className="project-list">
          {repoList &&
            repoList.map((repo, i) => {
              return <Project repo={repo} key={i} />;
            })}
        </MDBRow>
      </>
    );
  }
}
//#endregion

//#region > PropTypes
ProjectTab.propTypes = {
  repoList: PropTypes.array.isRequired,
};
//#endregion

//#region > Exports
//> Default Component
export default ProjectTab;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
