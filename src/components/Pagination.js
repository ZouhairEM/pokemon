import React from "react";
import PokemonBio from "./PokemonBio";

class Pagination extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentPage: 1,
      pokemonsPerPage: 12,
      isActive: "0"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    // capping/limitting currentPage if it exceeds above maxPage to maxpage
    if (this.state.currentPage > 1) {
      const maxPage = Math.ceil(
        this.props.pokemons.length / this.state.pokemonsPerPage
      );
      if (this.state.currentPage > maxPage)
        this.setState({ currentPage: maxPage });
    }
  }

  handleClick(event) {
    this.setState({ 
      currentPage: +event.currentTarget.id,
      isActive: +event.currentTarget.id
    });
  }

  render() {
    const { currentPage, pokemonsPerPage, isActive } = this.state;
    const pokemonLastIndex = currentPage * pokemonsPerPage;
    const pokemonIndex = pokemonLastIndex - pokemonsPerPage;
    const maxPage = Math.ceil(this.props.pokemons.length / pokemonsPerPage);

    const pageNumDOM = [];
    const currentPokemonsDOM = [];

    if (maxPage > 1) {
      for (let i = 1; i <= maxPage; i++) {
        pageNumDOM.push(
          <li key={i} id={i} onClick={this.handleClick}>
            <h5 className={`page-number mx-2 fw-bold ${isActive === i ? "active" : ""}`}>{i}</h5>
          </li>
        );
      }
    }

    for (let i = pokemonIndex; i < currentPage * pokemonsPerPage; i++) {
      const pokemonBio = this.props.pokemons[i];
      if (!pokemonBio) break;
      currentPokemonsDOM.push(
        <PokemonBio key={pokemonBio.id} pokemons={pokemonBio} />
      );
    }

    return (
      <div className="row mx-auto p-0">
        {currentPokemonsDOM.length === 0 ? (
          <div className="p-5 my-auto mt-5">
            <h2>No Pokémon found</h2>
          </div>
        ) : (
          ""
        )}
        {currentPokemonsDOM}
        <span className="page-numbers my-3">
          <h5 className="d-flex flex-wrap">{pageNumDOM}</h5>
        </span>
      </div>
    );
  }
}

export default Pagination;
