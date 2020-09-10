//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBInput } from "mdbreact";
//> Charts
import { Bar } from "react-chartjs-2";
//#endregion

//#region > Components
/** @class Contrib add/sub chart */
class AIBarChart extends React.Component {
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
      events: [],
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            display: true,
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "transparent",
              display: true,
              drawBorder: false,
              zeroLineColor: "#ededed",
              zeroLineWidth: 1,
            },
            ticks: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "transparent",
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
    const data = this.props.data;

    if (data) {
      let results = [];

      data.current.weeks.forEach((week, w) => {
        week.days.forEach((day, d) => {
          results = [...results, { total: day.total, date: day.date }];
        });
      });

      const colors = results.map((val) =>
        val.total === 0 ? "#f0f0f0" : "#77bd43"
      );
      const dates = results.map((val) => val.date);
      const contribs = results.map((val, i) => val.total);

      this.setState({
        dataBar: {
          ...this.state.dataBar,
          labels: dates,
          datasets: [
            ...this.state.dataBar.datasets,
            { data: contribs, backgroundColor: colors },
          ],
        },
      });
    }
  };

  render() {
    const { size } = this.props;

    return (
      <Bar
        data={this.state.dataBar}
        options={this.state.barChartOptions}
        height={size}
      />
    );
  }
}
//#endregion

//#region > Exports
export default AIBarChart;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
