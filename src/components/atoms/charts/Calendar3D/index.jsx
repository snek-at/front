//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Additional packages
// Used to display the time in a readable format
import moment from "moment";
//> Obelisk
// A JavaScript library for building isometric pixel objects
import obelisk from "obelisk.js";

//> Style sheet
import "./calendar3d.scss";
//#endregion

//#region > Components
/**
 * @class A three dimensional calendar which displays each days contributions,
 *        and contribution related statistics e.g. busiest days and streaks.
 */
class Calendar3D extends React.Component {
  constructor(props) {
    super(props);

    // Create reference to HTML canvas
    this.myInput = React.createRef();
    this.state = {
      width: 0,
      hue: 0,
    };
  }

  componentDidMount = () => {
    if (this.props.platformData) {
      // Add resize listener
      window.addEventListener("resize", this.updateDimensions);

      this.setState(
        {
          width: this.myInput.current.offsetWidth,
          loading: true,
          contrib: this.renderTopStats(),
          streak: this.renderBottomStats(),
          year: this.props.year,
        },
        () => this.checkCache()
      );

      this.checkCache();
    }
  };

  componentDidUpdate = () => {
    if (this.props.year !== this.state.year) {
      this.setState({
        width: this.myInput.current.offsetWidth,
        loading: true,
        contrib: this.renderTopStats(),
        streak: this.renderBottomStats(),
        year: this.props.year,
      });
    }

    this.checkCache();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState(
      {
        width: this.myInput.current.offsetWidth,
      },
      () => this.checkCache()
    );
  };

  renderTopStats() {
    let countTotal, averageCount, datesTotal, maxCount, dateBest, contribData;

    if (this.props.year) {
      contribData = this.props.platformData.statistic.years.find(
        (element) => element.year === this.props.year
      );
    } else {
      contribData = this.props.platformData.statistic.current;
    }

    let contributionCalendar = contribData.calendar;

    countTotal = contribData.contributions.total;
    averageCount =
      Math.round(
        (contribData.contributions.total / 365 + Number.EPSILON) * 100
      ) / 100;

    datesTotal =
      moment(contributionCalendar.startDate).format("MMM D") +
      " → " +
      moment(contributionCalendar.endDate).format("MMM D");

    /* Busiest day */
    maxCount = contribData.busiestDay.total;
    dateBest = moment(contribData.busiestDay.date);
    dateBest = dateBest.isValid() ? dateBest.format("MMM DD") : "-";

    return {
      countTotal,
      averageCount,
      datesTotal,
      maxCount,
      dateBest,
    };
  }

  renderBottomStats() {
    let streakLongest, datesLongest, streakCurrent, datesCurrent, contribData;

    if (this.props.year) {
      contribData = this.props.platformData.statistic.years.find(
        (element) => element.year === this.props.year
      );
    } else {
      contribData = this.props.platformData.statistic.current;
    }

    if (contribData.streak.longest) {
      streakLongest = contribData.streak.longest.totalDays;
      datesLongest =
        moment(contribData.streak.longest.startDate).format("MMM D") +
        " → " +
        moment(contribData.streak.longest.endDate).format("MMM D");
    } else {
      streakLongest = "0";
      datesLongest = "-";
    }

    if (contribData.streak.current.id !== -1) {
      streakCurrent = contribData.streak.current.totalDays;
      datesCurrent =
        moment(contribData.streak.current.startDate).format("MMM D") +
        " → " +
        moment(contribData.streak.current.endDate).format("MMM D");
    } else {
      streakCurrent = "0";
      datesCurrent = "-";
    }

    return {
      streakLongest,
      datesLongest,
      streakCurrent,
      datesCurrent,
    };
  }

