import { useContext, useState, useEffect } from "react";
import {
  MovieDataContext,
  SearchedGenreContext,
  GenreContext,
} from "../../context/Context";

import "./GenreButtons.css";

const GenreButtons = () => {
  const apiKey = "b5be86c5e3e794b34eb6cc507571c5e2";

  const { movies, setMovies } = useContext(MovieDataContext);
  const { searchingGenres, setSearchingGenres } =
    useContext(SearchedGenreContext);
  const [genredMovies, setgenredMovies] = useState(movies);
  const { getGenre, setGetGenre } = useContext(GenreContext);

  // const uniqueGenresDistinct = Array.from(
  //   new Set(getGenre.flatMap((movie) => movie.genre))
  // );

  const filterByGenre = (e) => {
    setSearchingGenres(e.target.value);
  };

  return (
    <>
      <section className="genre-container">
        {getGenre?.map((item, index) => (
          <button
            key={index}
            onClick={filterByGenre}
            value={item.id}
            className="active"
          >
            {item.name}
          </button>
        ))}
      </section>
    </>
  );
};

export default GenreButtons;
