//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> Style sheet
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

    if (languages[0].size !== 0) {
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
    } else {
      return (
        <div
          className="filler"
          key={1}
          style={{
            width: `100%`,
            backgroundColor: "grey",
            zIndex: "1",
          }}
        ></div>
      );
    }
  };

  render() {
    const { languages, height } = this.props;

    return (
      <div
        className="languages"
        style={{ height: `${height ? height + "px" : "7px"}` }}
      >
        {this.renderBars(languages)}
      </div>
    );
  }
}
//#endregion

//#region > Exports
//> Default Component
export default LanguageBar;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
