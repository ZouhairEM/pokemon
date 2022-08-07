import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import PokemonBio from './components/PokemonBio';

function App() {
  return (
    <div className="App container min-vw-100 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row pokedex shadow p-4 col-11">
        <div className="h1 fw-bold mx-0 mb-3 d-flex">
          Pokedex
        </div>
        <PokemonBio />
      </div>
    </div>
  );
}

export default App;
