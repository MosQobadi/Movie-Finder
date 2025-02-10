import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Search from "./components/Search";
import Loading from "./components/Loading";
import ErrorMessage from "./components/Error";
import MovieDetails from "./components/MovieDetails";
import Box1 from "./components/Box1";

// const key = "8b0622c";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue) || [];
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setErrorMessage("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_IMDB_API_KEY}&s=${query}`
        );

        if (!res.ok) throw new Error("Something went wrong!");

        const data = await res.json();

        setErrorMessage("");
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (query.length > 2) fetchMovies();
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  const handleSelectMovie = (id) => {
    setSelectedMovie((selectedId) => (selectedId === id ? null : id));
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const handleAddWatchedMovie = (movie) => {
    setWatched((watched) => [...watched, movie]);
    setSelectedMovie(null);
  };

  const handleDeleteWatchedMovie = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box1>
          {loading && <Loading />}
          {!loading && !errorMessage && (
            <MoviesList movies={movies} onSelect={handleSelectMovie} />
          )}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Box1>
        <Box1>
          {selectedMovie ? (
            <MovieDetails
              selectedMovie={selectedMovie}
              onClose={handleCloseDetails}
              onAddWatched={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box1>
      </Main>
    </>
  );
}
