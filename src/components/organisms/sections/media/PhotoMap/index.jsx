//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

//import "./photomap.scss";
//#endregion

//#region > Components
/** @class This component displays the landing page including login and register */
class PhotoMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      geoUrl:
        "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
      markers: [
        {
          cords: [14.180588, 46.722203],
          hover: false,
          click: false,
          img:
            "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/100073723_290663115667352_2200766204448190569_n.jpg?_nc_cat=110&_nc_sid=8ae9d6&_nc_ohc=lElXlAfEmOYAX96tO71&_nc_ht=scontent-frx5-1.cdninstagram.com&oh=8fa19466614fa0c8ed50703c5445081c&oe=5F8317DB",
        },
        {
          cords: [18, 46.722203],
          hover: false,
          click: false,
          img:
            "https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/100811582_247790446433980_4259144092930484238_n.jpg?_nc_cat=108&_nc_sid=8ae9d6&_nc_ohc=owEiRBaPxJMAX-0OHyA&_nc_ht=scontent-frt3-1.cdninstagram.com&oh=ede6635099373fb510ff6f33c7854a01&oe=5F84435C",
        },
        {
          cords: [14.180588, 50],
          hover: false,
          click: false,
          img:
            "https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/100089905_1550981121744980_7352234614965268133_n.jpg?_nc_cat=102&_nc_sid=8ae9d6&_nc_ohc=Oi7WmFJKmo4AX86q6iC&_nc_ht=scontent-frt3-1.cdninstagram.com&oh=bd2b3613661c89a70fb82f2c350d8b26&oe=5F854976",
        },
      ],
      position: {
        zoom: 1,
        cords: [0, 0],
      },
    };
  }

  hoverMarker = (marker) => {
    let markers = this.state.markers;

    for (let count = 0; count < markers.length; count++) {
      if (marker !== undefined) {
        if (markers[count].cords === marker.cords) {
          markers[count].hover = !markers[count].hover;
        }
      } else {
        markers[count].hover = !markers[count].hover;
      }
    }

    this.setState({ markers });
  };

  clickMarker = (marker) => {
    let markers = this.state.markers;

    for (let count = 0; count < markers.length; count++) {
      if (markers[count].cords === marker.cords) {
        markers[count].click = !markers[count].click;
      }
    }

    this.setState({ markers });
  };

  render() {
    return (
      <div id="photo-map">
        <ComposableMap>
          <Geographies geography={this.state.geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#48484a"
                  stroke="#FFF"
                />
              ))
            }
          </Geographies>
          {this.state.markers.map((marker, i) => (
            <Marker
              key={2}
              coordinates={marker.cords}
              onMouseEnter={() => this.hoverMarker(marker)}
              onMouseLeave={() => this.hoverMarker(marker)}
              onClick={() => this.clickMarker(marker)}
            >
              <circle r={4} fill="#F53" />
              {(marker.hover || marker.click) && (
                <image
                  href={marker.img}
                  height="100"
                  width="100"
                  x="-50"
                  y="-105"
                  onClick={() => window.open(marker.img)}
                />
              )}
            </Marker>
          ))}
        </ComposableMap>
      </div>
    );
  }
}
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 */
export default PhotoMap;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
