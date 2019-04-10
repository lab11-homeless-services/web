// import React from "react";
// import axios from "axios";
// import algoliasearch from "algoliasearch";

// var client = algoliasearch("QD6TWFQZCN", '028bde3e8ce26fd3245e84b3807905b9');
// var index = client.initIndex('empact');

// axios.get('https://empact-e511a.firebaseio.com/shelters/all/.json')
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


// class SearchBar extends React.Component {




//   render() {
//     return (
//       <form   >
//         <input 
//           type="search"
//           autoComplete="off"
//           autoCapitalize="off"
//           spellCheck="false"
//           maxLength="255"
//           placeholder="Search for Resources"
//         />
//       </form>
//     );
//   }
// }
import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'QD6TWFQZCN',
  '028bde3e8ce26fd3245e84b3807905b9'
);



class SearchBar extends React.Component {
  state= {
    searchEnabled: false
  }

  enableSearch = e => {
    e.preventDefault() 
    this.setState(
      {searchEnabled: true}
    )
  }
 
   
  
  render() {
    return(
      <div>
        {this.state.searchEnabled === true ? (
          <div>
            <InstantSearch
              indexName="empact"
              searchClient={searchClient}
            >
            <SearchBox />
            <Hits hitComponent={hitCom}/>
            </InstantSearch>
          </div>
        ): null }   
      </div>

    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);



export default SearchBar;