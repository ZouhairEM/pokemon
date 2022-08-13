import React from "react";
import PokemonBio from "./PokemonBio";

class Pagination extends React.Component {
  constructor({ pokemons }) {
    super();
    this.state = {
      allPokemons: pokemons,
      currentPage: 1,
      pokemonsPerPage: 3
    };
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { allPokemons, currentPage, pokemonsPerPage } = this.state,
          pokemonLastIndex = currentPage * pokemonsPerPage, 
          pokemonIndex = pokemonLastIndex - pokemonsPerPage, 
          currentPokemons = allPokemons.slice(pokemonIndex, pokemonLastIndex);

    const pageNums = [];
    for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
      pageNums.push(i);
    }

    const renderPageNums = pageNums.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });


    return (
      <div>
        {currentPokemons && <PokemonBio currentPokemons={currentPokemons} />}
        <div id="page-numbers">
          <div className="d-flex">
            {renderPageNums.map((pageNum, i)=> { return (<h3 key={i} className="page-number mx-2 fw-bold">{pageNum}</h3>) })}
          </div>
        </div>
      </div>
    );
  }
}

export default Pagination;