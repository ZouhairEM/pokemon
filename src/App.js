import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
// import SearchBar from './components/SearchBar';
import Pagination from "./components/Pagination";
import Header from "./components/Header";
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
        <div className="row mx-auto d-flex flex-column p-3 py-4">
          <div className="row d-flex align-items-start justify-content-between pt-3 pb-3 pb-sm-5 px-3">
          <Header visibility={filtersVisible} handleClearInput={handleClearInput} handleCheckFilter={handleCheckFilter} query={query} />
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
