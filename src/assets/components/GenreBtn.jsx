import React from "react";
import "./GenreBtn.css";
import { useState } from "react";

function GenreBtn(genreIds) {
  const [genre, setGenre] = useState(genreIds);
  console.log(genreIds);
  return (
    <>
      {genreIds.genreIds.genres ? (
        <div className="genres-container">
          {genreIds.genreIds.genres.map((genreItem, index) => (
            <button genreSearchId={genreItem.id} key={index}>
              {genreItem.name}
            </button>
          ))}
        </div>
      ) : (
        <p>Daten werden geladen ...</p>
      )}
    </>
  );
}

export default GenreBtn;
