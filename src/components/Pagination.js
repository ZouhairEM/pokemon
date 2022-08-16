import React from "react";
import PokemonBio from "./PokemonBio";

class Pagination extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentPage: 1,
      pokemonsPerPage: 12
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
    this.setState({ currentPage: +event.currentTarget.id });
    console.log("current index", event.currentTarget.id);
    // event.currentTarget.id.classList.add("bg-warning");
    console.log(event.currentTarget.id.classList)
  }

  render() {
    const { currentPage, pokemonsPerPage } = this.state;
    const pokemonLastIndex = currentPage * pokemonsPerPage;
    const pokemonIndex = pokemonLastIndex - pokemonsPerPage;
    const maxPage = Math.ceil(this.props.pokemons.length / pokemonsPerPage);

    const pageNumDOM = [];
    const currentPokemonsDOM = [];

    for (let i = 1; i <= maxPage; i++) {
      pageNumDOM.push(
        <li key={i} id={i} onClick={this.handleClick}>
          <h3 className="page-number mx-2 fw-bold">{i}</h3>
        </li>
      );
    }

    for (let i = pokemonIndex; i < currentPage * pokemonsPerPage; i++) {
      const pokemonBio = this.props.pokemons[i];
      if (!pokemonBio) break;
      currentPokemonsDOM.push(<PokemonBio key={pokemonBio.id} pokemons={pokemonBio} />);
    }

    return (
      <div className="row">
        {currentPokemonsDOM.length === 0 ? <h2>No Pokémon found</h2> : ''}
        {currentPokemonsDOM}
        {/* {currentPokemonsDOM && currentPokemonsDOM === 0 ? (<div className="col-12">nothing to show</div>) : } */}
        <div id="page-numbers">
          <div className="d-flex">{pageNumDOM}</div>
        </div>
      </div>
    );
  }
}

export default Pagination;
