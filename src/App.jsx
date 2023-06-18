import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Loader from "./pages/Loader/Loader";

import { MovieDataContext } from "./context/Context";
import { OrignalDataContext } from "./context/Context";
import { PageDataContext } from "./context/Context";
import { InputValContext } from "./context/Context";
import { SearchedMoviesContext } from "./context/Context";
import { SearchedGenreContext } from "./context/Context";
import { GenreContext } from "./context/Context";

function App() {
  const [movies, setMovies] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [inputVal, setInputVal] = useState("");
  const [searchingMovies, setSearchingMovies] = useState(false);
  const [searchingGenres, setSearchingGenres] = useState();
  const [getGenre, setGetGenre] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  // # Fetch Genre IDS
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=de-DE`
    )
      .then((response) => response.json())
      .then((data) => {
        setGetGenre(data.genres);
      })
      .catch((error) => {
        console.log("Fehler beim Laden", error);
      });
  }, []);

  // # Fetch Startseite
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=de-DE&page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
        setOriginalData(data.results);
        setPageNumber(pageNumber);
        setInputVal(inputVal);
      })
      .catch((error) => {
        console.log("Fehler beim Laden", error);
      });
  }, []);

  // # Fetch Output über verschiedene Dependencies
  useEffect(() => {
    if (searchingGenres > 1) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=de-DE&with_genres=${searchingGenres}&page=${pageNumber}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetch Genres", searchingGenres);
          setMovies(data.results);
        })
        .catch((error) => {
          console.log("Fehler beim Laden", error);
        });
    } else if (searchingMovies === true) {
      setSearchingGenres();
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=de-DE&query=${inputVal}&page=${pageNumber}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetch InputSearch", searchingMovies);
          setMovies(data.results);
          setOriginalData(data.results);
          setPageNumber(pageNumber);
          setInputVal(inputVal);
        })
        .catch((error) => {
          console.log("Fehler beim Laden", error);
        });
    } else if (inputVal === "" && searchingMovies === false) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=de-DE&page=${pageNumber}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchingGenres();
          setMovies(data.results);
          setOriginalData(data.results);
          setPageNumber(pageNumber);
          setInputVal(inputVal);
        })
        .catch((error) => {
          console.log("Fehler beim Laden", error);
        });
      console.log("refreshed");
    }
  }, [inputVal, searchingMovies, pageNumber, searchingGenres]);

  return (
    <>
      <SearchedMoviesContext.Provider
        value={{ searchingMovies, setSearchingMovies }}
      >
        <SearchedGenreContext.Provider
          value={{ searchingGenres, setSearchingGenres }}
        >
          <GenreContext.Provider value={{ getGenre, setGetGenre }}>
            <MovieDataContext.Provider value={{ movies, setMovies }}>
              <InputValContext.Provider value={{ inputVal, setInputVal }}>
                <OrignalDataContext.Provider
                  value={{ originalData, setOriginalData }}
                >
                  <PageDataContext.Provider
                    value={{ pageNumber, setPageNumber }}
                  >
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<Loader />} />
                        <Route path="/home/" element={<Home />} />
                        <Route
                          path="/home/moviedetails/:id"
                          element={<MovieDetails />}
                        />
                      </Routes>
                    </BrowserRouter>
                  </PageDataContext.Provider>
                </OrignalDataContext.Provider>
              </InputValContext.Provider>
            </MovieDataContext.Provider>
          </GenreContext.Provider>
        </SearchedGenreContext.Provider>
      </SearchedMoviesContext.Provider>
    </>
  );
}

export default App;
