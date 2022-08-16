// import Pokeball from "../assets/icons/pokeball.png";

const PokemonBio = (pokemons) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 position-relative px-4">
      {/* <img src={Pokeball} width="100%" alt="pokeball" className="position-absolute top-0 start-0 translate-middle" /> */}
      <div className={`pokemon-bio position-relative shadow rounded pt-2 ${pokemons.pokemons.type[0].toLowerCase()}-type background`}>
        <div className="pt-1">
          <div className="col-12 top-text d-flex justify-content-around">
            <h3 className="fw-bold text-light">{pokemons.pokemons.type[0]}</h3>
            {pokemons.pokemons.type[1] && <h3 className="fw-bold text-light">{pokemons.pokemons.type[1]}</h3>}
          </div>
          <div className="col-12 d-flex flex-column" style={{ height: "100px" }}>
            <div className="col-12 cover d-flex justify-content-center">
              <img
                src={pokemons.pokemons.img}
                alt={pokemons.pokemons.name}
                className="pokemon-image position-absolute img-fluid"
                style={{ maxHeight: 110 }}
              />
            </div>
          </div>
        </div>
        <div className="white-card col-12 bg-white rounded-top p-2">
          <h3 className="fw-bold">{pokemons.pokemons.name}</h3>
        </div>
      </div>
      <div className="my-2">
        <h4 className="fw-bold">#{pokemons.pokemons.num}</h4>
      </div>
    </div>
  );
};

export default PokemonBio;
