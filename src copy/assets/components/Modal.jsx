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
            <button className="close-btn" onClick={onClose}>
              X
            </button>
            <h2>Movie ID: {movieId}</h2>
            <h2>Movie ID: {detailData.overview}</h2>
          </div>
        </div>
      ) : (
        <p>Daten werden geladen ...</p>
      )}
    </>
  );
};

export default Modal;
