import React from "react";
import styled from "styled-components";

// Importing requirements to make Algolia Search work
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
//Importing component to handle each hit coming in from the searcg
import HitComponent from './HitComponent'

import "../App.css";

//Setting up empact id key and api key to allow it to connect to the index
const searchClient = algoliasearch(
  "QD6TWFQZCN", //Empact ID
  "028bde3e8ce26fd3245e84b3807905b9" //API key
);

const FakeSearchInput = styled.input`
  width: 100%;
  height: 65px;
  padding-left: 15px;
  font-size: .9rem;
  font-weight: lighter;
  border-radius: 2px;
  border: 1px solid lightgrey;
  box-shadow: 0px 1px 3px 1px #ccc;
  color: #9B9B9B;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  &:hover {
    box-shadow: 2px 4px 10px 2px #00000050;
    -webkit-transition-duration: 0.2s;
    -moz-transition-duration: 0.2s;
    -o-transition-duration: 0.2s;
    transition-duration: 0.2s;
  }
`;

const FakeSearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const FakeInputContainer = styled.div`
  position: relative;
  width: 475px;
  height: 65px;

  @media (max-width: 600px) {
    width: 90vw;
  }
`;

const FakeSearchButton = styled.div`
  width: 19%;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  background-color: #414361;
  border-radius: 2px;
  color: white;
  margin: 0 0 0 2%;
  box-shadow: 2px 4px 10px 2px #00000050;
  letter-spacing: 1px;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    display: none;
    margin: 0;
  }
`;

const InstantSearchContainer = styled.div`
  margin: 50px 0 0 0;
`;

const SearchBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 75%;
  margin-left: 12.5%;

  @media (max-width: 600px) {
    margin-left: 5%;
  }
`;

const SearchResultsContainer = styled.div`
  padding: 5% 0 0 0;
  height: 83vh;
  width: 100vw;

  @media (max-width: 600px) {
    width: 70%;
  }
`;

class SearchBar extends React.Component {
  constructor() {
    super();
    //Creating state to display the search or only render the fake input.
    this.state = {
      searchEnabled: false
    };
  }

  //Function to allow displaying modal with search
  enableSearch = e => {
    e.preventDefault();
    this.setState({
      searchEnabled: true
    });
  };

  //Function to disable displaying the modal with search
  disableSearch = e => {
    e.preventDefault();
    this.setState({
      searchEnabled: false
    });
  };

  render() {
    return (
      <div>
        <main>
          <Modal show={this.state.searchEnabled} close={this.disableSearch}>
            <InstantSearchContainer className="landingSearch">
            {/* Instant search needs the name of the index and the search client passed to it to work */}
              <InstantSearch indexName="empact" searchClient={searchClient}>
                <SearchBoxContainer>
                  <SearchBox />
                </SearchBoxContainer>
                <SearchResultsContainer>
                  <Hits hitComponent={HitComponent} />
                </SearchResultsContainer>
              </InstantSearch>
            </InstantSearchContainer>
          </Modal>
          <FakeSearchInputContainer onClick={this.enableSearch}>
            <FakeInputContainer>
              <FakeSearchInput placeholder="search for resources you need" />
              <i class="fas fa-search fa-lg" />
            </FakeInputContainer>
            <FakeSearchButton>SEARCH</FakeSearchButton>
          </FakeSearchInputContainer>
        </main>
      </div>
    );
  }
}

// Modal to display search results, passing in three objects
export const Modal = ({ close, show, children }) => {

  // Setting up a toggling className
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-landing">
        {children}
        <div className="closeButton" onClick={close}>
          X
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
