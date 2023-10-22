function listOfMovies(movies) {
  return (
    <main>
      <ul className="movies">
        {movies.map((movie) => (
          <li className="movie" key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.Title} />
          </li>
        ))}
      </ul>
    </main>
  );
}

function noMoviesFound() {
  return (
      <p>No movies found</p>
  );
}

export default function Movies({ movies }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? listOfMovies(movies) : noMoviesFound();
}
