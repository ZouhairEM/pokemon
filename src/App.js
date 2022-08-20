import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
// import SearchBar from './components/SearchBar';
import Pagination from "./components/Pagination";
import FilterIcon from "./assets/icons/filter-1.svg";
import { getPokemon } from "./services/services";
import { useState, useEffect } from "react";

function App() {
  const [pokemons, setPokemons] = useState(getPokemon().pokemons);
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
  const [count, setCount] = useState(getPokemon().pokemons.length);
  const [filterBtns, setFilterBtns] = useState([]);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  let filteredPokemon = pokemons.filter(({ name }) => {
    if (name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  });

  const toggleFilters = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    renderFilters();
    setIsLoaded(true);
    console.log(count);
  });

  const renderFilters = () => {
    pokemons.forEach((el) => {
      if (!filterBtns.includes(el.type[0])) {
        filterBtns.push(el.type[0]);
      }
      setFilterBtns(filterBtns);
    });
    filterBtns.sort();
  };

  const handleFilter = (e) => {
    const filteredByType = filteredPokemons.filter((el) => {
      return el.type[0] === e;
    });
    setPokemons(filteredByType);
  };

  return (
    <div className="App container shadow">
      {isLoaded && (
        <div className="mx-auto">
          <div className="col-12 d-flex align-items-end justify-content-between p-3">
            <div className="col-12 col-sm-6">
              <h1 className="fw-bold text-start">Pokédex</h1>
              <h4 className="text-start">Search for a Pokémon by name</h4>
            </div>
            <div className="py-1 me-4 position-relative">
              <div className="input-group p-0 m-0">
                <input
                  placeholder="Find Pokémon"
                  className="rounded fw-bold py-2"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="position-absolute top-50 start-100 translate-middle">
                <button
                  onClick={() => {
                    toggleFilters();
                  }}
                  className="filter-btn red-btn position-relative p-4"
                >
                  <img
                    src={FilterIcon}
                    alt="Filter"
                    className="position-absolute top-50 start-50 translate-middle w-75"
                  />
                </button>
              </div>
            </div>
          </div>
          {visible && (
            <div className="d-flex flex-wrap px-3 my-3">
              {filterBtns.map((filterBtn, i) => {
                return (
                  <button
                    onClick={() => {
                      handleFilter(filterBtn);
                    }}
                    className={`filter-btn p-3 pb-2 me-3 mb-3 ${filterBtn.toLowerCase()}-type`}
                    key={i}
                  >
                    <h5 className="fw-bold text-light">{filterBtn}</h5>
                  </button>
                );
              })}
              <span onClick={() => setPokemons(getPokemon().pokemons)} className="clear-btn p-3 pb-2 ms-3 mb-2">
                <h4 className="fw-bold">Clear</h4>
              </span>
            </div>
          )}

          <Pagination pokemons={filteredPokemon} />
        </div>
      )}
    </div>
  );
}

export default App;
