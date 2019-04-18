import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

import "../App.css";

const searchClient = algoliasearch(
  "QD6TWFQZCN",
  "028bde3e8ce26fd3245e84b3807905b9"
);

const FakeSearchInput = styled.input`
  width: 500px;
  height: 60px;
  padding-left: 15px;
  font-size: 14px;
  border-radius: 2px;
  box-shadow: 1px 2px 4px 2px #00000050;
  color: #9b9b9b;

  @media (max-width: 600px) {
    width: 400px;
    display: flex;
`;

const FakeSearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4%;

    @media (max-width: 600px) {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
`;

const FakeSearchButton = styled.div`
  width: 125px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  background-color: #656176;
  border-radius: 2px;
  color: white;
  margin: 0 5% 0 2%;
  box-shadow: 1px 2px 4px 2px #00000050;
`;

const InstantSearchContainer = styled.div`
  margin: 50px 0 0 0;
`;

const SearchBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 75%;
  margin-left: 12.5%;
`;

const SearchResultsContainer = styled.div`
  padding: 5% 0 0 0;
  height: 83vh;
  width: 100vw;
  padding-left: 10%;
`;

const StyledHit = styled.div`
  margin-bottom: 2%;
  font-size: 1.6rem;
  color: white;
`;

const hitCom = props => {
  return (
    <Link to={`/home/shelters/all/${props.hit.linkId}`}>
      <div>
        <StyledHit>{props.hit.name}</StyledHit>
      </div>
    </Link>
  );
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
        <main>
          <Modal show={this.state.searchEnabled} close={this.disableSearch}>
            <InstantSearchContainer className="mainSearch">
              <InstantSearch indexName="empact" searchClient={searchClient}>
                <SearchBoxContainer>
                  <SearchBox />
                </SearchBoxContainer>
                <SearchResultsContainer>
                  <Hits hitComponent={hitCom} />
                </SearchResultsContainer>
              </InstantSearch>
            </InstantSearchContainer>
          </Modal>
          <FakeSearchInputContainer onClick={this.enableSearch}>
            <FakeSearchInput placeholder="search for resources you need" />
            <FakeSearchButton>SEARCH</FakeSearchButton>
          </FakeSearchInputContainer>
        </main>
      </div>
    );
  }
}

const Modal = ({ close, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
       <div onClick={close}>{children}</div>
        <div className="closeButton" onClick={close}>
          X
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
