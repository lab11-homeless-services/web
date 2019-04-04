import React from "react";
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure, } from 'react-instantsearch-dom';
  const searchClient = algoliasearch(
    '1CH1AN74EQ',
    '357f19a4594471c0f7d04a1a2bde1e8d'
  );

class SearchBar extends React.Component {
  render() {
    return (
      <form>
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
