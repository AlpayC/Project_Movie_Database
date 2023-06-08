import React from "react";

function Pagination({ pageNum, onPageUp, onPageDown }) {
  return (
    <>
      <button onClick={onPageUp}>Vorwärts</button>
      <button onClick={onPageDown}>Zurück</button>
      <h1>Seite:{pageNum}</h1>
    </>
  );
}

export default Pagination;
