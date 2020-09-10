//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBAvatar,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBSpinner,
  MDBBtn,
} from "mdbreact";
//> Additional
// Everything time related
import moment from "moment";

//> Components
import { ProjectModal } from "../../../../molecules/modals/enterprise";
import { AIBarChart, AILineChart } from "../../../../atoms";
//> CSS
import "./pageprojects.scss";
//> Images
// Too be added
//#endregion

//#region > Components
/** @class This component displays page overview of the page section */
class PageProjects extends React.Component {
  state = { projects: null, chartType: "line" };

  componentDidMount = () => {
    this.setState({
      projects: this.props.projects,
    });
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.projects && !this.state.projects) {
      this.setState({
        projects: this.props.projects,
      });
    }

    if (this.props.filter !== prevProps.filter) {
      this.filter(this.props.filter);
    }
  };

  unifyString = (str) => {
    if (str) {
      return str.toLowerCase().trim();
    } else {
      return "";
    }
  };

  filter = (value) => {
    // Retrieve all pipelines
    const { projects } = this.props;
    // Unify value
    const val = this.unifyString(value);

    // Searches for search value in title, domain and org
    let results = projects.filter((project) => {
      if (this.unifyString(project.title).includes(val)) {
        return project;
      }
    });

    this.setState({ projects: results });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      id: undefined,
    });
  };

  generateRandomChart = () => {
    let array = [...new Array(200)].map(() =>
      Math.round(Math.random() * (Math.random() < 0.2 ? -100 : 100))
    );

    // Decrease number of values
    for (let i = array.length - 1; i >= 0; i--) {
      if (Math.random() * 100 > 70) {
        array[i] = 0;
        array[i - 1] = 0;
      }
    }

    return array;
  };

  render() {
    const { projects } = this.state;

    return (
      <div id="pageprojects">
        <div className="mt-3 d-flex justify-content-between">
          <div>
            <p className="lead font-weight-bold mb-0">Project Overview</p>
            <p className="text-muted small">
              <MDBIcon icon="question-circle" className="mr-2" />
              All enterprise projects.
            </p>
          </div>
          <div>
            <MDBBtn
              color={this.state.chartType === "line" ? "green" : "elegant"}
              size="sm"
              onClick={() => this.setState({ chartType: "line" })}
            >
              Commits
            </MDBBtn>
            <MDBBtn
              color={this.state.chartType === "bar" ? "green" : "elegant"}
              size="sm"
              onClick={() => this.setState({ chartType: "bar" })}
            >
              Lines
            </MDBBtn>
          </div>
        </div>
        <MDBListGroup>
          {projects ? (
            projects.map((project, p) => {
              return (
                <MDBListGroupItem
                  onClick={() => this.setState({ modal: true, project })}
                  className="d-flex justify-content-between align-items-center clickable"
                  key={p}
                >
                  <div>
                    <p className="lead mb-0">{project.title}</p>
                    {project.description && (
                      <p className="small text-muted mb-0">
                        {project.description}
                      </p>
                    )}
                    <p className="small text-muted mb-0">
                      Owner: {project.ownerName}
                    </p>
                  </div>
                  <div className="canvas-container">
                    {this.state.chartType === "line" ? (
                      <AILineChart
                        data={project.mergedContributionFeed}
                        key={"project-chart-" + p}
                      />
                    ) : (
                      <AIBarChart
                        data={project.mergedCodetransition}
                        key={"project-chart-bar-" + p}
                      />
                    )}
                  </div>
                </MDBListGroupItem>
              );
            })
          ) : (
            <div>
              <MDBSpinner />
            </div>
          )}
        </MDBListGroup>
        {this.state.modal && this.state.project && this.props.projects && (
          <ProjectModal
            toggle={this.toggle}
            project={this.state.project}
            chart={this.state.project.mergedContributionFeed}
            id={this.state.project.id}
          />
        )}
      </div>
    );
  }
}
//#endregion

//#region > Exports
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default PageProjects;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
