import React from "react";
import { useState } from "react";
import Pagination from "../components/Pagination";

function MovieList({ movies, currentPage, moviesPerPage }) {
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  return currentMovies.map((movie) => (
    <li className="movie" key={movie.id}>
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <img src={movie.poster} alt={movie.title} />
    </li>
  ));
}

export function ListMovies({ movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <ul className="movies">
        <MovieList movies={movies} currentPage={currentPage} moviesPerPage={moviesPerPage} />
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </>
  );
}

export function NoMoviesResult () {
    return (
      <p>No se encontraron resultados</p>
    )
}

export function Movies({movies}) {
   
    const hasMovies = movies?.length > 0;
  
    return (
        <>
            {
                hasMovies 
                ? <ListMovies movies={movies} /> 
                : <NoMoviesResult />
            }  
        </>
    )
}
