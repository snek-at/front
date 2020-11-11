//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBInput } from "mdbreact";
//> Charts
import { Line } from "react-chartjs-2";
//#endregion

//#region > Components
/** @class Contrib add/sub chart */
class AILineChart extends React.Component {
  state = {
    dataBar: {
      labels: Array.from(Array(200).keys()),
      datasets: [],
    },
    barChartOptions: {
      responsive: true,
      legend: {
        display: false,
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      events: [],
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: false,
              color: "transparent",
              drawBorder: false,
              zeroLineColor: "#ededed",
            },
            ticks: {
              display: false,
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: "transparent",
              display: true,
              drawBorder: false,
              zeroLineColor: "#ededed",
              zeroLineWidth: 1,
            },
            ticks: {
              display: false,
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  componentDidMount = () => {
    this.init();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.year !== this.props.year) {
      this.init();
    }
  };

  init = () => {
    const data = this.props.data;

    if (data) {
      const year = this.props.year;
      const weeks =
        year !== undefined ? data.years[year].weeks : data.current.weeks;

      let results = [];

      weeks.forEach((week, w) => {
        week.days.forEach((day, d) => {
          results = [...results, { total: day.total, date: day.date }];
        });
      });

      const dates = results.map((val) => val.date);
      const contribs = results.map((val, i) =>
        i > 0 && i < results.length - 1
          ? (val.total + results[i - 1].total + results[i + 1].total) / 3
          : val.total
      );

      this.setState({
        dataBar: {
          ...this.state.dataBar,
          labels: dates,
          datasets: [
            {
              data: contribs,
              borderColor: "#77bd43",
              fill: false,
              borderWidth: 1,
              lineTension: 0.4,
            },
          ],
        },
      });
    }
  };

  render() {
    const { size } = this.props;

    return (
      <Line data={this.state.dataBar} options={this.state.barChartOptions} />
    );
  }
}
//#endregion

//#region > Exports
export default AILineChart;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
