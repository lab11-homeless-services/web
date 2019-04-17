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
  width: 100%;
  height: 65px;
  padding-left: 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid lightgrey;
  box-shadow: 2px 4px 10px 2px #00000050;
  color: #9b9b9b;
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
  @media (max-width: 1024px) {
    font-size: .9rem;
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
            <InstantSearchContainer className="landingSearch">
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

const Modal = ({ close, show, children }) => {
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
