import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getPokemon } from "../services/services";
import Arrow from "../assets/icons/arrow.svg";

const PokemonDetails = (props) => {
  const [pokemons] = useState(getPokemon().pokemons);
  const [pokemon, setPokemon] = useState(getPokemon().pokemons);
  const [prevEvolved, setPrevEvolved] = useState([]);
  const [nextEvolved, setNextEvolved] = useState([]);
  const [prevEvolutions, setPrevEvolutions] = useState([]);
  const [nextEvolutions, setNextEvolutions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const res = pokemons.filter((el) => {
      return el.name === id.charAt(0).toUpperCase() + id.slice(1);
    });
    setPokemon(res);
    props.hideFilters(false)
    if (!res[0]) {
      navigate("/404");
    } else {
      setPrevEvolved([]);
      setNextEvolved([]);

      if (res[0].prev_evolution) {
        setPrevEvolutions(res[0].prev_evolution);
        const mappedResults = prevEvolutions.map((el) => el.num);
        const filteredResults = pokemons.filter((el) => el.num === mappedResults[0] || el.num === mappedResults[1]);
        setPrevEvolved(filteredResults);
      }

      if (res[0].next_evolution) {
        setNextEvolutions(res[0].next_evolution);
        const mappedResults = nextEvolutions.map((el) => el.num);
        const filteredResults = pokemons.filter((el) => el.num === mappedResults[0] || el.num === mappedResults[1]);
        setNextEvolved(filteredResults);
      }
    }
  }, [pokemons, id, navigate, prevEvolutions, nextEvolutions, props]);

  return (
    <>
      <div>
        <div>
          <div className="position-relative">
            <h1 className="text-center pb-2">{pokemon[0].name}</h1>
            <Link to={'/'}>
              <img src={Arrow} alt="arrow" width={30} className="position-absolute top-0 arrow-left" style={{ left: '0%', transform: 'scaleX(-1)' }} />
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
        <div className="d-flex justify-content-between p-0 my-5">
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
        <h4 className="text-start mb-4">
          {pokemon[0].description}
        </h4>
        <h2 className="py-4 text-start">Weaknesses</h2>
        <div className="d-flex flex-wrap mb-4">
          {pokemon[0].weaknesses.map((el, i) => {
            return (
              <h5
                key={i}
                className={`${el.toLowerCase()}-type rounded-4 p-3 text-white type me-4`}
              >
                {el}
              </h5>
            );
          })}
        </div>
        <h2 className="py-4 text-start">Evolutions</h2>
        <div className="d-flex align-items-center flex-wrap">

          {prevEvolved && prevEvolved.map(el => {
            return (
              <div className="d-flex justify-content-center align-content-center" key={el.name}>
                {el.num > pokemon[0].num ? (
                  <img src={Arrow} alt="arrow" width={30} className="mx-5" />
                ) : (
                  ""
                )}
                <Link
                  to={`/${el.name}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={el.img}
                      alt={el.name}
                      className="img-fluid"
                      width={55}
                    />
                    <h4 className="text-center mt-2">{el.name}</h4>
                    <span style={{ height: '3px', width: '100%', marginTop: '-1px' }}></span>
                  </div>
                </Link>
                <div className="d-flex">
                  {el.num < pokemon[0].num ? (
                    <img
                      src={Arrow}
                      alt="arrow"
                      width={30}
                      className="mx-5"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}

          {(
            <div className="d-flex flex-column align-items-center h-100">
              <img
                src={pokemon[0].img}
                alt={pokemon[0].name}
                className="img-fluid"
                width={55}
              />
              <h4 className="mt-2">{pokemon[0].name}</h4>
              {prevEvolutions.length === 0 && nextEvolutions.length === 0 ?
                (<span style={{ height: '3px', width: '100%', marginTop: '-1px' }}></span>)
                : (<span className={`${pokemon[0].type[0].toLowerCase()}-type`} style={{ height: '3px', width: '100%', marginTop: '-1px' }}></span>)
              }
            </div>
          )}

          {nextEvolved && nextEvolved.map(el => {
            return (
              <div className="d-flex justify-content-center align-content-center" key={el.name}>
                {el.num > pokemon[0].num ? (
                  <img src={Arrow} alt="arrow" width={30} className="mx-5" />
                ) : (
                  ""
                )}
                <Link
                  to={`/${el.name}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={el.img}
                      alt={el.name}
                      className="img-fluid"
                      width={55}
                    />
                    <h4 className="text-center mt-2">{el.name}</h4>
                    <span style={{ height: '3px', width: '100%', marginTop: '-1px' }}></span>
                  </div>
                </Link>
                <div className="d-flex">
                  {el.num < pokemon[0].num ? (
                    <img
                      src={Arrow}
                      alt="arrow"
                      width={30}
                      className="mx-5"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PokemonDetails;
