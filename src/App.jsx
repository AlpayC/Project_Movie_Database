import { useState, useEffect } from "react";
import "./App.css";
import Modal from "./assets/components/Modal";
import Pagination from "./assets/components/Pagination";
import SearchBar from "./assets/components/SearchBar";
import MovieList from "./assets/components/MovieList";
import GenreBtn from "./assets/components/GenreBtn";

function App(props) {
  const apiKey = "b5be86c5e3e794b34eb6cc507571c5e2";
  const [superData, setSuperData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [newMoviesOn, setNewMoviesOn] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMovieId, setModalMovieId] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [inputGenre, setInputGenre] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=de-DE&page=${pageNum}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSuperData(data.results);
        console.log(data);
      })
      .catch((error) => {
        console.log("Fehler beim Laden", error);
      });
  }, [pageNum, newMoviesOn]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=de-DE`
    )
      .then((response) => response.json())
      .then((data) => {
        setInputGenre(data.genres);
        console.log(data);
      })
      .catch((error) => {
        console.log("Fehler beim Laden", error);
      });
  }, []);

  useEffect(() => {
    if (inputGenre.length > 0) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=de-DE&page=${pageNum}&with_genres=${inputGenre}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuperData(data.results);
          console.log(data);
        })
        .catch((error) => {
          console.log("Fehler beim Laden", error);
        });
    }
  }, [pageNum, inputGenre]);

  useEffect(() => {
    if (!newMoviesOn) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=de-DE&query=${inputVal}&page=${pageNum}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuperData(data.results);
          console.log(data);
        })
        .catch((error) => {
          console.log("Fehler beim Laden", error);
        });
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

  const openModal = (movieId) => {
    setModalOpen(true);
    setModalMovieId(movieId);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMovieId(null);
  };

  const handleButtonClick = () => {
    if (inputGenre.length === 0) {
      setInputVal(text);
    }
  };

  const handleInputChange = (event) => {
    setText(event.target.value);

    if (event.target.value === "") {
      setNewMoviesOn(true);
      setInputVal("");
    } else {
      setNewMoviesOn(false);
      setInputVal(event.target.value);
    }
  };

  const handleInputClick = (genreId) => {
    if (inputGenre.includes(genreId)) {
      setInputGenre(inputGenre.filter((id) => id !== genreId));
    } else {
      setInputGenre([...inputGenre, genreId]);
    }
  };

  return (
    <>
      <SearchBar
        value={inputVal}
        onChange={handleInputChange}
        onSearch={handleButtonClick}
      />
      <GenreBtn genreIds={inputGenre} onClick={handleInputClick} />

      <Pagination pageNum={pageNum} onPageUp={pageUp} onPageDown={pageDown} />

      {superData.length > 0 ? (
        <MovieList
          movies={superData}
          openModal={openModal}
          closeModal={closeModal}
          modalOpen={modalOpen}
        />
      ) : (
        <p>Daten werden geladen ...</p>
      )}
      <Modal isOpen={modalOpen} onClose={closeModal} movieId={modalMovieId} />
    </>
  );
}

export default App;
