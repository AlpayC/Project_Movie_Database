import { useState, useEffect } from "react";
import "./App.css";
import Modal from "./assets/components/Modal";
import Pagination from "./assets/components/Pagination";
import SearchBar from "./assets/components/SearchBar";
import MovieList from "./assets/components/MovieList";

function App() {
  const apiKey = "b5be86c5e3e794b34eb6cc507571c5e2";
  const [superData, setSuperData] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [newMoviesOn, setNewMoviesOn] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMovieId, setModalMovieId] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=de-DE&page=${pageNum}`
    )
      .then((response) => response.json())
      .then((superData) => {
        setSuperData(superData.results);
        console.log(superData);
      })
      .catch((error) => {
        console.log("Fehler beim Laden", error);
      });
  }, [pageNum, newMoviesOn]);

  useEffect(() => {
    if (!newMoviesOn) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=de-DE&query=${inputVal}&page=${pageNum}`
      )
        .then((response) => response.json())
        .then((superData) => {
          setSuperData(superData.results);
          console.log(superData);
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
    setInputVal(text);
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

  return (
    <>
      <SearchBar
        value={inputVal}
        onChange={handleInputChange}
        onSearch={handleButtonClick}
      />
      <Pagination pageNum={pageNum} onPageUp={pageUp} onPageDown={pageDown} />

      {superData ? (
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
