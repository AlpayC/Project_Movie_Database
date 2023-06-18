import "./Pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState, useContext } from "react";
import { MovieDataContext } from "../../context/Context";
import { OrignalDataContext } from "../../context/Context";
import { PageDataContext } from "../../context/Context";

const Pagination = () => {
  const { movies, setMovies } = useContext(MovieDataContext);
  const { originalData, setOriginalData } = useContext(OrignalDataContext);
  const { pageNumber, setPageNumber } = useContext(PageDataContext);

  const [pageNum, setPageNum] = useState(1);

  const pageUp = () => {
    setPageNumber(pageNumber + 1);
  };

  const pageDown = () => {
    if (pageNumber <= 1) {
      return;
    } else {
      setPageNumber(pageNumber - 1);
    }
  };
  return (
    <>
      <div className="pagination-container">
        <button onClick={pageDown}>
          <FontAwesomeIcon icon={faAngleLeft} />
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>

        <h1>Seite:{pageNumber}</h1>
        <button onClick={pageUp}>
          <FontAwesomeIcon icon={faAngleRight} />
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </>
  );
};

export default Pagination;
