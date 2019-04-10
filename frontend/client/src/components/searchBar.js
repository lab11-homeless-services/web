import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "QD6TWFQZCN",
  "028bde3e8ce26fd3245e84b3807905b9"
);

const hitCom = props => {
  console.log(props);
  return <div>{props.hit.name}</div>;
};

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchEnabled: false
    };
  }

  enableSearch = e => {
    e.preventDefault();
    this.setState({
      searchEnabled: true
    });
  };

  disableSearch = e => {
    e.preventDefault();
    this.setState({
      searchEnabled: false
    });
  };

  render() {
    return (
      <div>
        {this.state.searchEnabled === true ? (
          <div>
            <InstantSearch indexName="empact" searchClient={searchClient}>
              <div onClick={this.disableSearch}>CLOSE SEARCH</div>
              <SearchBox />
              <Hits hitComponent={hitCom} />
            </InstantSearch>
          </div>
        ) : (
          <div onClick={this.enableSearch}>Search Bar</div>
        )}
      </div>
    );
  }
}

export default SearchBar;