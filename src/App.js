import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
// import SearchBar from './components/SearchBar';
import Pagination from "./components/Pagination";
import FilterIcon from "./assets/icons/filter-1.svg";
import { getPokemon } from "./services/services";
import { useState, useEffect } from "react";

function App() {
  const [pokemons, setPokemons] = useState(getPokemon().pokemons);
  const [filteredPokemons] = useState(pokemons);
  const [query, setQuery] = useState("");
  const [filterBtns, setFilterBtns] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [clearVisible, setClearVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false)

  let filteredPokemon = pokemons.filter(({ name }) => {
    return name.toLowerCase().includes(query.toLowerCase()) ? true : false
  });

  useEffect(() => {
    pokemons.forEach((el) => {
      if (!filterBtns.includes(el.type[0])) {
        filterBtns.push(el.type[0]);
      }
      setFilterBtns(filterBtns);
    });
    filterBtns.sort();    
    setIsLoaded(true);
  }, [filterBtns, pokemons]);

  const handleFilter = (e) => {
    const filteredByType = filteredPokemons.filter((el) => {
      return el.type[0] === e;
    });
    setPokemons(filteredByType);
    setClearVisible(true);
    setIsActive(e)
  };

  return (
    <div className="App container shadow">
      {isLoaded && (
        <div className="mx-auto">
          <div className="col-12 d-flex align-items-end justify-content-between py-5 px-3">
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
                  onClick={() => setFiltersVisible(!filtersVisible)}
                  className="filter-btn position-relative p-4"
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
          {filtersVisible && (
            <div className="d-flex flex-wrap px-3 pt-0 pb-4">
              {filterBtns.map((filterBtn, i) => {
                return (
                  <button
                    onClick={() => {
                      handleFilter(filterBtn);
                    }}
                    className={`filter-btn p-3 pb-2 me-3 mb-3 ${isActive === filterBtn ? "active" : ""} ${filterBtn.toLowerCase() }-type`}
                    key={i}
                  >
                    <h5 className="fw-bold text-light">{filterBtn}</h5>
                  </button>
                );
              })}
              {clearVisible && (
                <span
                  onClick={() => {
                    setPokemons(getPokemon().pokemons)
                    setClearVisible(false)
                    setIsActive(false)
                  }}
                  className="clear-btn p-3 pb-2 ms-3 mb-2"
                >
                  <h4 className="fw-bold">Clear</h4>
                </span>
              )}
            </div>
          )}

          <Pagination pokemons={filteredPokemon} />
        </div>
      )}
    </div>
  );
}

export default App;
