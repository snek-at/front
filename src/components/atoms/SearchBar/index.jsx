//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter } from "react-router-dom";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions,
} from "mdbreact";
//> Fuzzysort
// Fast SublimeText-like fuzzy search for JavaScript
import * as fuzzysort from "fuzzysort";
//> Redux
import { connect } from "react-redux";

//> Actions
import { getAllPageUrlsAction } from "../../../store/actions/generalActions";
//> CSS
import "./search.scss";
//#endregion

//#region > Components
/**
 * @class A component which contains a search bar
 */
class SearchBar extends React.Component {
  state = {
    loading: true,
    filter: "",
    usernames: this.props.allRegisteredUsernames,
  };

  componentDidMount() {
    if (this.state.loading) {
      this.props.allUsernames().then(() => {
        console.log("ALL USERNAMES", this.props.allRegisteredUsernames);
        this.setState({
          loading: false,
          usernames: this.props.allRegisteredUsernames,
        });
      });
    }
  }

  handleSelection = (event, value) => {
    if (event === "user") {
      this.props.history.push("/u/" + value);
    } else if (event === "search_page") {
      this.props.history.push("/search?q=" + value);
    }
  };

  search = (event) => {
    console.log(event);
    const value = event.target.value;

    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.handleSelection("search_page", value);
    } else {
      this.setState({
        filter: value,
      });
    }
  };

  render() {
    console.log("RENDER NAV");
    console.log(fuzzysort);
    //Select component does not support onChange event. Instead, you can use getValue or getTextContent methods.
    return (
      <MDBSelect
        id="search"
        onKeyUp={(e) => this.search(e)}
        getValue={(value) => this.handleSelection("user", value)}
        outline
      >
        <MDBSelectInput selected="Find a user" />
        <MDBSelectOptions search searchLabel="">
          {!this.state.loading && this.state.usernames ? (
            (console.log(this.state.usernames),
            this.state.usernames.length > 0 && this.state.filter.length > 0
              ? (console.log("FUZZY"),
                fuzzysort
                  .go(this.state.filter, this.state.usernames)
                  .map((element, i) => {
                    console.log("FUZZY ELEMNET", element);
                    return (
                      <MDBSelectOption
                        key={i}
                        icon={"https://octodex.github.com/images/nyantocat.gif"}
                      >
                        {element.target}
                      </MDBSelectOption>
                    );
                  }))
              : null)
          ) : (
            <span>Loading</span>
          )}
        </MDBSelectOptions>
      </MDBSelect>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state) => ({
  allRegisteredUsernames: state.general.allRegisteredUsernames,
});

const mapDispatchToProps = (dispatch) => {
  return {
    allUsernames: () => dispatch(getAllPageUrlsAction()),
  };
};
//#endregion

//#region > Exports
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
