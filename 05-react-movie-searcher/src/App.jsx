import { useMovie } from "./hooks/useMovie";
import { useEffect, useState, useRef, useCallback } from "react";
import debounce from "just-debounce-it";
import Movies from "./components/Movies";
import "./App.css";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const initialInput = useRef(true);

  useEffect(() => {
    if (initialInput.current) {
      initialInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("can't be empty");
    }

    if (search.length > 0 && search.length < 3) {
      setError("must be at least 3 characters long");
    }

    if (search.match(/^\d+$/)) {
      setError("must be a letters");
    }

    if (search.length >= 3 && !search.match(/^\d+$/)) {
      setError(null);
    }

  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovie({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log('search', search)
      getMovies({ search })
    }, 500),
    [getMovies]
  );

  const handledSubmit = (e) => {
    e.preventDefault();
    getMovies({search});
  };

  const handledChange = (e) => {
    const newSearch = e.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);

  };

  const handledSort = () => {
    setSort(!sort);
  };

  return (
    <>
      <header>
        <h1>Movie Search App</h1>
        <form className="form" onSubmit={handledSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            name="search"
            placeholder="Type the movie name"
            onChange={handledChange}
          />
          <input type='checkbox' onChange={handledSort} checked={sort} />
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
        {
          loading ? <p>Loading...</p> : <Movies movies={movies} />
        }
    </>
  );
}

export default App;
