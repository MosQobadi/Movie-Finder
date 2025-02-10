import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import NumResults from "./components/NumResults";
import MoviesList from "./components/MoviesList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Search from "./components/Search";
import Loading from "./components/Loading";
import ErrorMessage from "./components/Error";
import MovieDetails from "./components/MovieDetails";
import Box1 from "./components/Box1";
import { useFetchMovies } from "./hooks/useFetchMovies";

export default function App() {
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue) || [];
  });
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { movies, loading, errorMessage } = useFetchMovies(
    query,
    handleCloseDetails
  );

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  const handleSelectMovie = (id) => {
    setSelectedMovie((selectedId) => (selectedId === id ? null : id));
  };

  function handleCloseDetails() {
    setSelectedMovie(null);
  }

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
