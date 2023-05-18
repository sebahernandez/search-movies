import React from "react";
import { useState } from "react";
import Pagination from "../components/Pagination";

// lista de peliculas
function MovieList({ movies, currentPage, moviesPerPage }) {
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  return currentMovies.map((movie) => (
   
    <div className="flex items-center justify-center relative w-full mb-5 group/details" key="{movie.id}">
        <img src={movie.poster} alt={movie.title} class="w-full rounded-md object-cover" />
    </div>
   
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
    <div class="columns-2 sm:columns-3 lg:columns-4 gap-5">
        <MovieList movies={movies} currentPage={currentPage} moviesPerPage={moviesPerPage} />
    </div>
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
