import React from "react";

const WatchedMovie = ({ movie, onDelete }) => {
  const deleteMovie = (id) => {
    onDelete(id);
  };

  return (
    <>
      <div className="test-watched">
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <div>
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </div>
        <button
          className="btn-delete"
          onClick={() => deleteMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </>
  );
};

export default WatchedMovie;
