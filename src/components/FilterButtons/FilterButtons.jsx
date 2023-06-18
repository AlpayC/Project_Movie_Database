import { useContext, useState, useRef, useEffect } from "react";
import { MovieDataContext } from "../../context/Context";
import "./FilterButtons.css";

const FilterButtons = () => {
  const { movies, setMovies } = useContext(MovieDataContext);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sortierung");
  const dropdownRef = useRef(null);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const sortByDateAscending = () => {
    const sortedMovies = [...movies].sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
    setMovies(sortedMovies);
    setSelectedSort("Datum, aufsteigend");
    toggleMenu();
  };

  const sortByDateDescending = () => {
    const sortedMovies = [...movies].sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
    setMovies(sortedMovies);
    setSelectedSort("Datum, absteigend");
    toggleMenu();
  };

  const sortByBestRate = () => {
    const sortedMovies = [...movies].sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setMovies(sortedMovies);
    setSelectedSort("Beste Bewertung");
    toggleMenu();
  };

  const sortByNameAscending = () => {
    const sortedMovies = [...movies].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setMovies(sortedMovies);
    setSelectedSort("Alphatbetisch, A - Z");
    toggleMenu();
  };

  const sortByNameDescending = () => {
    const sortedMovies = [...movies].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    setMovies(sortedMovies);
    setSelectedSort("Alphatbetisch, Z - A");
    toggleMenu();
  };

  return (
    <section className="filter-container">
      <div className="dropdown" ref={dropdownRef}>
        <button className="dropdown-toggle" onClick={toggleMenu}>
          {selectedSort}
        </button>
        {showMenu && (
          <ul className="dropdown-menu">
            <li onClick={sortByDateAscending}>Datum, aufsteigend</li>
            <li onClick={sortByDateDescending}>Datum, absteigend</li>
            <li onClick={sortByBestRate}>Beste Bewertung</li>
            <li onClick={sortByNameAscending}>Alphatbetisch, A - Z</li>
            <li onClick={sortByNameDescending}>Alphatbetisch, Z - A</li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default FilterButtons;
