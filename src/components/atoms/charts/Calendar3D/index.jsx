//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Additional packages
// Used to display the time in a readable format
import moment from "moment";
//> THREE.js
import * as THREE from "three";

//> Style sheet
import "./calendar3d.scss";
//#endregion

//> Javascirpt functions
import colourMaterial from "./Colour.js";
import drawStats from "./dataCube.js";
import animation from "./animations/FAST_WAVE_80_TO_100";

import imageRanking from "../../../../assets/body/snek.png";
import CCapture from "./ccapture.js/src/CCapture.js";

import download from "downloadjs";
import WebMWriter from "webm-writer";
import GIF from "gif.js.optimized";

import oldGif from "../../../../assets/body/old_3D_cal_GIF.gif";

//#region > Components
/**
 * @class A three dimensional calendar which displays each days contributions,
 *        and contribution related statistics e.g. busiest days and streaks.
 */
class Calendar3D extends React.Component {
  constructor(props) {
    super(props);

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

      this.setState({
        width: this.myInput.current.offsetWidth,
        loading: true,
        contrib: this.calculateTopStats(),
        streak: this.calculateBottomStats(),
      });
    }
  };

  componentDidUpdate = () => {
    if (this.state.previousState !== this.state.width) {
      // Creating the scene
      var scene = new THREE.Scene();

      // Creating the camera
      var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000);

      // Creating the renderer, window size and positioning
      var renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(this.state.width, 400);
      renderer.setClearColor(0xffffff);

      var imgTag = this.myInput.current.firstChild;
      imgTag.src = oldGif;

      // Importing data
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

      // Adding days to the 3D calender
      var firstLoopIndex = 0;
      var helpState = this.state;
      contributions.weeks.forEach(loopWeeks);

      // ForEach Loop for every week
      function loopWeeks(item, index) {
        item.days.forEach(loopDaysOfWeek);
        firstLoopIndex++;
      }

      // ForEachLoop for every day within a week
      function loopDaysOfWeek(item, index) {
        // Adding geometry and material to existing json data
        item.maxBoxHeight = (30 / helpState.contrib.maxCount) * item.total + 1;
        var geometry = new THREE.BoxGeometry(0.3, 0.1, 0.24);
        var material = new THREE.MeshBasicMaterial({
          vertexColors: THREE.FaceColors,
        });

        // Colouring of faces
        colourMaterial.colourMaterialFaces(geometry.faces, "#fafafa");

        // Adding cube for every day
        item.cube = new THREE.Mesh(geometry, material);
        item.cube.position.x = 0.36 * firstLoopIndex;
        item.cube.position.z = 0.3 * index;

        scene.add(item.cube);
      }

      // Calculate text percentage
      var textPer = (this.state.width * 400) / 400000;
      if (textPer > 1) textPer = 1;

      // Set Top Texts
      var spriteTop = this.renderTopStats();

      //spriteTop.scale.set(1920 / this.state.width * 2 * textPer, 969 / 400 * 4 * textPer);
      spriteTop.position.set(23.2, 17, 0);

      scene.add(spriteTop);

      // Set Bottom Stats
      var spriteBot = this.renderBottomStats();

      //spriteBot.scale.set(1920 / this.state.width * 2 * textPer, 969 / 400 * 4 * textPer);
      spriteBot.position.set(2, -14.5, 0);

      scene.add(spriteBot);

      // Set Logo
      var spriteMap = new THREE.TextureLoader().load(imageRanking);

      var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });

      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(21.7, 0.6, 0);
      sprite.scale.set(0.2, 0.15, 1);

      scene.add(sprite);

      // Set Camera Position and Rotation
      camera.position.set(33, 30, 16);
      camera.rotation.set(
        degreeToRad(-62.5),
        degreeToRad(35),
        degreeToRad(47.6)
      );
      camera.scale.set(8, 8);

      function degreeToRad(degree) {
        return (degree / 180) * Math.PI;
      }

      // Set up gif renderer
      function expose() {
        Object.assign(window, {
          WebMWriter,
          download,
          GIF,
        });
      }
      expose();

      var rendered = false;
      var capturer = new CCapture({ format: "gif", workersPath: "/worker/" });

      capturer.start();

      // Rendering the scene
      function animate() {
        requestAnimationFrame(animate);
        contributions.weeks.forEach(animation.loopWeeksRender);
        renderer.render(scene, camera);
        if (!rendered) {
          capturer.capture(renderer.domElement);
          if (animation.finished) {
            rendered = true;
            capturer.stop();
            capturer.save(function (blob) {
              imgTag.src = window.URL.createObjectURL(blob);
            });
          }
        }
      }

      animate();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({
      width: this.myInput.current.offsetWidth,
    });
  };

  calculateTopStats() {
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

  renderTopStats() {
    return drawStats.drawDataCube({
      heading: {
        text: "Contributions",
        font: "Arial",
        weight: "bold",
        size: 330,
        color: { r: 0, g: 0, b: 0, a: 1.0 },
        margin: { l: 5, t: 5, r: 5, b: 175 },
      },
      border: {
        toDraw: true,
        thickness: 1,
        borderColor: { r: 235, g: 237, b: 240, a: 1.0 },
        fillColor: { r: 253, g: 253, b: 253, a: 1.0 },
        margin: { l: 5, t: 20, r: 5, b: 5 },
        padding: { l: 175, t: 0, r: 0, b: 0 },
        radius: 150,
      },
      texts: [
        [
          {
            text: this.state.contrib.countTotal,
            font: "Arial",
            weight: "bold",
            size: 480,
            color: { r: 77, g: 190, b: 43, a: 1.0 },
            margin: { l: 150, t: 45, r: 5, b: 100 },
          },
          {
            text: "Total",
            font: "Arial",
            weight: "bold",
            size: 250,
            color: { r: 63, g: 63, b: 65, a: 1.0 },
            margin: { l: 150, t: 250, r: 5, b: 25 },
          },
          {
            text: this.state.contrib.datesTotal,
            font: "Arial",
            size: 250,
            color: { r: 154, g: 154, b: 154, a: 1.0 },
            margin: { l: 150, t: 140, r: 5, b: 5 },
          },
        ],
        [
          {
            text: this.state.contrib.maxCount,
            font: "Arial",
            weight: "bold",
            size: 480,
            color: { r: 77, g: 190, b: 43, a: 1.0 },
            margin: { l: 175, t: 45, r: 5, b: 15 },
          },
          {
            text: "Best day",
            font: "Arial",
            weight: "bold",
            size: 250,
            color: { r: 63, g: 63, b: 65, a: 1.0 },
            margin: { l: 175, t: 250, r: 5, b: 25 },
          },
          {
            text: this.state.contrib.dateBest,
            font: "Arial",
            size: 250,
            color: { r: 154, g: 154, b: 154, a: 1.0 },
            margin: { l: 175, t: 140, r: 5, b: 5 },
          },
        ],
      ],
      footer: {
        drawFooter: true,
        footerFont: "Arial",
        footerFontSize: 270,
        margin: { l: 5, t: 5, r: 5, b: 5 },
        footerText: [
          {
            text: "Average: ",
            weight: "normal",
            color: { r: 63, g: 63, b: 65, a: 1.0 },
          },
          {
            text: this.state.contrib.averageCount,
            weight: "normal",
            color: { r: 77, g: 190, b: 43, a: 1.0 },
          },
          {
            text: " / day",
            weight: "normal",
            color: { r: 63, g: 63, b: 65, a: 1.0 },
          },
        ],
      },
    });
  }

  calculateBottomStats() {
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

  renderBottomStats() {
    return drawStats.drawDataCube({
      heading: {
        text: "Streaks",
        font: "Arial",
        weight: "bold",
        size: 330,
        color: { r: 63, g: 63, b: 65, a: 1.0 },
        margin: { l: 5, t: 5, r: 5, b: 175 },
      },
      border: {
        toDraw: true,
        thickness: 1,
        borderColor: { r: 235, g: 237, b: 240, a: 1.0 },
        fillColor: { r: 253, g: 253, b: 253, a: 1.0 },
        margin: { l: 5, t: 20, r: 5, b: 5 },
        padding: { l: 175, t: 0, r: 0, b: 0 },
        radius: 150,
      },
      texts: [
        [
          {
            text: this.state.streak.streakLongest + " d",
            font: "Arial",
            weight: "bold",
            size: 480,
            color: { r: 77, g: 190, b: 43, a: 1.0 },
            margin: { l: 150, t: 45, r: 5, b: 100 },
          },
          {
            text: "Longest",
            font: "Arial",
            weight: "bold",
            size: 250,
            color: { r: 63, g: 63, b: 65, a: 1.0 },
            margin: { l: 150, t: 250, r: 5, b: 25 },
          },
          {
            text: this.state.streak.datesLongest,
            font: "Arial",
            size: 250,
            color: { r: 154, g: 154, b: 154, a: 1.0 },
            margin: { l: 150, t: 140, r: 5, b: 5 },
          },
        ],
        [
          {
            text: this.state.streak.streakCurrent + " d",
            font: "Arial",
            weight: "bold",
            size: 480,
            color: { r: 77, g: 190, b: 43, a: 1.0 },
            margin: { l: 175, t: 45, r: 5, b: 100 },
          },
          {
            text: "Current",
            font: "Arial",
            weight: "bold",
            size: 250,
            color: { r: 63, g: 63, b: 65, a: 1.0 },
            margin: { l: 175, t: 255, r: 5, b: 25 },
          },
          {
            text: this.state.streak.datesCurrent,
            font: "Arial",
            size: 250,
            color: { r: 154, g: 154, b: 154, a: 1.0 },
            margin: { l: 175, t: 140, r: 5, b: 5 },
          },
        ],
      ],
    });
  }

  render() {
    return (
      <div id="calendar3d">
        {/*this.state.width > 500 && (
          <>
            {<div className="top-stats">
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
            </div>}{
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
              </div>}
          </>
            )*/}
        <div ref={this.myInput}>
          <img></img>
        </div>
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
