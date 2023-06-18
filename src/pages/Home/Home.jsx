import { useEffect, useState } from "react";
import "./Home.css";
import MovieItems from "../../components/MovieItems/MovieItems";
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import { useContext } from "react";
import { MovieDataContext } from "../../context/Context";
import { OrignalDataContext } from "../../context/Context";
import { PageDataContext } from "../../context/Context";
import Search from "../../components/Search/Search";
import { Link } from "react-router-dom";
import GenreButtons from "../../components/GenreButtons/GenreButtons";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
  const { movies, setMovies } = useContext(MovieDataContext);
  const { pageNumber, setPageNumber } = useContext(MovieDataContext);

  return (
    <>
      <Search />
      <GenreButtons></GenreButtons>
      <FilterButtons></FilterButtons>

      <section className="movie-container">
        <h2>Results {movies.length}</h2>
        <section className="movie-grid">
          {movies?.map((item, index) => (
            <div className="movie-item" key={index}>
              <Link to={`/home/moviedetails/${item.id}`}>
                <MovieItems
                  key={index}
                  movieName={item.title}
                  movieYear={item.release_date}
                  movieDuration={item.duration}
                  movieRating={item.vote_average}
                  movieGenres={item.genre_ids}
                  movieImg={item.poster_path}
                />
              </Link>
            </div>
          ))}
        </section>
      </section>
    </>
  );
};

export default Home;
