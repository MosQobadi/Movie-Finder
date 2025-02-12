import { useEffect, useReducer } from "react";

const initialState = {
  movies: [],
  status: "done",
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataFetched":
      return { ...state, movies: action.payload };
    case "inProgress":
      return { ...state, status: "loading" };
    case "dataRecieved":
      return { ...state, status: "done" };
    case "error":
      return { ...state, errorMessage: action.payload };
    default:
  }
}

export function useFetchMovies(query, callback) {
  const [{ movies, status, errorMessage }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    callback?.();

    async function fetchMovies() {
      try {
        dispatch({ type: "inProgress" });
        dispatch({ type: "error", payload: "" });
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_IMDB_API_KEY}&s=${query}`
        );

        if (!res.ok) throw new Error("Something went wrong!");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        dispatch({ type: "dataFetched", payload: data.Search });
      } catch (error) {
        dispatch({ type: "error", payload: error.message });
      } finally {
        dispatch({ type: "dataRecieved" });
      }
    }

    if (query.length > 2) fetchMovies();
  }, [query]);

  return { movies, errorMessage, status };
}
