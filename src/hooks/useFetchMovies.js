import { useEffect, useState } from "react";

export function useFetchMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    callback?.();

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

  return { movies, loading, errorMessage };
}
