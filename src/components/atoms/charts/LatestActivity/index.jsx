//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Additional
// Charts for displaying user contribution distribution (Chart.js 2)
import { Line } from "react-chartjs-2";
// Used to display the time in a readable format
import moment from "moment";
//#endregion

//#region > Components
/**
 * @class A week calendar which compares the contributions of a selectable week
 *        with the current week.
 */
class LatestActivity extends React.Component {
  state = {
    dataLineOptions: {
      responsive: true,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              display: false,
            },
            gridLines: {
              color: "#ededed",
            },
          },
        ],
      },
    },
  };

  componentDidMount = () => {
    // Start of by rendering chart with current week
    this.calculateSources(undefined, undefined);

    // Get hash of current data
    this.setState({
      currentHash: this.stringToHash(JSON.stringify(this.props)),
    });
  };

  componentDidUpdate = () => {
    // Get hash of current data
    let currentHash = this.stringToHash(JSON.stringify(this.props));

    if (this.state.currentHash !== currentHash) {
      // Render the chart if the data has changed
      this.calculateSources(undefined, undefined);

      this.setState({
        currentHash,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    // Update chart
    this.calculateSources(nextProps.year, nextProps.activity);
  }

  fillChart = (results, lastWeek) => {
    //#TSID5
    //console.log("FILL LATEST ACTIVITY CHART", results, lastWeek);

    if (results) {
      this.setState({
        dataLine: {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              label: "This week",
              fill: true,
              lineTension: 0.3,
              backgroundColor: "rgba(255,255,255, 0)",
              borderColor: "rgb(123, 201, 111)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBackgroundColor: "rgb(255, 255, 255)",
              pointRadius: 4,
              pointHitRadius: 10,
              data: results,
            },
            {
              label: "Last week",
              fill: true,
              lineTension: 0.3,
              backgroundColor: "rgba(255,255,255, 0)",
              borderColor: "rgba(123, 201, 111, .2)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBackgroundColor: "rgb(255, 255, 255)",
              pointRadius: 4,
              pointHitRadius: 10,
              data: lastWeek,
            },
          ],
        },
      });
    } else {
      this.setState({ dataLine: null });
    }
  };

  calculateSources = (year, activity) => {
    const { statistic } = this.props;

    if (statistic) {
      // Real data
      let contribData, week, lastWeek, lastWeekValues;

      if (!year) {
        contribData = statistic.current;
      } else {
        contribData = statistic.years.find((element) => element.year === year);
      }

      const weeks = contribData.calendar.weeks;

      if (!activity) {
        week = weeks[weeks.length - 1];
        lastWeek = weeks[weeks.length - 2];
      } else {
        week = weeks[activity.wkey];
        lastWeek = weeks[activity.wkey - 1];
      }

      const values = week.days.map((day, i) => {
        return day.total;
      });

      if (lastWeek) {
        lastWeekValues = lastWeek.days.map((day, i) => {
          return day.total;
        });
      }

      this.setState(
        {
          startDate: week.days[0]?.date,
          endDate: week.days[6]?.date,
        },
        () => this.fillChart(values, lastWeekValues)
      );
    } else {
      // Dummy data for displaying purposes
      this.setState(
        {
          startDate: "2020-01-01",
          endDate: "2020-10-20",
        },
        () => this.fillChart([0, 10, 5, 2, 5, 6, 0], [5, 2, 6, 1, 1, 1, 0])
      );
    }
  };

  stringToHash = (string) => {
    let hash = 0;

    if (string.length == 0) return hash;

    for (let i = 0; i < string.length; i++) {
      const char = string.charCodeAt(i);

      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    return hash;
  };

  render() {
    if (this.state.dataLine) {
      return (
        <>
          <p className="text-muted">
            <small>
              {moment(this.state.startDate).format("DD.MM.YYYY")}
              {" - "}
              {moment(this.state.endDate).format("DD.MM.YYYY")}
            </small>
          </p>
          <Line
            data={this.state.dataLine}
            options={this.state.dataLineOptions}
            height={150}
          />
        </>
      );
    } else {
      return null;
    }
  }
}
//#endregion

//#region > Exports
//> Default Component
export default LatestActivity;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
