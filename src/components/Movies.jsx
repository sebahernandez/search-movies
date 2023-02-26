import React from "react";
import { useState } from "react";
import Pagination from "../components/Pagination";

// lista de peliculas
function MovieList({ movies, currentPage, moviesPerPage }) {
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
/*  <li className="movie" key={movie.id}>
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <img src={movie.poster} alt={movie.title} />
    </li> */
  return currentMovies.map((movie) => (
   
    <div key={movie.id}>
      
      <div className="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8">
         <div className="h-48 overflow-visible w-1/2">
            <img src={movie.poster} alt={movie.title} />
         </div>

         <div className="flex flex-col w-1/2 space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-3xl font-bold">{movie.title}</h2>
         <div className="bg-yellow-400 font-bold rounded-xl p-2">7.2</div>

        </div>
        <div>
          <div className="text-sm text-gray-400">Año:</div>
          <div className="text-lg text-gray-800">{movie.year}</div>
        </div>
          <p className=" text-gray-400 max-h-40 overflow-y-hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className="flex text-2xl font-bold text-a">$83.90</div>
      </div>
      </div>
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
      <div class="py-3 sm:max-w-xl sm:mx-auto">
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
