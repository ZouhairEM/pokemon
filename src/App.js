// eslint-disable-next-line global-require
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import FilterIcon from "./assets/icons/filter-1.svg";
import { useState, useEffect } from 'react'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterBtns, setFilterBtns] = useState([]);
  // const filterBtns = [];

  const filteredPokemon = pokemons.filter(({ name, type }) => {
    if (name.toLowerCase().includes(query.toLowerCase()) || type[0].toLowerCase().includes(query.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  });

  const toggleFilters = () => {
    setVisible(!visible)
  }
  useEffect(() => {
    fetch('http://localhost:8000/pokemons')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setPokemons(data)
        setIsLoaded(true)
        pokemons.forEach((el) => {
          if (!filterBtns.includes(el.type[0])) {
            filterBtns.push(el.type[0])
          }
        })
        filterBtns.sort();

      })
  }, [filterBtns, pokemons])

  return (
    <div className="App container shadow">
      {isLoaded &&
        (<div className='row mx-auto'>
          <div className='d-flex align-items-center justify-content-between mb-5 p-3'>
            <div className='col-12 col-sm-6'>
              <h1 className='fw-bold text-start'>
                Pokédex
              </h1>
              <h4 className='text-start'>
                Search for a Pokémon by name or its type.
              </h4>
            </div>
            <div className='col-12 col-sm-6'>
              <div className="d-flex h-25 justify-content-around mt-0 mb-4">
                <div className='d-flex align-items-center position-relative'>
                  <img src={require('./assets/icons/search.png')} alt="Search" className='search position-absolute top-50 start-0 offset-1' />
                  <input
                    placeholder="Name or type"
                    className="rounded p-5 py-3 mx-2 fw-bold"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button onClick={() => { toggleFilters() }} className='filter-btn red-btn position-relative p-4 ms-3'>
                    <img src={FilterIcon} alt="Filter" className="position-absolute top-50 start-50 translate-middle w-75" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {visible && <div className='d-flex flex-wrap my-3'>
            {filterBtns.map((filterBtn, i) => {
              return (<button className={`filter-btn p-3 pb-2 ms-3 mb-3 ${filterBtn.toLowerCase()}-type`} key={i}>
                <h3 className='fw-bold text-light'>
                  {filterBtn}
                </h3></button>)
            })}
            <span className='clear-btn p-3 pb-2 ms-3 mb-2'>
              <h3 className='fw-bold'>
                Clear
              </h3>
            </span>
          </div>}
          <Pagination pokemons={filteredPokemon} />
        </div>)
      }
    </div>
  );
}

export default App;
