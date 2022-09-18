import { Link } from "react-router-dom"
import pokemonLogo from "../assets/icons/pokemon-logo.svg";
import FilterIcon from "../assets/icons/filter.svg";
import closeIcon from "../assets/icons/close.svg";

const Header = ({ visibility, handleClearInput, handleCheckFilter, query, setPokemons, pokemons, setQuery, onOverview }) => {
  return (
    <>
      <div className="row d-flex align-items-start justify-content-between mx-auto pt-3 pb-3 pb-sm-5 px-0 px-sm-3">
        <div className="col d-none d-sm-block d-flex test justify-content-between p-0">
          <div className="wrapper d-flex align-items-start justify-content-start bulbs position-relative">
            <span className="big-bulb me-2">
              <span className="white-spot position-absolute rounded-4"></span>
            </span>
            <span className="bulb mx-2 position-relative">
              <span className="white-spot-sm position-absolute rounded-4"></span>
            </span>
            <span className="bulb mx-2 me-3 position-relative">
              <span className="white-spot-sm position-absolute rounded-4"></span>
            </span>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <span className="position-relative">
            <h1 className="col-12 col-sm-8 col-md-6 pokemon-logo mx-auto fw-bold mb-3 p-2 text-white">
              <Link to={"/"}>
                <img src={pokemonLogo} width={150} alt={pokemonLogo} />
              </Link>
            </h1>
          </span>
        </div>
        <div className={`col-12 col-sm-3 my-3 my-sm-0 position-relative d-flex flex-column ${onOverview ? '' : 'invisible'}`}>
          <h5 className="d-flex justify-content-center pb-3">
            Search Pokémon
          </h5>
          <div className="d-flex input-group p-1 m-0">
            <input
              placeholder="Name"
              className="rounded fw-bold py-2 position-relative w-100"
              maxLength="16"
              onChange={(e) => [
                setPokemons(pokemons),
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
                src={`${visibility ? closeIcon : FilterIcon}`}
                alt="Filter"
                className="filter-img position-absolute top-50 start-50 translate-middle w-75"
              />
            </button>
          </div>
        </div>
      </div>

    </>);
}

export default Header;