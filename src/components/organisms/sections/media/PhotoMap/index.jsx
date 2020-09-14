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
        { cords: [-74.006, 40.7128], hover: false, click: false },
        { cords: [74.006, -40.7128], hover: false, click: false },
        { cords: [74.006, -38.7128], hover: false, click: false },
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
          <ZoomableGroup
            zoom={this.state.position.zoom}
            center={this.state.position.coordinates}
          >
            <Geographies geography={this.state.geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#DDD"
                    stroke="#FFF"
                  />
                ))
              }
            </Geographies>
            {this.state.markers.map((marker) => (
              <Marker
                coordinates={marker.cords}
                onMouseEnter={() => this.hoverMarker(marker)}
                onMouseLeave={() => this.hoverMarker(marker)}
                onClick={() => this.clickMarker(marker)}
              >
                <circle r={2} fill="#F53" />
                {(marker.hover || marker.click) && (
                  <image
                    href="https://instagram.fvie1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/118165085_114965910172930_2351104314231093064_n.jpg?_nc_ht=instagram.fvie1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=3qTKCH0tXbEAX8JfXqn&oh=2ac53942deeac9c60263df9a01b66b27&oe=5F766056"
                    height="100"
                    width="100"
                    x="-50"
                    y="-105"
                    onClick={() =>
                      window.open(
                        "https://instagram.fvie1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/118165085_114965910172930_2351104314231093064_n.jpg?_nc_ht=instagram.fvie1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=3qTKCH0tXbEAX8JfXqn&oh=2ac53942deeac9c60263df9a01b66b27&oe=5F766056"
                      )
                    }
                  />
                )}
              </Marker>
            ))}
          </ZoomableGroup>
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
