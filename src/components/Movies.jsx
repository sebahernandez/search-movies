import React from "react";
import { useState } from "react";
import Pagination from "../components/Pagination";

// lista de peliculas
function MovieList({ movies, currentPage, moviesPerPage }) {
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  return currentMovies.map((movie) => (
    <div
      key={movie.id}
      className="text-white overflow-hidden mx-3 text-center py-5"
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-64 h-64 object-cover rounded-md"
      />
      <div className="flex flex-col text-left py-3">
        <h3 className="text-sm font-semibold">{movie.title}</h3>
        <p className="text-xs text-gray-600">Año: {movie.year}</p>
      </div>
    </div>
  ));
}

export function ListMovies({ movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 4;

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <section className="flex">
        <MovieList
          movies={movies}
          currentPage={currentPage}
          moviesPerPage={moviesPerPage}
        />
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </>
  );
}

export function NoMoviesResult() {
  return <p>No se encontraron resultados</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return <>{hasMovies ? <ListMovies movies={movies} /> : <NoMoviesResult />}</>;
}
