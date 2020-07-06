//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> CSS
import "./languages.scss";
//#endregion

//#region > Components
/**
 * @class A language chart which contains several items with their shares.
 */
class LanguageBar extends React.Component {
  state = {};

  renderBars = (languages) => {
    let latest = 0;

    return languages.map((language, i) => {
      const { color, share } = language;
      const value = latest + share;

      latest += share;

      return (
        <div
          className="filler"
          key={i}
          style={{
            width: `${value}%`,
            backgroundColor: color,
            zIndex: languages.length - i,
          }}
        ></div>
      );
    });
  };

  render() {
    const { languages, height } = this.props;

    if (languages) {
      return (
        <div
          className="languages"
          style={{ height: `${height ? height + "px" : "7px"}` }}
        >
          {this.renderBars(languages)}
        </div>
      );
    } else {
      return null;
    }
  }
}
//#endregion

//#region > Exports
export default LanguageBar;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */