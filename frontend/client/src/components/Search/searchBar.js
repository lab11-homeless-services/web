import React from "react";
// import indexSheltersToElastic from './searchfunc';
// import algoliasearch from "algoliasearch/lite";
// import {
//   InstantSearch,
//   Hits,
//   SearchBox,
//   Pagination,
//   Highlight,
//   ClearRefinements,
//   RefinementList,
//   Configure
// } from "react-instantsearch-dom";
// const searchClient = algoliasearch(
//   process.env.ALGOLIA_API_KEY
// );
//const index = client.initIndex('empact');

// fetch('https://empact-e511a.firebaseio.com/.json')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(empact) {
//     index.addObjects(empact)
//   });
//functions.https.onRequest((request, response) => console.log('https request', request));

class SearchBar extends React.Component {
  render() {
    return (
      <form   >
        <input
          type="search"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          maxLength="255"
          placeholder="Search for Resources"
        />
      </form>
    );
  }
}
//onChange= "indexSheltersToElastic"

export default SearchBar;