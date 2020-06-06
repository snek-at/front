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
    // First render chart with current week
    this.calculateSources(undefined, undefined);
  };

  componentWillReceiveProps(nextProps) {
    // Update chart
    this.calculateSources(nextProps.year, nextProps.activity);
  }

  fillChart = (results, lastWeek) => {
    console.log(results, lastWeek);
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
export default LatestActivity;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