  renderIsometrics = () => {
    if (this.context) {
      // Create a canvas 2D point for pixel view world
      let point = new obelisk.Point(70, 70);
      // Create view instance to nest everything
      // Canvas could be either DOM or jQuery element
      let pixelView = new obelisk.PixelView(this.context, point);

      pixelView.clear();

      // Get contributions of the selected year
      let contribData;

      if (this.props.year) {
        contribData = this.props.platformData.statistic.years.find(
          (element) => element.year === this.props.year
        );
      } else {
        contribData = this.props.platformData.statistic.current;
      }

      let contributions = contribData.calendar;

      // Define basic variables
      let size = 2 * Math.round(this.state.width / 80 / 2);

      if (size <= 8) {
        size = 8;
      }

      const maxHight = 60;

      let x = 0;
      let y = 0;
      let maxCount = 0; // Max number of contributions / day in the last year
      let values = [];

      contributions.weeks.map((week, wkey) => {
        values[wkey] = [];

        week.days.map((day, dkey) => {
          // Get max number of contributions
          if (day.total > maxCount) {
            maxCount = day.total;
          }
          values[wkey][dkey] = day;
        });
      });

      values.map((week, wi) => {
        week.map((day, di) => {
          // Normalize the values to achieve even distribution
          let cubeHeight = 3;

          if (maxCount > 0) {
            cubeHeight += parseInt((maxHight / maxCount) * day.total);
          }

          // Offsets
          let x = wi;
          let y = di;

          // Create cube dimension and color instance
          let fill = day.color;
          let color = new obelisk.CubeColor().getByHorizontalColor(
            parseInt("0x" + fill.replace("#", ""))
          );

          // ANIMATION TOGGLE for @kleberbaum to play with
          const animated = false;

          if (animated) {
            var animHeight = 3;

            function draw() {
              let dimension = new obelisk.CubeDimension(size, size, animHeight);
              let p3d = new obelisk.Point3D(size * x, size * y, 0);
              let cube = new obelisk.Cube(dimension, color, false);

              // Render cube primitive into view
              pixelView.renderObject(cube, p3d);
              if (animHeight < cubeHeight) {
                if (parseInt((maxHight / maxCount) * day.total) > 0) {
                  animHeight += 1;
                } else {
                  animHeight = 1;
                }
              }
              // Animations
              requestAnimationFrame(draw);
            }
            draw();
          } else {
            let dimension = new obelisk.CubeDimension(size, size, cubeHeight);
            let p3d = new obelisk.Point3D(size * x, size * y, 0);
            let cube = new obelisk.Cube(dimension, color, false);

            // Render cube primitive into view
            pixelView.renderObject(cube, p3d);

            this.cacheChart();
          }
        });
      });

      if (this.state.loading) {
        this.setState({
          loading: false,
        });
      }
    }
  };

  cacheChart = async () => {
    if (!localStorage.getItem("3dChart")) {
      window.setTimeout(() => {
        if (this.context) {
          localStorage.setItem(
            "3dChart",
            JSON.stringify({
              data: this.context.toDataURL(),
              timestamp: new Date().getTime(),
            })
          );
        }
      }, 0);
    }
  };

  checkCache = () => {
    const cache = localStorage.getItem("3dChart");

    if (cache) {
      const cacheObject = JSON.parse(cache);

      if (cacheObject.timestamp > new Date().getTime() - 3600000) {
        window.setTimeout(() => this.renderIsometrics(), 0);
      } else {
        window.setTimeout(() => this.renderIsometrics(), 0);
      }
    } else {
      window.setTimeout(() => this.renderIsometrics(), 0);
    }
  };

  renderCache = () => {
    const data = localStorage.getItem("3dChart");
    const dataObject = JSON.parse(data);
    const context = this.context.getContext("2d");

    let img = new Image();

    img.src = dataObject.data;

    if (context !== null) {
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
    }
  };

  render() {
    return (
      <div id="calendar3d">
        {this.state.width > 500 && (
          <>
            <div className="top-stats">
              <p className="font-weight-bold mb-1">Contributions</p>
              <div className="stats d-flex justify-content-between border">
                <div className="item">
                  <p className="green-text lead font-weight-bold">
                    {this.state.contrib.countTotal}
                  </p>
                  <p className="small font-weight-bold">Total</p>
                  <p className="text-muted small">
                    {this.state.contrib.datesTotal}
                  </p>
                </div>
                <div className="item">
                  <p className="green-text lead font-weight-bold">
                    {this.state.contrib.maxCount}
                  </p>
                  <p className="small font-weight-bold">Best day</p>
                  <p className="text-muted small">
                    {this.state.contrib.dateBest}
                  </p>
                </div>
              </div>
              <p className="small text-right mt-1">
                Average:{" "}
                <span className="green-text">
                  {this.state.contrib.averageCount}
                </span>{" "}
                / day
              </p>
            </div>
            <div className="bottom-stats">
              <p className="font-weight-bold mb-1">Streaks</p>
              <div className="stats d-flex justify-content-between border">
                <div className="item">
                  <p className="green-text lead font-weight-bold">
                    {this.state.streak.streakLongest}{" "}
                    <span className="days">
                      {this.state.streak.streakLongest === 1 ? "day" : "days"}
                    </span>
                  </p>
                  <p className="small font-weight-bold">Longest</p>
                  <p className="text-muted small">
                    {this.state.streak.datesLongest}
                  </p>
                </div>
                <div className="item">
                  <p className="green-text lead font-weight-bold">
                    {this.state.streak.streakCurrent}{" "}
                    <span className="days">
                      {this.state.streak.streakCurrent === 1 ? "day" : "days"}
                    </span>
                  </p>
                  <p className="small font-weight-bold">Current</p>
                  <p className="text-muted small">
                    {this.state.streak.datesCurrent}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        <div ref={this.myInput}>
          <canvas
            ref={(c) => (this.context = c)}
            width={this.state.width}
            height="400"
          ></canvas>
        </div>
        {this.state.cache && <img src={this.state.cache} alt="" />}
      </div>
    );
  }
}
//#endregion

//#region > Exports
//> Default Component
export default Calendar3D;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
