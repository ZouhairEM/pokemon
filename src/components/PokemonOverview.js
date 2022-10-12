import React from "react";
import PokemonBio from "./PokemonBio";
import avatar from "../assets/icons/missing.svg";

class PokemonOverview extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentPage: 1,
      pokemonsPerPage: 12,
      isActive: 1,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.hideFilters(true);
  }

  componentDidUpdate() {
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
      isActive: +event.currentTarget.id,
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
          <li key={i} id={i} className="p-2 py-1" onClick={this.handleClick}>
            <h5
              className={`page-number p-2 mx-1 fw-bold ${
                isActive === i ? "active" : ""
              }`}
            >
              {i}
            </h5>
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
  }
}

export default PokemonOverview;
