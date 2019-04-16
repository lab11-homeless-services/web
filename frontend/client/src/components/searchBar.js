import React from "react";
import styled from 'styled-components';

import { Link } from 'react-router-dom'
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

import '../App.css';

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
`;

const FakeSearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
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
  margin: 0 70px 0 5px;
  box-shadow: 1px 2px 4px 2px #00000050;
`;

const InstantSearchContainer = styled.div`
  margin-top: 100px;
`;

const hitCom = props => {
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
      searchEnabled: false,
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
          <InstantSearchContainer>
            <InstantSearch indexName="empact" searchClient={searchClient}>
              <SearchBox />
              <Hits hitComponent={hitCom} />
            </InstantSearch>
          </InstantSearchContainer>
        </Modal>
          <FakeSearchInputContainer onClick={this.enableSearch}>
            <FakeSearchInput placeholder= 'search for resources you need' />
            <FakeSearchButton>SEARCH</FakeSearchButton>
          </FakeSearchInputContainer>
      </main>
      </div>
    );
  }
}


const Modal = ({ close, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <div className='closeButton' onClick={close}>X</div>
      </section>
    </div>
  );
};

export default SearchBar;