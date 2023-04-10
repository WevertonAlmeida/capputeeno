import React from 'react';
import styled from "styled-components";
import { FaSearch } from 'react-icons/fa';

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #F3F5F6;
  border-radius: 8px;
  padding: 0 10px;
  margin-right: 32px;
  min-width: 100%;
  /*max-width: 352px;*/
  height: 42px;

  @media only screen and (max-width: 1200px) {
    margin-right: 0;
    min-width: auto;
    margin: 10px 10px;    
  }
`;

const SearchInput = styled.input`
  border: none;
  width: 100%;
  background-color: #F3F5F6;
  font-size: calc(8px + 1vmin);
  font-family: Saira;
  font-weight: 400;
  font-style: normal;
  border-radius: 8px;
  outline: none;
`;

const SearchButton = styled.button`
  border: none;
  background-color: transparent;
  margin-left: 10px;
  cursor: pointer;
`;

function ProductSearchBar(props: { handleSearch: any; query: any; setQuery: any; }) {
  const { handleSearch, query, setQuery } = props;

  return (
    <SearchBar>
      <SearchInput type="text" placeholder="Procurando por algo específico?" value={query} onChange={(e) => setQuery(e.target.value)} />
      <SearchButton onClick={handleSearch}>
        <FaSearch />
      </SearchButton>
    </SearchBar>
  );
}

export default ProductSearchBar;