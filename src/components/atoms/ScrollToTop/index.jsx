//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter } from "react-router-dom";

/**
 * @class ScrollToTop Component
 * @description When reloading or switching a page, ReactJS now starts at the 
 *              top of the page, and no longer on the last position.
 */
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (location !== prevProps.location) {
      // Scroll to top of viewport
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
