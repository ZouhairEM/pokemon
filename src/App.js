import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import SearchBar from './components/SearchBar';
import PokemonBio from './components/PokemonBio';
import { useState } from 'react'

function App() {
  const [pokemons, setPokemons] = useState([{
    name: "Bulbasaur",
    type: "Grass",
    cover: "https://archives.bulbagarden.net/media/upload/2/21/001Bulbasaur.png",
  }, {
    name: "Charmander",
    type: "Fire",
    cover: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
  }, {
    name: "Squirtle",
    type: "Water",
    cover: "https://archives.bulbagarden.net/media/upload/3/39/007Squirtle.png",
  }])

  return (
    <div className="App container min-vw-100 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="pokedex shadow p-4 col-9">
      <SearchBar />
        <div className="h1 fw-bold mx-0 mb-3 d-flex">
          Pokedex
        </div>
        <PokemonBio pokemons={pokemons} />
      </div>
    </div>
  );
}

export default App;
