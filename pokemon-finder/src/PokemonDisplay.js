import React, { useEffect, useState } from 'react';
import './PokemonDisplay.css';



const typeGradients = {
  fire: "linear-gradient(to bottom, #ff7e5f, #feb47b)",
  water: "linear-gradient(to bottom, #43c6ac, #191654)",
  grass: "linear-gradient(to bottom, #56ab2f, #a8e063)",
  electric: "linear-gradient(to bottom, #f7971e, #ffd200)",
  psychic: "linear-gradient(to bottom, #f857a6, #ff5858)",
  ice: "linear-gradient(to bottom, #3c8dad, #b8f1ed)",
  dragon: "linear-gradient(to bottom, #6a11cb, #2575fc)",
  dark: "linear-gradient(to bottom, #232526, #414345)",
  fairy: "linear-gradient(to bottom, #ff9a9e, #fad0c4)",
  normal: "linear-gradient(to bottom, #e0eafc, #cfdef3)",
  fighting: "linear-gradient(to bottom, #c02425, #f0cb35)",
  flying: "linear-gradient(to bottom, #83a4d4, #b6fbff)",
  poison: "linear-gradient(to bottom, #a040a0, #f3e5f5)",
  ground: "linear-gradient(to bottom, #e0c068, #d3a45f)",
  rock: "linear-gradient(to bottom, #9e9d24, #ffecb3)",
  bug: "linear-gradient(to bottom, #a8e063, #56ab2f)",
  ghost: "linear-gradient(to bottom, #735d78, #4e4376)",
  steel: "linear-gradient(to bottom, #b8b8d0, #e0e0e0)"
};

const PokemonDisplay = ({ pokemon, onEvolutionClick }) => {
  const [evolutions, setEvolutions] = useState([]);
  const [showShiny, setShowShiny] = useState(false);

  useEffect(() => {
    const fetchEvolutions = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.number}`);
        const data = await response.json();
        const evolutionChainUrl = data.evolution_chain.url;
        
        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();
        const evolutions = [];
        let current = evolutionData.chain;

        while (current) {
          const id = current.species.url.split('/').slice(-2, -1)[0];
          if (parseInt(id) !== pokemon.number) {
            evolutions.push({
              name: current.species.name,
              id: id,
              trigger: current.evolution_details?.[0]?.trigger?.name || 'Level Up',
            });
          }
          current = current.evolves_to[0];
        }
        setEvolutions(evolutions);
      } catch (error) {
        console.error("Error fetching evolution data:", error);
      }
    };

    if (pokemon) {
      fetchEvolutions();
    }
  }, [pokemon]);

  

  return (
    <div className="pokemon-display" style={{ background: pokemon.types && pokemon.types.length > 0 ? pokemon.types && pokemon.types.length > 0 ? typeGradients[pokemon.types[0]] : "#f5f5f5" : "linear-gradient(to bottom, #0b0b19, #2c3e50)" }}>
      <h2 className="pokemon-name">{pokemon.name} #{pokemon.number}</h2>
      <img
  src={showShiny ? pokemon.shiny : pokemon.sprite}
  alt={pokemon.name}
  className="pokemon-sprite"
  style={{ width: 250, height: 'auto', position: 'relative' }}
  onClick={() => setShowShiny(!showShiny)}
/>
      
      <div className="pokemon-info">
        <p><strong>Type:</strong> {pokemon.type}</p>
        <p><strong>Height:</strong> {pokemon.height} m</p>
        <p><strong>Weight:</strong> {pokemon.weight} kg</p>
      </div>
      <h3>Evolutions</h3>
      <div className="evolutions">
        {evolutions.map((evo) => (
          <div 
            key={evo.id} 
            className="evolution"
            onClick={() => onEvolutionClick(evo.id)}
            style={{ background: pokemon.types && pokemon.types.length > 0 ? typeGradients[pokemon.types[0]] : "#f5f5f5", color: "#000000", padding: '10px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', fontFamily: 'Fira Code, monospace' }}
          >
            <p>{evo.name} #{evo.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonDisplay;