import { Link } from 'react-router-dom';

type Pokemon = {
  pokemons: {
    num: number;
    name: string;
    img: string;
    type: string;
  };
};

const PokemonBio = (pokemons: Pokemon) => {
  return (
    <div className="pokemon-bio col-12 mx-auto mx-sm-0 col-sm-6 col-md-4 col-lg-3 position-relative py-1 px-3">
      <Link
        to={`/${pokemons.pokemons.name.toLowerCase()}`}
        style={{ color: 'inherit', textDecoration: 'inherit' }}
      >
        <div
          className={`position-relative rounded-hard shadow-sm pt-2 ${pokemons.pokemons.type[0].toLowerCase()}-type background`}
        >
          <div className="pt-1">
            <div className="col-12 top-text d-flex justify-content-around">
              <div className="col-6 m-0 p-0">
                <h5 className="fw-bold text-light pt-2">
                  {pokemons.pokemons.type[0]}
                </h5>
              </div>
              <div className="col-6 m-0 p-0">
                {pokemons.pokemons.type[1] && (
                  <h5 className="fw-bold text-light pt-2">
                    {pokemons.pokemons.type[1]}
                  </h5>
                )}
              </div>
            </div>
            <div
              className="col-12 d-flex flex-column"
              style={{ height: '100px' }}
            >
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
          <div className="white-card bg-white p-2">
            <h5 className="fw-bold">{pokemons.pokemons.name}</h5>
          </div>
        </div>
        <div className="mt-2 mb-4">
          <h5 className="fw-bold">#{pokemons.pokemons.num}</h5>
        </div>
      </Link>
    </div>
  );
};

export default PokemonBio;
