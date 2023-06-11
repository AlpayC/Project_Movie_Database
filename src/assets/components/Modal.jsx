// Modal.jsx

import React from "react";
import { useEffect, useState } from "react";
import "./Modal.css";
import ReactPlayer from "react-player";

const Modal = ({ isOpen, onClose, movieId }) => {
  const [detailData, setDetailData] = useState();
  const [movie, setMovie] = useState(movieId);
  const [trailer, setTrailer] = useState([]);

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

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=b5be86c5e3e794b34eb6cc507571c5e2&language=de-DE`
    )
      .then((response) => response.json())
      .then((videoData) => {
        setTrailer(videoData);
        console.log(videoData);
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
              {detailData.genres ? (
                <section className="companie-logo-container">
                  {detailData.production_companies.map((item, index) =>
                    item.logo_path ? (
                      <div
                        className="companie-logo-bg"
                        key={index}
                        style={{
                          backgroundImage: ` url(https://image.tmdb.org/t/p/original/${item.logo_path})`,
                        }}
                      ></div>
                    ) : null
                  )}
                </section>
              ) : (
                <p>Daten werden geladen ...</p>
              )}
            </div>
            <div className="movie-details-container-modal">
              <h2>Beschreibung: {detailData.overview}</h2>
              <h2>Umsatz: {detailData.revenue} $</h2>
              <h2>Budget: {detailData.budget} $</h2>
              <h2>Votes: {detailData.vote_count} </h2>
              <h2>Rating: {detailData.vote_average} </h2>
              <h2>Trailer: {detailData.id} </h2>
              {console.log(trailer)}
              {trailer.id ? (
                <section className="video-trailer-container">
                  {trailer.results.map((item, index) =>
                    item.key ? (
                      <ReactPlayer
                        key={index}
                        controls={true}
                        url={`https://www.youtube.com/watch?v=${item.key}`}
                      />
                    ) : null
                  )}
                </section>
              ) : (
                <p>Daten werden geladen ...</p>
              )}

              {detailData.genres ? (
                <section>
                  {detailData.genres.map((item, index) => (
                    <h2 key={index}>Genres: {item.name} </h2>
                  ))}
                </section>
              ) : (
                <p>Daten werden geladen ...</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Daten werden geladen ...</p>
      )}
    </>
  );
};

export default Modal;
