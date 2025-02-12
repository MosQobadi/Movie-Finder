import { useEffect, useReducer, useState } from "react";

const initialState = {
  movies: [],
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataFetched":
      return { ...state, movies: action.payload };
    case "inProgress":
      return { ...state, status: "loading" };
    default:
      break;
  }
}

export function useFetchMovies(query, callback) {
  // const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [{ movies, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    callback?.();

    async function fetchMovies() {
      try {
        dispatch({ type: "inProgress" });
        setErrorMessage("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_IMDB_API_KEY}&s=${query}`
        );

        if (!res.ok) throw new Error("Something went wrong!");

        const data = await res.json();

        setErrorMessage("");
        if (data.Response === "False") throw new Error("Movie not found");

        dispatch({ type: "dataFetched", payload: data.Search });
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
