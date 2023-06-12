import React from "react";
import "./GenreBtn.css";

function GenreBtn({ genreIds, onClick }) {
  return (
    <div className="genres-container">
      {genreIds.map((genreItem, index) => {
        if (genreItem.id) {
          return (
            <button
              key={index}
              onClick={() => onClick(genreItem.id)}
              data-genre-search-id={genreItem.id}
              className="active"
            >
              {genreItem.name}
            </button>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default GenreBtn;
