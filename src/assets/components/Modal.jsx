// Modal.jsx

import React from "react";
import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, movieId }) => {
  const [detailData, setDetailData] = useState();
  const [movie, setMovie] = useState(movieId);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=b5be86c5e3e794b34eb6cc507571c5e2&language=de-DE`
    )
      .then((response) => response.json())
      .then((detailData) => {
        setDetailData(detailData);
        console.log(detailData);
      })
      .catch((error) => {
        console.log("Fehler beim laden", error);
      });
  }, [movieId]);

  return (
    <>
      {detailData ? (
        <div className={`modal ${isOpen ? "open" : ""}`}>
          <div className="modal-content">
            <div
              className="movie-header-img-container"
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent, rgb(37, 50, 64,1)), url(https://image.tmdb.org/t/p/original/${detailData.backdrop_path})`,
              }}
            >
              <button className="close-btn" onClick={onClose}>
                X
              </button>
              {/* <h2>Movie ID: {movieId}</h2> */}
              <h5> {detailData.tagline}</h5>
              <h2> {detailData.title}</h2>
              <h4>
                Veröffentlichtungsdatum:{" "}
                {new Date(detailData.release_date).toLocaleDateString()}
              </h4>
              <h4> Spielfilmdauer: {detailData.runtime} min</h4>
            </div>

            <h2>Beschreibung: {detailData.overview}</h2>
          </div>
        </div>
      ) : (
        <p>Daten werden geladen ...</p>
      )}
    </>
  );
};

export default Modal;
