import React from "react";
//import axios from "axios";
//import algoliasearch from "algoliasearch";

// var client = algoliasearch("QD6TWFQZCN", '028bde3e8ce26fd3245e84b3807905b9');
// var index = client.initIndex('empact');

// axios.get('https://empact-e511a.firebaseio.com/.json')
//   .then(function(response) {
//     return response;
//   })
//   .then(function(empact) {
//     index.addObjects([empact])
//   });
// // functions.https.onRequest((request, response) => console.log('https request', request));

// index
//   .search({
//     query: 'query string'
//   })
//   .then(function(responses) {
//     console.log(responses);
//   });


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


export default SearchBar;