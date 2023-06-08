import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Modal from "./assets/components/Modal";
import RatingCircle from "./assets/components/RatingCircle";

function App() {
  const apiKey = "b5be86c5e3e794b34eb6cc507571c5e2";
  const [superData, setSuperData] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [newMoviesOn, setNewMoviesOn] = useState(true);
  const rating = 8;
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=b5be86c5e3e794b34eb6cc507571c5e2&language=de-DE&page=${pageNum}`
    )
      .then((response) => response.json())
      .then((superData) => {
        setSuperData(superData.results);
        console.log(superData);
      })
      .catch((error) => {
        console.log("Fehler beim laden", error);
      });
  }, [pageNum, newMoviesOn]);

  const [inputVal, setInputVal] = useState();
  useEffect(() => {
    if (newMoviesOn == false) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=b5be86c5e3e794b34eb6cc507571c5e2&language=de-DE&query=${inputVal}&page=${pageNum}`
      )
        .then((response) => response.json())
        .then((superData) => {
          setSuperData(superData.results);
          console.log(superData);
        })
        .catch((error) => {
          console.log("Fehler beim laden", error);
        });
    } else {
      return;
    }
  }, [inputVal, pageNum, newMoviesOn]);

  const pageUp = () => {
    setPageNum(pageNum + 1);
    console.log(pageNum);
  };
  const pageDown = () => {
    if (pageNum <= 1) {
      return;
    } else {
      setPageNum(pageNum - 1);
      console.log(pageNum);
    }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMovieId, setModalMovieId] = useState(null);

  const openModal = (movieId) => {
    setModalOpen(true);
    setModalMovieId(movieId);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMovieId(null);
  };
  const [text, setText] = useState(""); // Initialer Wert für den Text ist leer

  const handleButtonClick = () => {
    // Hier kannst du den eingegebenen Text verwenden oder speichern
    setInputVal(text);
  };

  const handleInputChange = (event) => {
    // Aktualisiere den Text, wenn sich der Wert des Eingabefelds ändert
    setText(event.target.value);

    if (event.target.value === ``) {
      setNewMoviesOn(true);
    } else {
      setNewMoviesOn(false);
      setInputVal(event.target.value);
    }
  };

  return (
    <>
      <div className="search-container">
        <h2>Suche</h2>
        <input type="text" value={text} onChange={handleInputChange} />
        <button onClick={handleButtonClick}>Suche</button>
      </div>
      <button onClick={pageUp}>Vorwärts</button>
      <button onClick={pageDown}>Zurück</button>
      <h1>Seite:{pageNum}</h1>
      {superData ? (
        <section className="our-products">
          <h2>Unsere Produkte</h2>
          <section className="product-grid">
            {console.log(superData)}
            {superData.map((movies, index) => (
              <div className="shop-item" key={index}>
                <p className="products-title">Titel: {movies.title}</p>
                <div>
                  <h1>Rating Circle</h1>
                  <RatingCircle rating={movies.vote_average} />
                </div>
                <p className="products-title">
                  Beschreibung: {movies.overview}
                </p>
                <p className="products-title">
                  Popularität: {movies.popularity}
                </p>
                <p className="products-title">Rating: {movies.vote_average}</p>
                <p className="products-title">Votes: {movies.vote_count}</p>
                <p className="products-title">
                  Veröffentlichungsdatum:{movies.release_date}
                </p>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
                  alt=""
                />
                <img
                  src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                  alt=""
                />
                <div>
                  <button onClick={() => openModal(movies.id)}>
                    Modal öffnen
                  </button>
                  <Modal
                    isOpen={modalOpen}
                    onClose={closeModal}
                    movieId={modalMovieId}
                  />
                </div>
              </div>
            ))}
          </section>
        </section>
      ) : (
        <p>Daten werden geladen ...</p>
      )}
    </>
  );
}

export default App;
