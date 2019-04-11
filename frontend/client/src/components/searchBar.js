import React from "react";
import styled from 'styled-components';

import { Link } from 'react-router-dom'
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "QD6TWFQZCN",
  "028bde3e8ce26fd3245e84b3807905b9"
);

const FakeSearchInput = styled.input`
  width: 355px;
  height: 43px;
  padding-left: 10px;
  font-size: 11px;
  border-radius: 2px;
  box-shadow: 1px 3px #00000020;
  color: #9b9b9b;
`;

const FakeSearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const FakeSearchButton = styled.div`
  width: 90px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #656176;
  border-radius: 2px;
  color: white;
  margin: 0 20px 0 5px;
  box-shadow: 1px 3px #00000020;
`;

const InstantSearchContainer = styled.div`
  margin-top: 100px;
`;

const hitCom = props => {
  console.log(props);
  return (
    <Link to={`/home/shelters/all/${props.hit.linkId}`}>
      <div>
          <div>{props.hit.name}</div>
      </div>
    </Link>
    ) ;
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
          <InstantSearchContainer>
            <InstantSearch indexName="empact" searchClient={searchClient}>
              <div onClick={this.disableSearch}>CLOSE SEARCH</div>
              <SearchBox />
              <Hits hitComponent={hitCom} />
            </InstantSearch>
          </InstantSearchContainer>
        ) : (
          <FakeSearchInputContainer onClick={this.enableSearch}>
            <FakeSearchInput placeholder= 'search for resources you need' />
            <FakeSearchButton>SEARCH</FakeSearchButton>
          </FakeSearchInputContainer>
        )}
      </div>
    );
  }
}

export default SearchBar;