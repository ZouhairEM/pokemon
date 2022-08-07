import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// import SearchBar from './components/SearchBar';
import PokemonBio from './components/PokemonBio';
import { useState, useEffect } from 'react'

function App() {
  const [pokemons, setPokemons] = useState("");
  const [query, setquery] = useState("");
  const search = (pokemons) => {
    return pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(query) || pokemon.type.toLowerCase().includes(query))
  }

  useEffect(() => {
    fetch('http://localhost:8000/pokemons')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setPokemons(data)
        console.log(data)
      })
  }, [])

  return (
    <div className="App container min-vw-100 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="pokedex shadow p-4 col-9">
        {/* <SearchBar /> */}
        <div className="d-flex justify-content-center">
          <div style={{ position: 'relative' }}>
            <img src={require('./assets/icons/search.png')} alt="Search" style={{ position: 'absolute', top: '27%', left: '5%', width: 17 }} />
            <input
              placeholder="Search by name or type"
              className="py-2 px-5 rounded "
              onChange={e => setquery(e.target.value)}
            />
          </div>
        </div>
        <div className="h1 fw-bold mx-0 mb-3 d-flex">
          Pokedex
        </div>
        { pokemons && <PokemonBio pokemons={search(pokemons)} /> }
        {/* {pokemons && <PokemonBio pokemons={search(pokemons)} />}
        {search(pokemons).length === 0 ? (
          <div className='col-12'> No Pokémon or type found</div>
        ) : ''} */}
      </div>
    </div>
  );
}

export default App;
