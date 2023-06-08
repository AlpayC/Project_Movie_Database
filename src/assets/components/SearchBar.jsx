import React from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ text, onChange, onSearch }) {
  return (
    <nav>
      <div className="logo">
        <h1>
          MOV<span>.</span>
        </h1>
      </div>
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} style={{ color: "#20e28c" }} />

        <input
          type="text"
          value={text}
          onChange={onChange}
          placeholder="Interstellar, Avengers, Titanic..."
        />
        {/* <button onClick={onSearch}>Suche</button> */}
      </div>
    </nav>
  );
}

export default SearchBar;
