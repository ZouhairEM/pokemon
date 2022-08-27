import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
// import SearchBar from './components/SearchBar';
import Pagination from "./components/Pagination";
import FilterIcon from "./assets/icons/filter.svg";
import closeIcon from "./assets/icons/close.svg";
import pokemonLogo from "./assets/icons/pokemon-logo.svg";
import { getPokemon } from "./services/services";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

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
        <div className="row mx-auto d-flex flex-column p-3 py-4">
          <div className="row d-flex align-items-start justify-content-between pt-3 pb-3 pb-sm-5 px-3">
            <div className="col d-none d-sm-block d-flex test justify-content-between">
              <div className="wrapper d-flex align-items-start justify-content-start bulbs position-relative">
                <span className="big-bulb me-2"><span className="white-spot position-absolute rounded-4"></span></span>
                <span className="bulb mx-2 position-relative"><span className="white-spot-sm position-absolute rounded-4"></span></span>
                <span className="bulb mx-2 me-3 position-relative"><span className="white-spot-sm position-absolute rounded-4"></span></span>
                <span className="bulb position-relative"><span className="white-spot-sm position-absolute rounded-4"></span></span>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <h1 className="col-12 col-sm-8 col-md-6 pokemon-logo mx-auto fw-bold mb-3 p-2 text-white">
                <Link to={"/"}>
                  <img src={pokemonLogo} width={120} alt={pokemonLogo} />
                </Link>
                </h1>
            </div>
            <div className="col-12 col-sm-3 my-3 my-sm-0 position-relative">
              <h5 className="d-flex justify-content-start pb-4">Search for Pokémon</h5>
              <div className="d-flex input-group p-1 m-0">
                <input
                  placeholder="Name"
                  className="rounded fw-bold py-2 position-relative w-100"
                  maxLength="16"
                  onChange={(e) => [
                    setPokemons(getPokemon().pokemons),
                    setQuery(e.target.value),
                  ]}
                />
                <span
                  className={`input-icon position-absolute ${query !== "" ? "typing" : "not-typing"
                    }`}
                  onClick={() => {
                    handleClearInput();
                  }}
                ></span>
              </div>
              <div className="filter-group position-absolute top-50">
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
          {filtersVisible && (
            <div className="d-flex flex-wrap px-3 pt-0 pb-4">
              <h5 className="col-12 d-flex justify-content-start pb-4">Filter by type</h5>
              {filterBtns.map((filterBtn, i) => {
                return (
                  <button
                    onClick={() => {
                      handleFilter(filterBtn);
                    }}
                    className={`filter-btn p-3 pb-2 me-3 mb-3 ${isActive === filterBtn ? "active" : ""
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
                  <h5 className="fw-bold">Clear filter</h5>
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
