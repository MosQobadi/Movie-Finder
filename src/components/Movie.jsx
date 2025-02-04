import React from "react";

const Movie = ({ movie, onSelect }) => {
  return (
    <>
      <div
        key={movie.imdbID}
        onClick={() => onSelect(movie.imdbID)}
        className="test"
      >
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </>
  );
};

export default Movie;
