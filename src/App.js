import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
// import SearchBar from './components/SearchBar';
import Pagination from "./components/Pagination";
import FilterIcon from "./assets/icons/filter.svg";
import closeIcon from "./assets/icons/close.svg";
import pokemonLogo from "./assets/icons/pokemon-logo.png";
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
  const [isActive, setIsActive] = useState(false);

  const handleClearInput = () => {
    setQuery("");
    document.querySelector("input").value = "";
  };

  let filteredPokemon = pokemons.filter(({ name }) => {
    return name.toLowerCase().includes(query.toLowerCase()) ? true : false;
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
    setIsActive(e);
  };

  const handleCheckFilter = () => {
    setFiltersVisible(!filtersVisible);
    setPokemons(getPokemon().pokemons);
    return clearVisible || isActive
      ? [setIsActive(false), setClearVisible(false)]
      : "";
  };

  return (
    <div className="App container">
      {isLoaded && (
        <div className="row mx-auto d-flex flex-column">
          <div className="col-12 d-flex align-items-start justify-content-between pt-3 pb-5 px-3">
            <div className="col-12 col-sm-6">
              <h1 className="fw-bold mb-3 p-3 text-white pokemon-logo"><img src={pokemonLogo} className="pokemon-logo" width={100} alt={pokemonLogo} /></h1>
            </div>
            <div className="col-12 col-sm-4 position-relative">
              <h5 className="text-left pb-3">Search for Pokémon </h5>
              <div className="d-flex input-group p-1 m-0 justify-content-center">
                <input
                  placeholder="Name"
                  className="rounded fw-bold py-2 position-relative"
                  maxLength="16"
                  onChange={(e) => [
                    setPokemons(getPokemon().pokemons),
                    setQuery(e.target.value),
                  ]}
                />
                <span
                  className={`input-icon position-absolute ${
                    query !== "" ? "typing" : "not-typing"
                  }`}
                  onClick={() => {
                    handleClearInput();
                  }}
                ></span>
                <div className="filter-group position-absolute top-50 translate-middle">
                  <button
                    onClick={() => handleCheckFilter()}
                    className="filter-btn position-relative p-4"
                  >
                    <img
                      src={`${filtersVisible ? closeIcon : FilterIcon}`}
                      alt="Filter"
                      className="filter-img position-absolute top-50 start-50 translate-middle w-75"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-2 d-flex test justify-content-center">
              <div className="wrapper w-100 d-flex align-items-start justify-content-end bulbs">
                <span className="bulb-blue align-self-center mx-4"></span>
                <span className="bulb mx-2"></span>
                <span className="bulb mx-2 me-3"></span>
                <span className="bulb"></span>
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
                    className={`filter-btn p-3 pb-2 me-3 mb-3 ${
                      isActive === filterBtn ? "active" : ""
                    } ${filterBtn.toLowerCase()}-type`}
                    key={i}
                  >
                    <h5 className="fw-bold text-light">{filterBtn}</h5>
                  </button>
                );
              })}
              {clearVisible && (
                <span
                  onClick={() => {
                    setPokemons(getPokemon().pokemons);
                    setClearVisible(false);
                    setIsActive(false);
                  }}
                  className="clear-btn p-3 pb-2 ms-3 mb-2"
                >
                  <h5 className="fw-bold">Clear</h5>
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
