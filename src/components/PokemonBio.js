// import Pokeball from "../assets/icons/pokeball.svg";

const PokemonBio = (pokemons) => {
  return (
    <div className="col-2 mx-1 position-relative">
      {/* <img src={Pokeball} width="100%" alt="pokeball" className="position-absolute top-0 start-0 translate-middle" /> */}
      <div className={`pokemon-bio position-relative shadow rounded px-0 ${pokemons.pokemons.types.primary.toLowerCase()}-type`}>
        <div className="px-2 pt-1">
            <div className="col-12 top-text d-flex justify-content-between">
              <h3 className="fw-bold text-light">{pokemons.pokemons.types.primary}</h3>
              {pokemons.pokemons.types.secondary && <h3 className="fw-bold text-light">{pokemons.pokemons.types.secondary}</h3>}
            </div>
          <div className="col-12 d-flex flex-column" style={{ height: "100px" }}>
            <div className="col-12 cover d-flex justify-content-center">
              <img
                src={pokemons.pokemons.cover}
                alt={pokemons.pokemons.name}
                className="pokemon-image position-absolute"
                style={{ maxWidth: 100 }}
              />
            </div>
          </div>
        </div>
        <div className="white-card col-12 bg-white rounded-top p-2">
          <h3 className="fw-bold">{pokemons.pokemons.name}</h3>
        </div>
      </div>
      <div className="my-2">
        <h4 className="fw-bold">#{pokemons.pokemons.id}</h4>
      </div>
    </div>
  );
};

export default PokemonBio;
