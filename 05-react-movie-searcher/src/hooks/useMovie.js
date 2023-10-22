import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";

export function useMovie({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const previusSearch = useRef(search);

  const getMovies = useCallback(async ({search}) => {
    if(search === previusSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortMovies = useMemo(() => {
    return sort
    ? [...movies].sort((a, b) => a.year - b.year)
    : movies;
  }, [sort, movies]);


  return { movies: sortMovies, getMovies, loading };
}
