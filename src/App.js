import 'bootstrap/dist/css/bootstrap.css';
import { getPokemon } from './services/services';
import { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PokemonOverview from './components/PokemonOverview';
import PokemonDetails from './components/PokemonDetails';
import NotFound from './components/NotFound';
import Spinner from './assets/icons/spinner.svg';

function App() {
  const [pokemons, setPokemons] = useState(getPokemon().pokemons);
  const [filteredPokemons] = useState(pokemons);
  const [query, setQuery] = useState('');
  const [filterBtns, setFilterBtns] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [clearVisible, setClearVisible] = useState(false);
  const [onOverview, setOnOverview] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const target = useRef(null);

  const handleClearInput = () => {
    setQuery('');
    target.current.value = '';
  };

  const filteredPokemon = pokemons.filter(({ name }) => {
    return name.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    pokemons.forEach((pokemon) => {
      if (!filterBtns.includes(pokemon.type[0])) {
        filterBtns.push(pokemon.type[0]);
      }
      setFilterBtns(filterBtns);
    });
    filterBtns.sort();

    const handleOnReady = window.setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => {
      window.clearTimeout(handleOnReady);
    };
  }, [filterBtns, pokemons]);

  const handleFilter = (e) => {
    const filteredByType = filteredPokemons.filter((filteredPokemon) => {
      return filteredPokemon.type[0] === e;
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
      : '';
  };

  return (
    <div className="App mx-auto">
      {!isLoaded && (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="spinner">
            <img src={Spinner} width={60} alt={Spinner} />
          </div>
        </div>
      )}
      {isLoaded && (
        <main>
          <div className="row mx-auto d-flex flex-column p-3 py-4">
            <HashRouter>
              <Header
                visibility={filtersVisible}
                handleCheckFilter={handleCheckFilter}
                handleClearInput={handleClearInput}
                query={query}
                setPokemons={setPokemons}
                pokemons={pokemons}
                setQuery={setQuery}
                onOverview={onOverview}
                target={target}
              />

              {onOverview && (
                <>
                  {filtersVisible && (
                    <div className="d-flex flex-wrap px-3 pt-0 pb-4">
                      <h5 className="col-12 d-flex justify-content-start pb-4">
                        Filter by type
                      </h5>
                      {filterBtns.map((filterBtn, i) => {
                        return (
                          <button
                            onClick={() => {
                              handleFilter(filterBtn);
                            }}
                            className={`filter-btn p-3 pb-2 me-3 mb-3 ${
                              isActive === filterBtn ? 'active' : ''
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
                </>
              )}

              <Routes>
                <Route
                  path="/"
                  element={
                    <PokemonOverview
                      hideFilters={(onOverview) => setOnOverview(onOverview)}
                      pokemons={filteredPokemon}
                    />
                  }
                />
                <Route
                  path="/:id"
                  element={
                    <PokemonDetails
                      hideFilters={(onOverview) => setOnOverview(onOverview)}
                    />
                  }
                />
                <Route
                  path="/404"
                  element={
                    <NotFound
                      hideFilters={(onOverview) => setOnOverview(onOverview)}
                    />
                  }
                />
              </Routes>
            </HashRouter>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
