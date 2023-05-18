import "./App.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies";
import debounce from "just-debounce-it";
import Footer from "./components/Footer";

function useSearch() {
  const [error, setError] = useState(null);
  const [search, updateSearch] = useState("");
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con números");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState("false");

  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  // Busca las peliculas al escribir en el campo input con onchange
  /* const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({search})
  },300)
  ,[getMovies]
  ) */

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };

  const handleSort = (e) => {
    setSort(!sort);
  };

  const handleChange = (e) => {
    const newSearch = e.target.value;
    updateSearch(newSearch);
    /* debouncedGetMovies(newSearch); */
  };

  return (
    <>
      <section className="container mx-auto flex flex-col h-screen justify-center items-center ">
        <h1 className="text-center text-5xl font-bold text-blue-500 py-9">
          Finder Film
        </h1>
        <form
          className="w-4/5 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-stone-700 bg-opacity-25"
          onSubmit={handleSubmit}
        >
          <div className="flex">
            <input
              onChange={handleChange}
              value={search}
              name="query"
              placeholder="Avengers, Star Wars, Matrix..."
              className="flex-grow  appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              className="ml-2
                bg-blue-500 
                hover:bg-blue-400 
                text-white 
                font-bold 
                py-2 
                px-4 
                border-b-4
                border-blue-700
                hover:border-blue-500 
                rounded inline-block"
              type="submit"
            >
              Buscar Pelicula
            </button>
          </div>

          <label
            className="md:w-2/3 block text-gray-500 font-bold pt-3"
            htmlFor="sort"
          >
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="sort"
              name="sort"
              onChange={handleSort}
            />
            <span className="text-sm text-white">
              Ordenar peliculas por nombre
            </span>
          </label>
        </form>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p className="loading">Cargando...</p>
        ) : (
          <Movies movies={movies} />
        )}
      </section>
      <Footer />
    </>
  );
}

export default App;
