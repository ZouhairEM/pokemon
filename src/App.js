import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { useState, useEffect } from 'react'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const filteredPokemon = pokemons.filter(({ name, type }) => {
    if (name.toLowerCase().includes(query.toLowerCase()) || type[0].toLowerCase().includes(query.toLowerCase())) {
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
    <div className="App container shadow">
      {isLoaded &&
        (<div className='row'>
            <h2 className="mx-0 mb-3">
              Pokedex
            </h2>
          <div className="d-flex h-25 justify-content-around">
            <div className='position-relative'>
              <img src={require('./assets/icons/search.png')} alt="Search" className='search position-absolute top-50 start-0 offset-1' />
              <input
                placeholder="Name or type"
                className="rounded py-3 p-5 mx-2 fw-bold w-100"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <Pagination pokemons={filteredPokemon} />
        </div>)
      }
    </div>
  );
}

export default App;
