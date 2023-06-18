import "./MovieItems.css";
import RatingCircle from "../RatingCircle/RatingCircle";
const MovieItems = (props) => {
  return (
    <>
      <div
        className="movie-img-container"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.movieImg})`,
        }}
      >
        <RatingCircle rating={props.movieRating} />
      </div>
      <p className="movie-release-date">
        {new Date(props.movieYear).getUTCDate()}/
        {new Date(props.movieYear).getUTCMonth()}/
        {new Date(props.movieYear).getFullYear()}
      </p>
      <h2 className="movie-title">{props.movieName}</h2>
    </>
  );
};

export default MovieItems;
