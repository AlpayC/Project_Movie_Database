import React from "react";
import RatingCircle from "./RatingCircle";
import Modal from "./Modal";
import { useState } from "react";
import "./MovieList.css";

const MovieList = ({ movies, openModal, closeModal }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="movie-container">
      <h2>Suchergebnisse</h2>
      <section className="movie-grid">
        {movies.map((movie, index) => (
          <div
            className="movie-item"
            key={index}
            onClick={() => openModal(movie.id)}
          >
            {/* <p className="products-title">Beschreibung: {movie.overview}</p> */}
            {/* <p className="products-title">Popularität: {movie.popularity}</p>
            <p className="products-title">Rating: {movie.vote_average}</p>
            <p className="products-title">Votes: {movie.vote_count}</p> */}
            {/* <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt=""
            /> */}
            <div
              className="movie-img-container"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
              }}
            >
              {/* <img
                className="movie-img"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt=""
              /> */}
              <RatingCircle rating={movie.vote_average} />
            </div>

            <p className="movie-release-date">
              {new Date(movie.release_date).getFullYear()}
            </p>
            <h3 className="movie-title">{movie.title}</h3>
            <div>
              {/* <button onClick={() => openModal(movie.id)}>Modal öffnen</button> */}
              <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                movieId={movie.id}
              />
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default MovieList;
