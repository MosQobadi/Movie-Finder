import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Rating from "./Rating";

const MovieDetails = ({ selectedMovie, onClose, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");

  const isWatched = watched
    ?.map((movie) => movie.imdbID)
    .includes(selectedMovie);

  const watchedUserRating = watched.find(
    (movie) => movie?.imdbID === selectedMovie
  );

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_IMDB_API_KEY}&i=${selectedMovie}`
        );

        if (!res.ok) throw new Error("Something went wrong!");

        const data = await res.json();

        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [selectedMovie]);

  const handleAddWatched = () => {
    const newMovie = {
      imdbID: selectedMovie,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newMovie);
  };

  return (
    <div className="details">
      {loading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <Rating
                    maxRating={10}
                    size={24}
                    defaultRating={imdbRating}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      Add to Watched
                    </button>
                  )}
                </>
              ) : (
                <p>You Rated this movie {watchedUserRating.userRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
