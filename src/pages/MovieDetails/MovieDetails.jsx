import "./MovieDetails.css";
import { Link, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { MovieDataContext } from "../../context/Context";
import YouTube from "react-youtube";

const MovieDetails = () => {
  const { movies, setMovies } = useContext(MovieDataContext);
  const [detailData, setDetailData] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const idParams = useParams();

  const detailPage = movies.filter((elm) => {
    return elm.id === Number(idParams.id);
  });

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${Number(
        idParams.id
      )}?api_key=b5be86c5e3e794b34eb6cc507571c5e2&language=de-DE`
    )
      .then((response) => response.json())
      .then((detailData) => {
        setDetailData(detailData);
        console.log(detailData);
      })
      .catch((error) => {
        console.log("Fehler beim laden", error);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${Number(
        idParams.id
      )}/videos?api_key=b5be86c5e3e794b34eb6cc507571c5e2&language=de-DE`
    )
      .then((response) => response.json())
      .then((videoData) => {
        setTrailer(videoData);
        console.log(videoData);
      })
      .catch((error) => {
        console.log("Fehler beim laden", error);
      });
  }, []);

  return (
    <>
      {detailPage[0] ? (
        <section className="movie-details-container">
          <div className="modal-content">
            <div
              className="movie-header-img-container"
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent, rgb(37, 50, 64,1)), url(https://image.tmdb.org/t/p/original/${detailPage[0].backdrop_path})`,
              }}
            >
              {/* <button className="close-btn" onClick={onClose}>
                X
              </button> */}
              {/* <h2>Movie ID: {movieId}</h2> */}
              <h5> {detailData.tagline}</h5>
              <h2> {detailData.title}</h2>
              <h4>
                Veröffentlichtungsdatum:{" "}
                {new Date(detailData.release_date).toLocaleDateString()}
              </h4>
              <h4> Spielfilmdauer: {detailData.runtime} min</h4>
              <section className="companie-logo-container">
                {detailData.production_companies?.map((item, index) =>
                  item.logo_path ? (
                    <div
                      className="companie-logo-bg"
                      key={index}
                      style={{
                        backgroundImage: ` url(https://image.tmdb.org/t/p/original/${item.logo_path})`,
                      }}
                    ></div>
                  ) : null
                )}
              </section>
            </div>
            <div className="movie-details-container-modal">
              <h2>Beschreibung: {detailData.overview}</h2>
              <h2>Umsatz: {detailData.revenue} $</h2>
              <h2>Budget: {detailData.budget} $</h2>
              <h2>Votes: {detailData.vote_count} </h2>
              <h2>Rating: {detailData.vote_average} </h2>
              <h2>Trailer: {detailData.id} </h2>
              {/* {console.log(trailer)} */}
              {trailer.id && trailer.results.length > 0 ? (
                <section className="video-trailer-container">
                  <YouTube
                    videoId={trailer.results[0].key}
                    opts={{
                      playerVars: {
                        autoplay: 0,
                      },
                    }}
                    onPlay={(event) => event.target.playVideo()}
                    onPause={(event) => event.target.pauseVideo()}
                  />
                </section>
              ) : (
                <p>Trailer wird geladen ...</p>
              )}

              {detailData.genres ? (
                <section>
                  {detailData.genres.map((item, index) => (
                    <h2 key={index}>Genres: {item.name} </h2>
                  ))}
                </section>
              ) : (
                <p>Daten werden geladen ...</p>
              )}
            </div>
          </div>
          <Link to="/home">
            <button>BACK</button>
          </Link>
        </section>
      ) : (
        <p>Daten werden geladen ...</p>
      )}
    </>
  );
};

export default MovieDetails;
