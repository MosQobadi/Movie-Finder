import { useEffect, useReducer, useState } from "react";

const initialState = {
  movies: [],
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataFetched":
      return { ...state, movies: action.payload };

    default:
      break;
  }
}

export function useFetchMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

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

        dispatch({ type: "dataFetched", payload: data });

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
