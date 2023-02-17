import './App.css'
import {useEffect, useState, useRef, useCallback} from 'react';
import {useMovies} from './hooks/useMovies';
import {Movies} from './components/Movies';
import debounce from 'just-debounce-it';

function useSearch(){
  const [error, setError] = useState(null);
  const [search, updateSearch] = useState('');
  const isFirstInput = useRef(true);


  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }
    if (search === '') {
      setError('No se puede buscar una película vacía');
      return;
    };

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con números');
      return;
    }

    if(search.length < 3){
      setError('La búsqueda debe tener al menos 3 caracteres');
      return;
    }

    setError(null);
  },[search])

  return {search, updateSearch, error}
}

function App() {
  const [sort, setSort] = useState('false');

  const {search, updateSearch, error} = useSearch();
  const {movies, loading, getMovies} = useMovies({search, sort});


  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({search})
  },300)
  ,[getMovies]
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({search});
  }

  const handleSort = (e) => {
    setSort(!sort)
  }

  const handleChange = (e) => {
    const newSearch = e.target.value;
    updateSearch(newSearch)
    debouncedGetMovies(newSearch);
  }

  return (
  <div className='page'>
      <h1>Buscador de películas</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input 
          onChange={handleChange} 
          value={search} 
          name="query" 
          placeholder='Avengers, Star Wars, Matrix...' 
        />
        <input type="checkbox" id="sort" name="sort" onChange={handleSort}/>
        <button type='submit'>Buscar Pelicula</button>
      </form>
      {error && <p className='error'>{error}</p>}
    <main>
      
      {
      loading 
      ? <p className='loading'>Cargando...</p> 
      :<Movies movies={movies}/>
      }
      
    </main>

  </div>
  )
}

export default App
