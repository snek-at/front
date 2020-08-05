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
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Actions
// Functions to send data from the application to the store
import { getUserSearchItems } from "../../../store/actions/generalActions";
//> Style sheet
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
    searchItems: this.props.allUserSearchItems,
  };

  componentDidMount() {
    if (this.state.loading) {
      this.props.allsearchItems().then(() => {
        this.setState({
          loading: false,
          searchItems: this.props.allUserSearchItems,
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
          {!this.state.loading && this.state.searchItems ? (
            this.state.searchItems.length > 0 && this.state.filter.length > 0 ? (

              fuzzysort
                .go(this.state.filter, this.state.searchItems, { key: "title" })
                .map((element, i) => {
                  return (
                    <MDBSelectOption
                      key={i}
                      icon={"https://octodex.github.com/images/nyantocat.gif"}
                    >
                      {element.target}
                    </MDBSelectOption>
                  );
                })
            ) : null
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
  allUserSearchItems: state.general.allUserSearchItems,
});

const mapDispatchToProps = (dispatch) => {
  return {
    allsearchItems: () => dispatch(getUserSearchItems()),
  };
};
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
