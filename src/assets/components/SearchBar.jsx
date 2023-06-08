import React from "react";

function SearchBar({ text, onChange, onSearch }) {
  return (
    <div className="search-container">
      <h2>Suche</h2>
      <input type="text" value={text} onChange={onChange} />
      <button onClick={onSearch}>Suche</button>
    </div>
  );
}

export default SearchBar;
