import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPokemon } from "../services/services";
import Arrow from "../assets/icons/arrow.svg";

const PokemonDetails = () => {
  const [pokemons] = useState(getPokemon().pokemons);
  const [pokemon, setPokemon] = useState(getPokemon().pokemons);
  const [evolved, setEvolved] = useState([]);

  const [evolutions, setEvolutions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const res = pokemons.filter((el) => {
      return el.name === id.charAt(0).toUpperCase() + id.slice(1);
    });
    setPokemon(res);

    if (res[0].prev_evolution || res[0].next_evolution) {
      setEvolutions(res[0].prev_evolution || res[0].next_evolution);
      const mappedResults = evolutions.map((el) => el.num);
      const filteredResults = pokemons.filter(
        (el) => el.num === mappedResults[0] || el.num === mappedResults[1]
      );
      setEvolved(filteredResults);
    }
  }, [pokemons, evolutions, id]);

  return (
    <>
      <div>
        <div>
          <div className="position-relative">
            <h1 className="text-center pb-2">{pokemon[0].name}</h1>
            <Link to={'/'}>
              <img src={Arrow} alt="arrow" width={40} className="position-absolute top-0 arrow-left" style={{ left: '0%', transform: 'scaleX(-1)' }} />
            </Link>
          </div>
        </div>
        <div
          className={`col-12 ${pokemon[0].type[0].toLowerCase()}-type background d-flex justify-content-center`}
        >
          <img
            src={pokemon[0].img}
            alt={pokemon[0].name}
            className="img-fluid"
            style={{ height: "150px" }}
          />
        </div>
        <div className="d-flex justify-content-between p-0 my-4">
          <h2 className="fw-bold d-flex align-items-center">#{pokemon[0].num}</h2>
          <div className="d-flex">
            <h3
              className={`${pokemon[0].type[0].toLowerCase()}-type p-3 rounded-4 text-white type`}
            >
              {pokemon[0].type[0]}
            </h3>
            {pokemon[0].type[1] && (
              <h3
                className={`${pokemon[0].type[1].toLowerCase()}-type type p-3 rounded-4 text-white ms-3`}
              >
                {pokemon[0].type[1]}
              </h3>
            )}
          </div>
        </div>
        <h5 className="text-start">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis vero
          ad facilis vel error doloribus quam placeat quisquam aliquam iusto
          veritatis odit, ab voluptatibus assumenda quidem perspiciatis officiis
          repellendus est.
        </h5>
        <h2 className="py-4 text-start">Weaknesses</h2>
        <div className="d-flex flex-wrap">
          {pokemon[0].weaknesses.map((el, i) => {
            return (
              <h5
                key={i}
                className={`${el.toLowerCase()}-type rounded-4 p-3 text-white type me-5`}
              >
                {el}
              </h5>
            );
          })}
        </div>
        <h2 className="py-4 text-start">Evolutions</h2>
        <div className="col d-flex align-items-center">
          {pokemon[0].num < evolved.map((el) => el.num) ? (
            <div className="d-flex flex-column align-items-center h-100">
              <img
                src={pokemon[0].img}
                alt={pokemon[0].name}
                className="img-fluid mb-2"
                width={75}
              />
              <h4 style={{color: '#fa5c42'}}>{pokemon[0].name}</h4>
            </div>
          ) : (
            ""
          )}
          {evolved.map((el, i) => {
            return (
              <>
                <div className="d-flex justify-content-center align-content-center">
                  {el.num > pokemon[0].num ? (
                    <img src={Arrow} alt="arrow" width={40} className="mx-5" />
                  ) : (
                    ""
                  )}
                  <Link
                    to={`/${el.name}`}
                    key={i}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={el.img}
                        alt={el.name}
                        className="img-fluid"
                        width={75}
                      />
                      <h4 className="text-center mt-2">{el.name}</h4>
                    </div>
                  </Link>
                  <div className="d-flex">
                    {el.num < pokemon[0].num ? (
                      <img
                        src={Arrow}
                        alt="arrow"
                        width={40}
                        className="mx-5"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            );
          })}
          {pokemon[0].num > evolved.map((el) => el.num) ? (
            <div className="d-flex">
              <div className="d-flex flex-column align-items-center">
                <img
                  src={pokemon[0].img}
                  alt={pokemon[0].name}
                  className="img-fluid"
                  width={75}
                />
                <h4 className="mt-2" style={{ color: '#fa5c42' }}>{pokemon[0].name}</h4>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonDetails;
