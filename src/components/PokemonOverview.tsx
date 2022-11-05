import { useState, useEffect } from 'react';
import PokemonBio from './PokemonBio';
import avatar from '../assets/icons/missing.svg';

type Pokemon = {
  id: number;
  num: number;
  name: string;
  img: string;
  type: string;
};

interface IProps {
  hideFilters: (arg0: boolean) => void;
  pokemons: Pokemon[];
}

const PokemonOverview = ({ hideFilters, pokemons }: IProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const [isActive, setIsActive] = useState(1);
  const pokemonLastIndex = currentPage * pokemonsPerPage;
  const pokemonIndex = pokemonLastIndex - pokemonsPerPage;
  const maxPage = Math.ceil(pokemons.length / pokemonsPerPage);
  const pageNumDOM = [];
  const currentPokemonsDOM = [];

  useEffect(() => {
    hideFilters(true);
    if (currentPage > 1) {
      if (currentPage > maxPage) setCurrentPage(maxPage);
    }
  }, [hideFilters, currentPage, pokemons.length, pokemonsPerPage, maxPage]);

  const handleClick = (e: { currentTarget: { id: string } }) => {
    setCurrentPage(+e.currentTarget.id);
    setIsActive(+e.currentTarget.id);
  };

  if (maxPage > 1) {
    for (let i = 1; i <= maxPage; i++) {
      pageNumDOM.push(
        <li key={i} id={`${i}`} className="p-2 py-1" onClick={handleClick}>
          <h5
            className={`page-number p-2 mx-1 fw-bold ${
              isActive === i ? 'active' : ''
            }`}
          >
            {i}
          </h5>
        </li>
      );
    }
  }

  for (let i = pokemonIndex; i < currentPage * pokemonsPerPage; i++) {
    const pokemonBio = pokemons[i];
    if (!pokemonBio) break;
    currentPokemonsDOM.push(
      <PokemonBio key={pokemonBio.id} pokemons={pokemonBio} />
    );
  }

  return (
    <>
      {currentPokemonsDOM.length === 0 ? (
        <div className="row pokemon-wrapper justify-content-center align-items-center flex-column">
          <div>
            <img src={avatar} alt="avatar" width={200} className="mb-5" />
            <h2>No Pokémon found</h2>
          </div>
        </div>
      ) : (
        <div className="pokemon-wrapper mt-3 mt-sm-0">
          <div className="row">{currentPokemonsDOM}</div>
        </div>
      )}
      <span className="page-numbers">
        <h5 className="d-flex flex-wrap mt-2">{pageNumDOM}</h5>
      </span>
    </>
  );
};

export default PokemonOverview;
