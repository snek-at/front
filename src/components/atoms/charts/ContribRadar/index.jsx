//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Additional
// Charts for displaying user contribution distribution (Chart.js 2)
import { Radar } from "react-chartjs-2";
//#endregion

//#region > Components
/**
 * @class contribution statistic component which displays the the ratio of
 *        commits, issues, pull requests and code reviews.
 */
class ContribRadar extends React.Component {
  state = {
    dataRadarOptions: {
      responsive: true,
      elements: {
        line: {
          tension: 0,
        },
      },
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      scale: {
        pointLabels: {
          fontSize: 11,
          color: "grey",
        },
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
      },
    },
  };

  componentDidMount = () => {
    // Start of by rendering chart with current year
    this.calculateSources(null);
  };

  componentWillReceiveProps(nextProps) {
    // Update chart
    this.calculateSources(nextProps.year);
  }

  fillChart = (results) => {
    //#TSID4
    //console.log("FILL CONTRIB RADAR CHART", results);

    if (results) {
      this.setState({
        dataRadar: {
          labels: [
            `Code Review ${results[0].data[0]}%`,
            `Issues ${results[0].data[1]}%`,
            `Pull Request ${results[0].data[2]}%`,
            `Commits ${results[0].data[3]}%   `,
          ],
          datasets: results,
        },
      });
    } else {
      this.setState({ dataRadar: null });
    }
  };

  calculateSources = (nextPropsYear) => {
    const { statistic } = this.props;

    let totalReviews = 0;
    let totalIssues = 0;
    let totalRequests = 0;
    let totalCommits = 0;
    let totalSources = 1;
    let year;
    let results = [];

    if (nextPropsYear === null) {
      year = this.props.year;
    } else {
      year = nextPropsYear;
    }

    if (year) {
      let selectedYear = statistic.years.find(
        (element) => element.year === year
      );

      totalIssues = selectedYear.contributions.issue.share;
      totalRequests = selectedYear.contributions.pullRequest.share;
      totalCommits = selectedYear.contributions.commit.share;
      totalReviews = selectedYear.contributions.pullRequestReview.share;
    } else {
      let contributions = statistic.current.contributions;

      totalIssues = contributions.issue.share;
      totalRequests = contributions.pullRequest.share;
      totalCommits = contributions.commit.share;
      totalReviews = contributions.pullRequestReview.share;
    }

    let values = [totalReviews, totalIssues, totalRequests, totalCommits];

    // Check if the values are valid
    if (values.includes(undefined)) {
      this.fillChart(null);
    } else {
      results.push({
        label: "GitHub",
        backgroundColor: "rgba(123, 201, 111,.4)",
        borderColor: "rgba(123, 201, 111)",
        data: values,
      });

      // Calculate averages
      let avgReviews, avgIssues, avgRequests, avgCommits;

      avgReviews = parseInt(totalReviews) / parseInt(totalSources);
      avgIssues = parseInt(totalIssues) / parseInt(totalSources);
      avgRequests = parseInt(totalRequests) / parseInt(totalSources);
      avgCommits = parseInt(totalCommits) / parseInt(totalSources);

      this.fillChart(results);
    }
  };

  render() {
    if (this.state.dataRadar) {
      return (
        <Radar
          data={this.state.dataRadar}
          options={this.state.dataRadarOptions}
          height={150}
        />
      );
    } else {
      return null;
    }
  }
}
//#endregion

//#region > Exports
//> Default Component
export default ContribRadar;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
