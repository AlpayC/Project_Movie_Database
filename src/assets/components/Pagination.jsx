import React from "react";
import "./Pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Pagination({ pageNum, onPageUp, onPageDown }) {
  return (
    <>
      <div className="pagination-container">
        <button onClick={onPageDown}>
          <FontAwesomeIcon icon={faAngleLeft} />{" "}
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>

        <h1>Seite:{pageNum}</h1>
        <button onClick={onPageUp}>
          <FontAwesomeIcon icon={faAngleRight} />{" "}
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </>
  );
}

export default Pagination;
