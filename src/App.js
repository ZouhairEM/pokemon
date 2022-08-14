import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { useState, useEffect } from 'react'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  
  const filteredPokemon = pokemons.filter(({ name}) => {
    if (name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    fetch('http://localhost:8000/pokemons')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setPokemons(data)
        setIsLoaded(true)
      })
  }, [])

  return (
    <div className="App container d-flex justify-content-center align-items-center">
      {isLoaded &&
        (<div className="pokedex shadow p-4">
          <div className="d-flex justify-content-center">
            <div className='position-relative'>
              <img src={require('./assets/icons/search.png')} alt="Search" className='search position-absolute top-50 start-0 offset-1' />
              <input
                placeholder="Search by name or type"
                className="py-3 p-5 rounded mx-2 fw-bold w-100"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="h1 fw-bold mx-0 mb-3 d-flex">
            Pokedex
          </div>

          {/* {query && filteredPokemon.length === 0 ? (<div className='col-12'> No Pokémon or type found</div>) : ''} */}
          <Pagination pokemons={filteredPokemon} />
        </div>)
      }
    </div>
  );
}

export default App;
