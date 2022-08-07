import { useState } from "react";

const PokemonBio = () => {
    const [pokemons, setPokemons] = useState([{
        name: "Charmander",
        type: "Fire",
        cover: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
        abilities: ["Flamethrower", "Bark", "Bite", "Ember"],
    }])

    return (
        <div>
            {pokemons.map((pokemon, i) => (
                <div key={i} className={`col-3 pokemon-bio shadow p-0 rounded 
                ${pokemon.type === 'Fire' ? 'fire' : ''}`}>
                    <div className="p-3">
                        <div className="top-text d-flex justify-content-between">
                            <h3 className="fw-bold text-light">
                                {pokemon.type}
                            </h3>
                            <h3 className="fw-bold text-light">
                                #00{i+1}
                            </h3>
                        </div>
                        <img src={pokemon.cover} alt={pokemon.name} style={{ maxWidth: 150 }} />
                    </div>
                    <div className="white-card col-12 bg-white rounded-top p-3">
                        <h3>{pokemon.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PokemonBio;