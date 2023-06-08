import React from "react";
import RatingCircle from "./RatingCircle";
import Modal from "./Modal";
import { useState } from "react";

const MovieList = ({ movies, openModal, closeModal }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="our-products">
      <h2>Suchergebnisse</h2>
      <section className="product-grid">
        {movies.map((movie, index) => (
          <div className="shop-item" key={index}>
            <p className="products-title">Titel: {movie.title}</p>
            <div>
              <h1>Rating Circle</h1>
              <RatingCircle rating={movie.vote_average} />
            </div>
            <p className="products-title">Beschreibung: {movie.overview}</p>
            <p className="products-title">Popularität: {movie.popularity}</p>
            <p className="products-title">Rating: {movie.vote_average}</p>
            <p className="products-title">Votes: {movie.vote_count}</p>
            <p className="products-title">
              Veröffentlichungsdatum:{movie.release_date}
            </p>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt=""
            />
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt=""
            />
            <div>
              <button onClick={() => openModal(movie.id)}>Modal öffnen</button>
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
