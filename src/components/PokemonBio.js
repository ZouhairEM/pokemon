const PokemonBio = (pokemons) => {
    return (
      <div
        className={`col-2 my-3 mx-3 pokemon-bio position-relative shadow rounded ${pokemons.pokemons.type.toLowerCase()}-type`}
        style={{ cursor: "pointer" }}
      >
        <div className="p-3">
          <div className="col-12 d-flex flex-column" style={{ height: "100px" }}>
            <div className="col-12 top-text d-flex justify-content-between">
              <h3 className="fw-bold text-light">{pokemons.pokemons.type}</h3>
              <h3 className="fw-bold text-light">#{pokemons.pokemons.id}</h3>
            </div>
            <div className="col-12 cover d-flex justify-content-center">
              <img
                src={pokemons.pokemons.cover}
                alt={pokemons.pokemons.name}
                className="position-absolute img-fluid"
                style={{ bottom: "20%", maxWidth: 90 }}
              />
            </div>
          </div>
        </div>
        <div className="white-card col-12 bg-white rounded-top p-3">
          <h3 className="fw-bold">{pokemons.pokemons.name}</h3>
        </div>
      </div>
    );
  };
  
  export default PokemonBio;
  