import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { getPokemon } from "../services/services";

const PokemonDetails = () => {
    const [pokemon, setPokemon] = useState(getPokemon().pokemons);
    const { id } = useParams();
    
    useEffect(() => {
        const res = pokemon.filter( (el) =>{
            return el.name === id.charAt(0).toUpperCase() + id.slice(1)
        })
        setPokemon(res)
    }, [])
    
    return ( <div className="row">
        <p>Go to <Link to="/">Home</Link></p>
        <div className="col">
            <p>
                this is the pokemon details page
                 and the current selected pokemon is {id}
            </p>
            <h4>{pokemon[0].num}</h4>
            <h4>{pokemon[0].name}</h4>
            <img src={pokemon[0].img} alt={pokemon[0].name} />
            <h4>{pokemon[0].type}</h4>
        </div>
    </div>  );
}
 
export default PokemonDetails;