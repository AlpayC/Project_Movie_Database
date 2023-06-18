import React, { useContext, useState, useEffect } from "react";
import { MovieDataContext } from "../../context/Context";
import "./Search.css";
import Pagination from "../Pagination/Pagination";

import { OrignalDataContext } from "../../context/Context";
import { PageDataContext } from "../../context/Context";
import { InputValContext } from "../../context/Context";
import { SearchedMoviesContext } from "../../context/Context";
import { SearchedGenreContext } from "../../context/Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Search = () => {
  const { movies, setMovies } = useContext(MovieDataContext);
  const { originalData, setOriginalData } = useContext(OrignalDataContext);
  const { pageNumber, setPageNumber } = useContext(PageDataContext);
  const { inputVal, setInputVal } = useContext(InputValContext);
  const { searchingMovies, setSearchingMovies } = useContext(
    SearchedMoviesContext
  );
  const { searchingGenres, setSearchingGenres } =
    useContext(SearchedGenreContext);

  const [newMoviesOn, setNewMoviesOn] = useState(true);

  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);

    if (event.target.value === "") {
      setSearchingMovies(false);
      setInputVal("");
    } else {
      setSearchingGenres();
      setSearchingMovies(true);
      setInputVal(event.target.value);
    }
  };

  return (
    <>
      <nav>
        <div className="logo">
          <Link to="/home">
            <h1>
              MOV<span>.</span>
            </h1>
          </Link>
        </div>
        <section className="search-container">
          <FontAwesomeIcon icon={faSearch} style={{ color: "#20e28c" }} />
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Interstellar, Avengers, Titanic..."
            value={text}
          ></input>
        </section>
      </nav>
      <Pagination value={inputVal} />
    </>
  );
};

export default Search;

//##### FILTERMETHODE FÜR DIE SUCHE VON EINZELNEN BEGRIFFEN
//   const [searchTerm, setSearchTerm] = useState("");
// const [originalArray, setOriginalArray] = useState(movies);
// // Effekt, um das originalArray mit dem initialen movies-Array zu initialisieren
// useEffect(() => {
//   setOriginalArray(movies);
// }, []);

// const filterByName = (e) => {
//   const searchTerm = e.target.value.toLowerCase();
//   setSearchTerm(searchTerm);
// };

// // Effekt, der bei Änderungen des searchTerm oder originalArray ausgelöst wird
// useEffect(() => {
//   if (searchTerm === "") {
//     // Wenn searchTerm leer ist, setze movies auf das ursprüngliche Array zurück. Wenn der Input wieder mit der Rücktaste gelöscht wird, dann wird der searchTerm aktualisiert da Dependencie Array und der UseEffect wird wieder gefeuert. Searchterm enthält nun Buchstaben und es wiederholt sich.
//     setMovies(originalArray);
//   } else {
//     // Filtere das originalArray basierend auf dem searchTerm
//     const filteredMovies = originalArray.filter((movie) =>
//       movie.title.toLowerCase().includes(searchTerm)
//     );
//     // Setze movies auf das gefilterte Array
//     setMovies(filteredMovies);
//   }
// }, [searchTerm, originalArray, setMovies]);
// useEffect(() => {
//   if (!newMoviesOn) {
//     fetch(
//       `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=de-DE&query=${inputVal}&page=${pageNumber}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setMovies(data.results);
//         console.log(data);
//       })
//       .catch((error) => {
//         console.log("Fehler beim Laden", error);
//       });
//   }
// }, [inputVal, pageNum, newMoviesOn]);
